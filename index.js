const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let hotels = [
  {
    id: 1,
    name: "Romantic Getaway",
    category: "Resort",
    rating: 2.2,
    reviews: 4572,
    amenity: "Spa",
    price: 10464,
    country: "South Africa",
  },
  {
    id: 2,
    name: "Wellness Retreat",
    category: "Family",
    rating: 2.8,
    reviews: 2114,
    amenity: "Pool",
    price: 13243,
    country: "Australia",
  },
  {
    id: 3,
    name: "Romantic Getaway",
    category: "Luxury",
    rating: 3.1,
    reviews: 4359,
    amenity: "Restaurant",
    price: 3299,
    country: "Germany",
  },
  {
    id: 4,
    name: "Luxury Suites",
    category: "Family",
    rating: 4.9,
    reviews: 3651,
    amenity: "Bar",
    price: 16359,
    country: "United Kingdom",
  },
  {
    id: 5,
    name: "Luxury Suites",
    category: "Budget",
    rating: 4.6,
    reviews: 688,
    amenity: "Gym",
    price: 15570,
    country: "France",
  },
  {
    id: 6,
    name: "Cultural Heritage Hotel",
    category: "Boutique",
    rating: 2.0,
    reviews: 219,
    amenity: "Pet Friendly",
    price: 2321,
    country: "USA",
  },
  {
    id: 7,
    name: "Business Hotel",
    category: "Mid-Range",
    rating: 3.7,
    reviews: 1040,
    amenity: "Free WiFi",
    price: 4523,
    country: "India",
  },
  {
    id: 8,
    name: "Historic Plaza Hotel",
    category: "Mid-Range",
    rating: 3.5,
    reviews: 300,
    amenity: "Parking",
    price: 8543,
    country: "Australia",
  },
  {
    id: 9,
    name: "Adventure Resort",
    category: "Boutique",
    rating: 4.2,
    reviews: 1222,
    amenity: "Gym",
    price: 11894,
    country: "South Africa",
  },
  {
    id: 10,
    name: "Mountain Retreat",
    category: "Resort",
    rating: 4.8,
    reviews: 4015,
    amenity: "Spa",
    price: 17560,
    country: "India",
  },
  {
    id: 11,
    name: "Eco Friendly Lodge",
    category: "Family",
    rating: 2.4,
    reviews: 528,
    amenity: "Restaurant",
    price: 3124,
    country: "Germany",
  },
  {
    id: 12,
    name: "Urban Boutique Hotel",
    category: "Mid-Range",
    rating: 3.9,
    reviews: 1401,
    amenity: "Free WiFi",
    price: 9245,
    country: "France",
  },
  {
    id: 13,
    name: "Beachfront Hotel",
    category: "Luxury",
    rating: 4.5,
    reviews: 489,
    amenity: "Pool",
    price: 14567,
    country: "USA",
  },
  {
    id: 14,
    name: "Ocean View Resort",
    category: "Budget",
    rating: 3.3,
    reviews: 783,
    amenity: "Spa",
    price: 7432,
    country: "United Kingdom",
  },
  {
    id: 15,
    name: "City Central Hotel",
    category: "Boutique",
    rating: 4.1,
    reviews: 2133,
    amenity: "Bar",
    price: 9823,
    country: "Australia",
  },
  {
    id: 16,
    name: "Casino Resort",
    category: "Luxury",
    rating: 4.9,
    reviews: 5000,
    amenity: "Bar",
    price: 18900,
    country: "South Africa",
  },
  {
    id: 17,
    name: "Golf Resort",
    category: "Mid-Range",
    rating: 4.7,
    reviews: 789,
    amenity: "Gym",
    price: 16340,
    country: "France",
  },
  {
    id: 18,
    name: "Family Fun Hotel",
    category: "Family",
    rating: 3.2,
    reviews: 1322,
    amenity: "Pool",
    price: 7500,
    country: "Germany",
  },
  {
    id: 19,
    name: "Spa and Relaxation Hotel",
    category: "Luxury",
    rating: 4.4,
    reviews: 2314,
    amenity: "Spa",
    price: 14900,
    country: "United Kingdom",
  },
  {
    id: 20,
    name: "Country House Hotel",
    category: "Budget",
    rating: 3.6,
    reviews: 1876,
    amenity: "Parking",
    price: 6234,
    country: "Australia",
  },
];

function sortDescOrderBasedOnPricing(price_one, price_two) {  
  return price_one.price - price_two.price;
}

