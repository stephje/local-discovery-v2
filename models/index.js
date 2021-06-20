const User = require('./User');
const Adventure = require('./Adventure');
const Cottesloe = require('./Cottesloe');
const userCottesloe = require('./userCottesloe');
const Kingspark = require('./Kingspark');
const userKingspark = require('./userKingspark');

userCottesloe.belongsTo(User, {
    foreignKey: 'user_id',
});

userKingspark.belongsTo(User, {
    foreignKey: 'user_id',
});

// Define a Driver as having one License to create a foreign key in the `license` table
User.hasOne(userCottesloe, {
    foreignKey: 'user_id',
    // When we delete a Driver, make sure to also delete the associated License.
    onDelete: 'CASCADE',
});

User.hasOne(userKingspark, {
    foreignKey: 'user_id',
    // When we delete a Driver, make sure to also delete the associated License.
    onDelete: 'CASCADE',
});

// We can also define the association starting with License
userCottesloe.belongsTo(User, {
    foreignKey: 'user_id',
});

userKingspark.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Adventure, Cottesloe, userCottesloe, Kingspark, userKingspark };
