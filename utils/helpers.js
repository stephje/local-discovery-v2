const Handlebars = require('handlebars');

function registerHelpers() {

    Handlebars.registerHelper("when", function(value1, operator, value2, options){
        
        const operators = {
            'is': function(value1,value2) { return value1 === value2; },
            'not': function(value1,value2) { return value1 !== value2; },
            'or': function(value1,value2) { return value1 || value2; },
            'and': function(value1,value2) { return value1 && value2; },
        },
        
        result = operators[operator](value1, value2);
        if (result) return options.fn(this);
    });

    Handlebars.registerHelper("when3", function(value1, operator, value2, value3, options){
        
        const operators = {
            'orEquals': function(value1,value2,value3) { return (value1 === value2 || value1 === value3); },
            'andNotEquals': function(value1,value2,value3) { return (value1 !== value2 && value1 !== value3) },
        },
        
        result = operators[operator](value1, value2, value3);
        if (result) return options.fn(this);
    });

    Handlebars.registerHelper("when4", function(value1, operator, value2, value3, value4, options){
        
        const operators = {
            'andEquals': function(value1,value2,value3,value4) { return (value1 === value2 && value3 === value4) },
            'orNotEquals': function(value1,value2,value3,value4) { return (value1 !== value2 || value3 !== value4) },
        },
        
        result = operators[operator](value1, value2, value3, value4);
        if (result) return options.fn(this);
    });

    
}

module.exports = registerHelpers;