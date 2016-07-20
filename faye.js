var faye = require('faye');
var bayeux = new faye.NodeAdapter({mount: '/faye'});
    
module.exports = function (app) {
  // attach server
  bayeux.attach(app);
  
  app.bayeux = bayeux;
  // attach client to app
  // use ctx.app.faye
  app.faye = bayeux.getClient();
}