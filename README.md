# local-discovery-v2

## Project Outline

Local Discovery is a treasure-hunt style activity trail based on geolocation data, which allows adventurous spirits to discover local attractions in a fun, "gamified" way. 

Local Discovery invites users to embark on any one of a series of curated adventures, and solve clues that lead to different "waypoints" within a given area. Users can check in at each waypoint using their geolocation data to confirm if they're in the right place, and receive their next clue if successful.

Users can leave an adventure at any time, and pick up where they left off when they next load the page. 

## User Story
<!-- to be added -->
<!-- ![User Story Map](./assets/images/user-story-map.jpg) -->

## Technology Used

### Authentication
* [Express Session](https://www.npmjs.com/package/express-session)
* [BCrypt](https://www.npmjs.com/package/bcrypt)

### Server & Deployment
* [NODEjs](https://nodejs.org/en/docs/)
* [Heroku](https://devcenter.heroku.com/categories/reference)

### Database
* [MySQL2](https://www.npmjs.com/package/mysql2)

### Templated Structure
* [Tailwind CSS](https://tailwindcss.com/)
* [Handlebars](https://handlebarsjs.com/)
* [JAWsDB](https://www.jawsdb.com/docs/)
* [Express](https://www.npmjs.com/package/express)

### API
* [Google Maps API](https://developers.google.com/maps) 
* [Google Maps Distance Matrix Service](https://developers.google.com/maps/documentation/javascript/distancematrix) 
* [OpenWeather One Call API](https://openweathermap.org/api/one-call-api)
* [Geolocation Web API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) 


## Design Notes

* Utilises geolocation web api data to determine a user's position
* Utilises Google Map API & Distance Matrix Service to determine distance between user and a given waypoint
* Determines check-in success based on user's distance from waypoint
* Saves user progress to client-side storage
* Ability to reset adventure progress from adventure start pages
* Interactive (accepts and responds to user input)
* Displays current weather on main page
* Clean and simple card-based user interface
* Mobile-first design

## Links

[Deployed Application](https://local-discovery.herokuapp.com/)

[Github Repository](https://github.com/stephje/local-discovery-v2)

<!-- [Video of DEMO](Link to youtube video goes here) -->

[Presentation Slides](https://onedrive.live.com/edit.aspx?cid=fe463989a91d4b3e&page=view&resid=FE463989A91D4B3E!2799&parId=FE463989A91D4B3E!101&app=PowerPoint)

## Screenshots of Deployed Application

### Main Page - Mobile View

<!-- ![Deployed Website - Mobile View](./assets/images/mobile.png) -->
