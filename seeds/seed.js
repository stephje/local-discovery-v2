const sequelize = require('../config/connection');
const { Adventure } = require('../models');

// const userData = require('./userData.json');
const adventureData = require('./adventureData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  await Adventure.bulkCreate(adventureData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
