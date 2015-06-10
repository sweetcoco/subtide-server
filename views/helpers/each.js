/*
 * Replacing the each helper allowing us to have scope within a loop.
 * 
 * This is meant to allow multiple scopes within a template rendering (so think of this 
 * like thisView or thisCollection that you would use when defining scope).
 * 
 * Example:
 * 
 * {{#each 'people' in person}}
 *     Name: {{people.name}}
 * {{/each}}
 */

define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('each', function(context, options) {
        var key = null, ret = "", data = null;
        
        if(arguments.length === 4){
            key = arguments[0];
            context = arguments[2];
            options = arguments[3];
        }
        
        if(options.data) {
            data = Handlebars.createFrame(options.data);
        }

        if(context && context.length > 0) {
            for(var i=0, j=context.length; i<j; i++) {
                var that = context[i];
                
                if (data) { data.index = i; }

                if (key) { 
                    that = _.extend({}, this);  // keep 'this' context
                    that[key] = context[i];     // adding user defined key into context
                }

                ret = ret + options.fn(that, { data: data });
            }
        } else {
            ret = options.inverse(this);
        }
        return ret;
    });
});

