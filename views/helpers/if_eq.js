/**
 * If Equals
 * if_eq this compare=that
 */

define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('if_eq', function(context, options) {
        if (context == options.hash.compare){
            return options.fn(this);
        }
        
        return options.inverse(this);
    });
});