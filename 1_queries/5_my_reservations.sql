SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;

-- new query for actual db 
/* SELECT 
    reservations.id, 
    properties.title, 
    properties.cost_per_night, 
    properties.number_of_bedrooms, 
    properties.number_of_bathrooms, 
    properties.parking_spaces,
    properties.thumbnail_photo_url, 
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
    LIMIT $2; */