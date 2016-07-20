var router = require('koa-router')()

router.get('/', function (ctx, next) {
  ctx.body = '/book/0/330'
})

router.get('/:category/:book', function (ctx, next) {
  var category = ctx.params['category']
  var book = ctx.params['book']

  require('hd-crawler')(category, book, function (current, count) {
    console.log(current + '/' + count)
  }, 'public/book');
  
  // // ctx.body = 'this /book/' + category + '/' + book
  // setTimeout(function() {
  //   console.log(ctx.app.faye)
  //   console.log('publish')
  //   ctx.app.faye.publish('/messages', {
  //     text: 'Hello world'
  //   });
  //
  // } ,2000)
  //
  return ctx.render('books/index', {
    'category' : category,
    'book' : book
  });
})

module.exports = router
