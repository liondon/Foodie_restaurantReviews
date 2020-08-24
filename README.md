# Foodie: Restaurant Reviews
A restaurant review web app with RESTful APIs and CRUD functions.  
Built with Node.js, Express, MySQL, and Heroku.  
Check it here: https://restaurant-prj2.herokuapp.com  

## Features
Website:
- User can register, login, logout
- User can read all restaurants and their details
- User can filter restaurants by category
- User can leave review/comment to restaurant
- User can keep a personal favorite (restaurant) list
- User can like/unlike restaurant
- User can read Top 10 restaurants (ranked by like count)
- User can read latest 10 added restaurants
- User can read latest 10 added reviews/comments
- User can follow other users
- User can read Top 10 users (ranked by follower count)
- User can read their favorite restaurants **(todo)**

Admin Console:
- only Admin can access Admin Console
- Admin can create, read, update, delete restaurants
- Admin can create, read, update, delete categories
- Admin can set user to admin or vice versa

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.  

### Prerequisites
- npm  
- MySQL (and a database named `foodie`)

### Installing
- clone the project to your local machine: `git clone https://github.com/liondon/restaurantPrj2`
- go into the project folder: `cd restaurantPrj2`
- use `./.env.template` to create a `./.env` file. See https://apidocs.imgur.com/ for `IMGUR_CLIENT_ID`
- change `username` and `password` in `./config/config.json` according to your local MySQL credentials
- run `npm install` under the project folder to install necessary packages for the app
- run `npx sequelize db:migrate` to create tables in MySQL database
- run `npm run start` to start running the app
- open the link: `http://localhost:3000` with your browser, then you can use the web app
- press `ctrl + c` to stop running the app

### Generate Sample Data
1. run `npx sequelize db:seed:all` to generate sample data
