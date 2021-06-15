const sequelize = require('../config/connection');
const { Adventure, Cottesloe} = require('../models');

// const userData = require('./userData.json');
const adventureData = require('./adventureData.json');
const cottesloeData = require('./cottesloeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Adventure.bulkCreate(adventureData, {
    returning: true,
  });

  await Cottesloe.bulkCreate(cottesloeData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
