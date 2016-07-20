var current_book = {}
var pre_chapter_info = {}
var chapter_info = {}
var post_chapter_info = {}

var type 
var book 
var chapter 

function getQueryStringByName(name){
  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
    return "";
  }
  return result[1];
}

// 增加历史记录
function addHistory(type, book, chapter)
{
	history.pushState({"chapter":chapter}, '','/reader.html?type='+type+'&book='+book+'&chapter=' + chapter + '');
  reset()
  window.scrollTo(0,0)
}

function reset(){
  type = getQueryStringByName('type')
  book = getQueryStringByName('book')
  chapter = getQueryStringByName('chapter')
  
  pre_chapter_info    = current_book.chapters[parseInt(chapter) - 1]
  chapter_info        = current_book.chapters[chapter]
  post_chapter_info   = current_book.chapters[parseInt(chapter) + 1]
}

$(function(){
  type = getQueryStringByName('type')
  book = getQueryStringByName('book')
  chapter = getQueryStringByName('chapter')
  
  $.getJSON('book/' + type + '/' + book + '/book.json', function(data){
    current_book = data;
    
    pre_chapter_info    = current_book.chapters[parseInt(chapter) - 1]
    chapter_info        = current_book.chapters[chapter]
    post_chapter_info   = current_book.chapters[parseInt(chapter) + 1]
    
    load(chapter_info)
  })
  
  function load(chapter_info){
    console.log(chapter_info.title)
    
    $('title').html(chapter_info.title)
    $('.chapter_title').html(chapter_info.title)
    $('#content').load('book/' + type + '/' + book + '/' + chapter_info.url);
  }
  
  //上一章
  $('.pre_chapter_btn').on('click', function(){
    console.log(pre_chapter_info)
    
    load(pre_chapter_info)
    
    addHistory(type, book, parseInt(chapter) - 1)
  })
  
  //章节列表
  $('.chapter_btn').on('click', function(){
    console.log(chapter_info)
    window.scrollTo(0,0)
  })
  
  //下一章
  $('.post_chapter_btn').on('click', function(){
    console.log(post_chapter_info)
    
    load(post_chapter_info)
    
    addHistory(type, book, parseInt(chapter) + 1)
  })
  
  //加入书签
  $('.bookmark').on('click', function(){
    
  })
})
