/*------------------------------------------------
  　ライブラリ，自己定義ファイル読み込み
-------------------------------------------------*/
var async      = require('async');

/*------------------------------------------------
  　評価数取得する
-------------------------------------------------*/
module.exports = function(req , res) {
  var post_id = req.query.post_id;
  var count = 0;

  async.series([
   function(callback) {
      count = select_eval(post_id);
      callback(null);
   } ,
   function(callback) {
     console.log(count);
     callback(null);
   }
 ], function() {
    res.send('1');
 });
}

/*------------------------------------------------
  　テーブルから評価数を取り出す
-------------------------------------------------*/
function select_eval(post_id) {
  var connection = require('../helper/db_helper').connection();

  var place = 'select count(*) as count from Eval where post_id = ?';
  var query = connection.query(place, parseInt(post_id));
  var cou = 0;

  query
    .on('error' , function(err) {
      console.log(err);
      console.log("評価データ取り出し中にエラー");
    })
    .on('result' , function(rows) {
      if(rows != null) {
        console.dir(rows);
        cou = rows.count;
      } else {
      }
    })
    .on('end' , function() {
      return cou;
    });
}
