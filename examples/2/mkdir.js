function mkdir(folder){
  var mkdirp = require('mkdirp');
    
  mkdirp('dist/' + folder, function (err) {
      if (err) console.error(err)
      else console.log('pow!')
  });
}

mkdir('i am mkdir folder')