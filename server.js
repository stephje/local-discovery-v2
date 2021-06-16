const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const Handlebars = require('handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

Handlebars.registerHelper("ifStart", function (conditional, options) {
  if (conditional === "start") {
    return options.fn(this);
  }
});

Handlebars.registerHelper("ifNotStart", function (conditional, options) {
  if (conditional !== "start") {
    return options.fn(this);
  }
});

Handlebars.registerHelper("ifClue", function (conditional, options) {
  if (conditional === "clue") {
    return options.fn(this);
  }
});

Handlebars.registerHelper("ifNotClue", function (conditional, options) {
  if (conditional !== "clue") {
    return options.fn(this);
  }
});

Handlebars.registerHelper("ifWaypoint", function (conditional, options) {
  if (conditional === "waypoint") {
    return options.fn(this);
  }
});

Handlebars.registerHelper("ifNotWaypoint", function (conditional, options) {
  if (conditional !== "waypoint") {
    return options.fn(this);
  }
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
