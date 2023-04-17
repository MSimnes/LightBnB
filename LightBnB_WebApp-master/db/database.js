const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
// pool.query(`SELECT title FROM properties LIMIT 10;`);
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT * 
  FROM users
  WHERE email 
  LIKE $1;`;
  return pool
    .query(queryString, [email])
    .then((result) => {
      const user = result.rows[0];
      console.log('user:', user);
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT * 
  FROM users
  WHERE id 
  LIKE $1;`;
  return pool
    .query(queryString, [id])
    .then((result) => {
      const user = result.rows[0];
      console.log('user:', user);
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const values = [user.name, user.email, user.password];
  const query = {
    name: 'add-user',
    text: `
    INSERT INTO users(name, email, password) 
    VALUES($1, $2, $3)`
  };
  return pool
    .query(query, values)
    .then((result) => {
      const user = result.rows[0];
      console.log('user:', user);
      return user;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = {
    name: 'get-all-reservations',
    text: `SELECT 
    reservations.id, 
    properties.*, 
    reservations.start_date, 
    avg(rating) as average_rating, 
    reservations.start_date, 
    reservations.end_date, 
    reservations.guest_id
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`
  };
  const values = [guest_id, limit];
  return pool
    .query(query, values)
    .then((result) => {
      const reservations = result.rows;
      return reservations;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  console.log("options--". options);

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city ILIKE $${queryParams.length} `;
  }
  // if owner_id return properties belonging to that owner
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  }
  // if min-price, only return properties above that price
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
  // if max-price, only return properties below that price
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100} `);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  }
  queryString += `GROUP BY properties.id `;
  // if minimum_rating only return properties >= to minimum_rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating} `);
    queryString += `HAVING average_rating >= $${queryParams.length} `;
  }
  
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log("params---", queryParams, "queryString ---", queryString);

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
