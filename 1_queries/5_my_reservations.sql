SELECT reservations.id as id, title, properties.cost_per_night as cost_per_night, reservations.start_date as start_date, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON property_id = properties.id
JOIN property_reviews ON property_reviews.property_id = properties.id
GROUP BY reservations.id, properties.title
LIMIT 10;