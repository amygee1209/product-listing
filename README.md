# Snackpass Full Stack Code Challenge
Welcome to the Snackpass Challenge. We really appreciate your time to participate. 

## The Challenge

Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products. For eg, `2 burritos, a soda, and a side of chips`.

1. Design a full stack application which returns an infinite-scrolling list of trending products to the user.
2. A product can be qualified as trending if it is purchased at least once in last 48 hours
3. Each product should be tagged with two tags:
    * a recent purchase tag: `5 purchased recently`
    * a time tag `ordered 3 min ago`
4. Use a heuristic to determine which trending products gets returned higher. Base heuristic on both recency and number of recent purchases.

## Requirements
1. Implement a Full stack solution including web server, persistent storage and associated code
2. Please submit with in 72 hours from the time you accept invitation. 
3. You can use pseudocode for parts of web application. For instance, you could replace a function body with "assume this service has the following API."

## Practices
### Quality of code 
 Please use best practices for writing code and publish to this repo. 
### Q & A
 Please create an issue and tag @shrimuthu, @aduca98, @nprbst or @seankwalker for questions or review.
### Data
For sample data, use [Sample Orders](https://docs.google.com/spreadsheets/d/1xfAjSlBflehOYj4O7I2YkfcBB1b9VgSHg9X-SmRWmsE/edit#gid=280279953)

Note: Remember to insert your own random timestamps to fit within 48 hours window.
 
## Solution

Link to the view of the webpage just in case:
https://drive.google.com/file/d/1DbvOMV4sn5T3a61XS8GL8yYO1iywQ1V-/view?usp=sharing


Your solution content goes here... Please provide an explaination on 
1. how you solved the problem
- Looked at the data sheet provided to see what information are needed to be contained in the api
- Using flask and sqlalchemy, created an endpoint of api with only get and post request since the challenge was to list the products
- Created a db with the class setup
- Converted the sample xlsx file to json file and post requested to input the data entries using Postman
- Random timestamps are created within the app.py using randint function
- I set the current time as 2021 April 03 00:00:00 GMT since there will be less products listed if the current time was set to real time as the product list gets updated to only contain purchased items in the last 48 hours
- Get request returns data about the products as an array of objects
- Double checked get request was working through Postman
- Imported Lato font
- On App.js, placed the logo image and word 'snackpass' at the top and put functional component 'Orders' below. 
- Modified index.css so that the backgroud of the body was light blue
- Modified App.css so that the backgroud is white and wet the width to 70% for better readability
- On Orders.js, fetched the api with axios (used useeffect so that the api is fetched only once when the website is reloaded)
- After getting all the orders that were made in last 48 hours period, started iterating through the array of order objects
- Created a dictionary to save the name of the product and its max purchase quantity and latest purchase timestamp
- For each object, got the data that needs to be stored in the dictionary
- Update the quantity and latest timestamp of each productas iterating trough the order
- Converted the dictionary into array to sort them by the heuristic and also to save the product list in the local variable (used usestate/set* to update the local variable value)
- Each product in the 'products' array is passed into ProductItem component, which takes the product object and displays the product name, recent purchase tag, and the time tag (also the restraunt name and price but in smaller font sizes)
- Set the time tag to show how many days,hours,mins ago the purchase was made which is done through conditoinal rendering
- Set it so that as the api is being fetched, sorted and reassigned, the website to display 'Loading...' to indicate that the website information is being loaded.
2. how to setup

Prerequisites
Uses Python `>3.5`,  React.js as well as npm `>6.14`
- cd into the root directory where the files are located and install axios by running below
```
npm install
```
- Once the download is comleted, in the root directory,  cd into api directory and run below
```
. venv/Scripts/activate
```
- Once the virtual environment is activated, run below to start the backend server 
```
flask run
```
3. how to run it

You could be as verbose as you would like for providing details on approach, setup etc.
- Once a local endpoint for the api is given, open another terminal and in the root directory run below to start the react app
```
npm start
```
