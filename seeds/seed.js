const sequelize = require('../config/connection');
const { Adventure, Cottesloe, userCottesloe, Kingspark, userKingspark, User } = require('../models');

// const userData = require('./userData.json');
const adventureData = require('./adventureData.json');
const cottesloeData = require('./cottesloeData.json');
const userCottesloeData = require('./userCottesloeData.json');
const kingsparkData = require('./kingsparkData.json');
const userKingsparkData = require('./userKingsparkData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Adventure.bulkCreate(adventureData, {
    returning: true,
  });

  await Cottesloe.bulkCreate(cottesloeData, {
    returning: true,
  });

  // /Added 19/06
  await userCottesloe.bulkCreate(userCottesloeData, {
    returning: true,
  });

  await Kingspark.bulkCreate(kingsparkData, {
    returning: true,
  });

  // /Added 19/06
  await userKingspark.bulkCreate(userKingsparkData, {
    returning: true,
  });

  const user = await User.bulkCreate(userData);

  for (const { id } of user) {
    // Need to include a valid driver_id when creating a license
    const newuserCottesloe = await userCottesloe.update(
      { user_id: id }, {
      where: {
        id: id
      },
    });
  }
  // /Added 19/06

  for (const { id } of user) {
    // Need to include a valid driver_id when creating a license
    const newuserKingspark = await userKingspark.update(
      { user_id: id }, {
      where: {
        id: id
      },
    });
  }


  process.exit(0);
};

seedDatabase();
