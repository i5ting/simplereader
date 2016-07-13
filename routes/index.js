var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this /1!';
});


router.get('/2', function (ctx, next) {
  ctx.body = 'this /2!';
});

module.exports = router;