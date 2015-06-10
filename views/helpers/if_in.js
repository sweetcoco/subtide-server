/**
 * If In (arra)
 * if_in this thatArray
 */

define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('if_in', function(elem, list, options) {
      if(list.indexOf(elem) > -1) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
});
