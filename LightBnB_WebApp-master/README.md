# LightBnB
LightBnB is a mock property rental website. It performs various SQL queries and returns data using server-side JavaScript to the front end. The program uses node.js/express, PostgreSQL and JQuery along with a number of dependencies listed below.

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `1_queries` contains sql queries used when forming the database. Some have been modified and used in database.js
* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It connects to the lightbnb database.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.
* `migrations` contains the schema and sql used to create tables.
* `seeds` contains the data used in the lightbnb database.

## Dependencies

- Node.js
- Express
- pg
- bcryptjs
- cookie-session
- nodemon

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run local` command.
- Go to `localhost:3000` to view the page.

## Functionality
- Users can sign up and log in.
- Users can search by city, minimum price, maximum price and minimum rating. User can also search for any one of these alone.
- Users can create a listing that is stored and searchable in the database.
- Users can see their listings and reservations under the 'My Listings' and My Reservations' links.
- Each property displayed includes the number of bedrooms, bathrooms and parking spaces as well as the average rating and cost per night using data retrieved from the lightbnb database.
- Users can log out.