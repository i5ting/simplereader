var Crawler = require("crawler");
var jsdom = require('jsdom');

var c = new Crawler({
    jQuery: jsdom,
    maxConnections : 100,
    forceUTF8:true,
  // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, result, $) {
      var urls = $('#list a');
      console.log(urls)
    }
});

c.queue('http://www.biquku.com/0/330/');