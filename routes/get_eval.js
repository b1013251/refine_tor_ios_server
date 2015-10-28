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
      select_eval(res, post_id)
      callback(null);
   }],
   function() {
   });
};

/*------------------------------------------------
  　テーブルから評価数を取り出す
-------------------------------------------------*/
function select_eval(res, post_id) {
  var connection = require('../helper/db_helper').connection();

  var place = 'select count(*) as count from Eval where post_id = ?';
  var query = connection.query(place, parseInt(post_id));
  var count = 0;

  async.series([
    function(callback){
      query
        .on('error' , function(err) {
          console.log(err);
          console.log("評価データ取り出し中にエラー");
        })
        .on('result' , function(rows) {
          if(rows != null) {
            console.dir(rows);
            count = rows.count;
          } else {
          }
        })
        .on('end' , function() {
          callback(null);
        });
    }], function() {
      console.log(count);
      res.send({
        count : String(count),
        eval  : "true" //TODO: 投稿したかを文字列として与える
      });
    });
}
