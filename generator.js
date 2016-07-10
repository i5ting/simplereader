var utils = require('./utils')

module.exports = function (path) {
  console.log(path)
  var gen = this;
  
  gen.current_book = {}
  
  gen.current_book = require(path+ '/book.json')
  
  console.log(gen.current_book)
  
  utils.write_total_chapter(gen.current_book)
}