var serve = require('koa-static');
var Koa = require('koa');
var app = new Koa();

var favicon = require('koa-favicon');
var compress = require('koa-compress')
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');

app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))


app.use(favicon(__dirname + '/public/favicon.ico'));

// etag works together with conditional-get
app.use(conditional());
app.use(etag());


// or use absolute paths
app.use(serve(__dirname + '/dist'));

// 
var index = require('./routes/index');



app.use(index.routes);


app.listen(9090);

console.log('listening on port 9090');