function sortAscOrderBasedOnPricing(price_one, price_two) {  
  return price_two.price - price_one.price;
}

function sortDescOrderBasedOnRating(price_one, price_two) {  
  return price_one.rating - price_two.rating;
}

function sortAscOrderBasedOnRating(price_one, price_two) {  
  return price_two.rating - price_one.rating;
}

function sortDescOrderBasedOnReviews(price_one, price_two) {  
  return price_one.reviews - price_two.reviews;
}

function sortAscOrderBasedOnReviews(price_one, price_two) {  
  return price_two.reviews - price_one.reviews;
}

function filterByAmenity(hotel, amenity) {
  return (hotel.amenity.toLowerCase() == amenity) ? true : false;
}

function filterByCountry(hotel, country) {
  return (hotel.country.toLowerCase() == country) ? true : false;
}

function filterByCategory(hotel, category) {
  return (hotel.category.toLowerCase() == category) ? true : false;
}

// https://stackblitzappinvbd2-v1u1--3000--d3acb9e1.local-credentialless.webcontainer.io/hotels/sort/pricing?pricing=1
// /hotels/sort/pricing?pricing=low-to-high
app.get('/hotels/sort/pricing', (req, res) => {
  let sortType = req.query.pricing;
  let hotelCopy = hotels.slice();
  if (String(sortType).toLowerCase() == 'low-to-high') {
    hotelCopy.sort(sortDescOrderBasedOnPricing);
  } else if (String(sortType).toLowerCase() == 'high-to-low') {
    hotelCopy.sort(sortAscOrderBasedOnPricing)
  } else {
    hotelCopy = {message : 'Invalid sorting type'};
  }
  res.json(hotelCopy);
});

// https://stackblitzappinvbd2-v1u1--3000--d3acb9e1.local-credentialless.webcontainer.io/hotels/sort/rating?rating=low-to-high
// /hotels/sort/rating?rating=low-to-high
app.get('/hotels/sort/rating', (req, res) => {
  let sortType = req.query.rating;
  let hotelCopy = hotels.slice();
  if (String(sortType).toLowerCase() == 'low-to-high') {
    hotelCopy.sort(sortDescOrderBasedOnRating);
  } else if (String(sortType).toLowerCase() == 'high-to-low') {
    hotelCopy.sort(sortAscOrderBasedOnRating)
  } else {
    hotelCopy = {message : 'Invalid sorting type'};
  }
  res.json(hotelCopy);
});

// /hotels/sort/reviews?reviews=least-to-most
app.get('/hotels/sort/reviews', (req, res) => {
  let sortType = req.query.reviews;
  let hotelCopy = hotels.slice();
  if (String(sortType).toLowerCase() == 'least-to-most') {
    hotelCopy.sort(sortDescOrderBasedOnReviews);
  } else if (String(sortType).toLowerCase() == 'most-to-least') {
    hotelCopy.sort(sortAscOrderBasedOnReviews)
  } else {
    hotelCopy = {message : 'Invalid sorting type'};
  }
  res.json(hotelCopy);
});

// /hotels/filter/amenity?amenity=spa
app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = String(req.query.amenity).toLowerCase();
  let hotelCopy = hotels.slice();
  hotelCopy = hotelCopy.filter(hotel => filterByAmenity(hotel, amenity));
  if(hotelCopy.length == 0) {
    hotelCopy = {
      message : 'Amenity not found'
    }
  }
  res.json(hotelCopy)
});

// /hotels/filter/country?country=india
app.get('/hotels/filter/country', (req, res) => {
  let country = String(req.query.country).toLowerCase();
  let hotelCopy = hotels.slice();
  hotelCopy = hotelCopy.filter(hotel => filterByCountry(hotel, country));
  if(hotelCopy.length == 0) {
    hotelCopy = {
      message : 'Country not found'
    }
  }
  res.json(hotelCopy);
});

// /hotels/filter/category?category=Resort
app.get('/hotels/filter/category', (req, res) => {
  let category = String(req.query.category).toLowerCase();
  let hotelCopy = hotels.slice();
  hotelCopy = hotelCopy.filter(hotel => filterByCategory(hotel, category));
  if(hotelCopy.length == 0) {
    hotelCopy = {
      message : 'Category not found'
    }
  }
  res.json(hotelCopy);
});

// /hotels
app.get('/hotels', (req, res) => {
  let hotelCopy = hotels.slice();
  res.json(hotelCopy);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
