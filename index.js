var Crawler = require("crawler");
var url = require('url');
var fs = require('fs');
var jsdom = require('jsdom');
var utils = require('./utils')

var current_book = { }

var c = new Crawler({
    jQuery: jsdom,
    maxConnections : 10,
    forceUTF8:true,
  // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, result, $) {
      var urls = $('#list a');

      
      current_book.title = $('#maininfo h1').text()
      current_book.author = $('#info p').eq(0).text()
      current_book.update_time = $('#info p').eq(2).text()
      current_book.latest_chapter = $('#info p').eq(3).html()
      current_book.intro = $('#intro').html()
      current_book.chapters = [];

      for(var i = 0; i< urls.length; i++){
        var url = urls[i]
        
        console.log(i + ' = ' + $(url).attr('href'))

        var _url = $(url).attr('href')+"";
        var num = _url.replace('.html','');
        var title = $(url).text();

        console.log(_url)
        console.log(title)

        current_book.chapters.push({
          num: num,
          title: title,
          url: _url
        })
      }
      
      console.log(current_book)
      
      // process.exit()
      // one('153070')
      get_all_chapters()
    }
});

function info(num){
  utils.mkdir(num);
}

function start(num){
  // Queue just one URL, with default callback
  c.queue('http://www.biquku.com/0/' + num + '/');
  
  current_book.num = num;
  
  info(num)
}

function get_all_chapters(){
  for(var j = 0; j< current_book.chapters.length; j++){
    
    var chapter = current_book.chapters[j]
    console.log(chapter)
    j++;
    // one(current_book.num, chapter.num, chapter.title,j*100)
  }
  
  utils.write_config(current_book)
}

function one(book, chapter, title, t){
  console.log(book + ',' + chapter + ',' + title  + ',' +  t)
  // setTimeout(function(){
//     // Queue URLs with custom callbacks & parameters
    c.queue([{
        uri: 'http://www.biquku.com/0/' + book + '/' + chapter + '.html',
        jQuery: jsdom,
        forceUTF8:true,
        // The global callback won't be called
        callback: function (error, result, $) {
            // console.log();
            var content = $('#content').html();
            utils.write_chapter(book, chapter, content);
        }
    }]);
//   }, t)
}

start(330);