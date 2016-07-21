var router = require('koa-router')()

router.get('/', function (ctx, next) {
  ctx.body = '/book/0/330'
})

router.get('/:category/:book', function (ctx, next) {
  var category = ctx.params['category']
  var book = ctx.params['book']

  require('hd-crawler')(category, book, function (current, count) {
    console.log(current + '/' + count)
    ctx.app.faye.publish('/'+ category + '/' + book, {
      current: current,
      count: count
    });
  }, 'public/book');

  return ctx.render('books/index', {
    'category' : category,
    'book' : book
  });
})

module.exports = router
