var Crawler = require("crawler");
var jsdom = require('jsdom');

var current_book = { }

var c = new Crawler({
    jQuery: jsdom,
    maxConnections : 100,
    forceUTF8:true,
  // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, result, $) {
      var urls = $('#list a');
      // console.log(urls)
      
      
      current_book.title = $('#maininfo h1').text()
      current_book.author = $('#info p').eq(0).text()
      current_book.update_time = $('#info p').eq(2).text()
      current_book.latest_chapter = $('#info p').eq(3).html()
      current_book.intro = $('#intro').html()
      current_book.chapters = [];

      for(var i = 0; i< urls.length; i++){
        var url = urls[i]
        
        var _url = $(url).attr('href')+"";
        var num = _url.replace('.html','');
        var title = $(url).text();


        current_book.chapters.push({
          num: num,
          title: title,
          url: _url
        })
      }
      
      console.log(current_book)
    }
});

c.queue('http://www.biquku.com/0/330/');