# Welcome to my Full Stack Food Ordering app.
The tech stack used for this project include React/Next.js, Mongo DB, Redux, and cloudinary for the image hosting service. 

## Brief Description of project
This website allows "customers" to view product from this pretend pizza restauraunt. Once the user has decided what pizza they want to order, they can choose from differrent sizes as well as add on additional toppings. Prices are calculated based on what the customer chooses. Once the items have been added the the cart, they can visit the cart page that displays all their pizzas. They can choose to checkout with two methods of payment, cash on delivery or using Paypal. Once the payment method is selected it will place an order that the admin of the website can see and re-direct the user to the "view status of order" page. On this page the user will be updated which step of the process their pizza is in, from "preparing", "on the way", to "delivered" which the admin of the website changes the status of the pizza to update the user. The admin of the website can view all orders placed, as well as all pizzas listed on the website. The admin also can access to add new pizzas or edit/delete old pizzas.  


## Getting Started

First start by cloning the repository into your local computer.

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Features included in this project
*REST API calls built within Next.js to retrieve and send data to Mongo DB. Calls include GET, POST, PUT, and DELETE.
*Redux state management library. Redux was used to keep track of the state of the users cart including quanity, products, total price, etc.
*Mongo DB is the database where the Products and Orders are located.
*Admin page allows CRUD abilities, a special token is assigned to the cookies of the admin and this is how the website determines who to give admin abilities to.
*Customer can view status of their order in live time.
*Customer can choose multiple add ons for their pizza.

![pizzaApp1](https://user-images.githubusercontent.com/58274004/203635928-e4b448e5-6eff-429f-9658-d98934b11be0.PNG)
![pizzaApp2](https://user-images.githubusercontent.com/58274004/203635940-82dd1313-91a5-4767-a5cd-8722268e6486.PNG)
![pizzaApp3](https://user-images.githubusercontent.com/58274004/203635948-e0820610-60f4-40bd-8200-a8d4301126e5.PNG)
![pizzaApp4](https://user-images.githubusercontent.com/58274004/203635958-80b436be-b2e7-41ec-92f4-92c352686f70.PNG)
![pizzaApp5](https://user-images.githubusercontent.com/58274004/203635986-76293555-9f21-42b1-b2d8-b775bf5272f8.PNG)
![pizzaApp6](https://user-images.githubusercontent.com/58274004/203635992-f42e1533-a162-479c-879f-e1907cde4a27.PNG)
![pizzaApp7](https://user-images.githubusercontent.com/58274004/203635997-988d7578-897c-4aac-bf01-d5093ab4c29d.PNG)![pizzaApp8](https://user-images.githubusercontent.com/58274004/203636002-d9aa9ecf-d189-450f-9aff-07a98d9ec86f.PNG)

![pizzaApp9](https://user-images.githubusercontent.com/58274004/203636005-d81069ab-25b6-4ba0-b83b-9a96d5214780.PNG)
