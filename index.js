const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const amqplib = require('amqplib');

const app = express();

const queueName = 'rpc_queue';

//scrapes image and book summary from url
const scrape = async (url) => {
    try {
        const response = await axios.get(url)
        const html = await response.data
        const $ = cheerio.load(html)
        articles = []
        const sum = $('.css-901oao.css-cens5h.r-zdkpiq.r-1wbh5a2.r-1qhq223.r-1vr2v4v.r-adoza8.r-11kvyqd.r-dnmrzs.r-1ez4vuq.r-1iln25a', html)
        const summary = sum.text()
        const image = $('.css-1dbjc4n.r-n2h5ot.r-1p0dtai.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af', html).find('img').attr('src')
        articles.push(
            {
                image,
                summary 
            }
        )
        var msg = JSON.stringify(articles)
        return msg;

    } catch (error) {
        console.log(error)
    }
}

const processTask = async () => {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, {durable: false});
    channel.prefetch();
    console.log(' [x] Awaiting RPC requests');

    channel.consume(queueName, msg => {
        const url = (msg.content.toString());
        console.log(' [.] Scraping for image and summary');
        //call scrape function with url from rpc_queue
        scrape(url).then(toon => {
            var webtoon = toon
            //send data to q
            channel.sendToQueue(msg.properties.replyTo, Buffer.from(webtoon.toString()), {
                correlationId: msg.properties.correlationId
            });
            console.log(' [.] Sending image and summary', toon);
            //acknowledge msg 
            channel.ack(msg);
        })

    }, {noAck: false})
}
processTask();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

