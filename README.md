# Web-Scraper-Overview

Program receives a URL for a specific comic on tappytoon.com, and then returns the related cover image and summary for that comic. Type 'npm install' into the console to install all the required node modules and then type 'npm run start' to run the program. This service uses RabbitMQ as a communication pipe.

How to Request Data:

Once the program is started, the server will be listening for requests. To request data, run 'node client.js' followed by the URL of the comic that you would like to request data from. (Ex: 'node client.js https://www.tappytoon.com/en/comics/i-adopted-the-male-lead').

'client.js' represents the user's program that is sending a request to the microservice. To send a request directly through the program instead of through the command line, simply replace the definition of the url (which currently parses the command line for a url to send to the microservice). 

How to Receive Data:

The program will automatically send back the cover image and summary in a JSON object once the request has been made through a remote procedure call. 

UML Diagram:

![web-scraper-uml (1)](https://user-images.githubusercontent.com/91505649/180929245-01a5e3c7-90c2-447b-bb3f-5183264b85e8.png)


