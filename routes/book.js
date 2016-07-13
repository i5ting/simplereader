var router = require('koa-router')()

router.get('/', function (ctx, next) {
  ctx.body = '/book/0/330'
})

router.get('/:category/:book', function (ctx, next) {
  var category = ctx.params['category']
  var book = ctx.params['book']

  require('hd-crawler')(category, book);
  
  ctx.body = 'this /book/' + category + '/' + book
})

module.exports = router
