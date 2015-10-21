var mysql = require('mysql');
var async = require('async');

function connection() {
  var con;
  async.series([
    function(callback) {
      con = mysql.createConnection({
        host     : 'localhost' ,
        user     : 'node' ,
        password : 'secret' ,
        database : 'node'
      });
      callback(null);
    },
    function(callback) {
      /*
      con.connect(function(err) {
        if (err) {
          console.log('データベース接続時エラー: ' + err.stack);
          callback(null);
        } else {
          console.log('データベース接続成功');
        }
      });
      */
      callback(null);
    }
  ], function() {
  });

  return con;
}


exports.connection = connection;
