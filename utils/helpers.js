const Handlebars = require('handlebars');

function registerHelpers() {

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
}

module.exports = registerHelpers;