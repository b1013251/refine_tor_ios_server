/*------------------------------------------------
  　評価数取得する
-------------------------------------------------*/
module.exports = function(req , res) {
  var post_id = req.url.split("?")[1];

  console.log("postid " + post_id);

  mariadb.init();
  async.waterfall([
   function(callback) {
      mariadb.count_eval(callback , post_id);
   } ,
   function(count , callback) {
     res.send(count);
     callback(null);
   }
 ]);
}
