# Web-Scraper-Overview

Program receives a URL for a specific comic on tappytoon.com, and then returns the related cover image and summary for that comic.

How to Request Data:

Once the program is started (by running 'npm run start'), the server will be listening for requests. To request data, run 'node client.js' followed by the URL of the comic that you would like to request data from. (Ex: 'node client.js https://www.tappytoon.com/en/comics/i-adopted-the-male-lead').

How to Receive Data:

The program will automatically send back the cover image and summary once the request has been made through a remote procedure call. 

UML Diagram:

![web-scraper-uml (1)](https://user-images.githubusercontent.com/91505649/180929245-01a5e3c7-90c2-447b-bb3f-5183264b85e8.png)


