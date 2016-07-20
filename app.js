const Koa = require('koa');
const app = new Koa();

const favicon = require('koa-favicon');
const compress = require('koa-compress')
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const serve = require('koa-static');
const mount = require('mount-koa-routes');
var views = require('koa-views');

// Must be used before any router is used
app.use(views(__dirname + '/views', {
    extension: 'jade'
}));

app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// app.use(favicon(__dirname + '/public/favicon.ico'));

// etag works together with conditional-get
app.use(conditional());
app.use(etag());
// or use absolute paths
app.use(serve(__dirname + '/dist'));


// bind faye
require('./faye')(app)

// mount routes
mount(app, __dirname + '/routes', true);

// start server
// app.listen(9090);

// console.log('listening on port 9090');

module.exports = app