
/**
 * DB Access module
 */
// DB open
// name　　    : DB名
// version     : 指定無くてよい
// displayName : 表示名、ダイアログなどで利用される
// size        : 最大容量、バイト単位
function openDb(name, version, displayName, size){
    // DB初回作成時のみコールされる、特に仕様無し、スケルトン
    var callback = function(){
        alert("create new db.");
    };
    return window.openDatabase(name, version, displayName, size, callback);
    
}
// execute sql
// db          : openDbの戻り値
// sqlBase     : 実行するSQL、パラメータ部は?
// sqlParams   : パラメータ（配列）、無い場合空[]を指定
// callback    : 処理終了時コールバック(エラー発生時；第一引数：処理結果)
// err         : 処理エラー時コールバック(エラー発生時；第一引数：エラー情報)
function execSQL(db, sqlBase, sqlParams, callback, err){
    db.transaction(function(transaction){
        // SQL実行
        transaction.executeSql(sqlBase, sqlParams,function(transaction, result){
            // 成功
            callback(result);
        }, function(transaction, error){
            // 失敗
            err(error);
        });
    });
}



function Store(){
	var obj = new Object();
	obj.db = openDb("lunchAmbition", "1.0","lunch",1024 * 1024 * 5);
	obj.initialize = function(){
    	var sql = "CREATE TABLE IF NOT EXISTS PLACES(id INTEGER PRIMARY KEY, formatted_address TEXT,lat DOUBLE,lng DOUBLE,name TEXT,rating TEXT,type TEXT);"
    	execSQL(this.db, sql, [], function(rs){
	    },function(error){
	        alert(error.message);
	    });
	}

	obj.store = function(storeData){


		for(var i=0;i<storeData.length;i++){
			var formatted_address = storeData[i]['formatted_address']
			var lat = storeData[i]['geometry']['location'].lat();
			var lng = storeData[i]['geometry']['location'].lng();
			var name = storeData[i]['name'];
			var rating = storeData[i]['rating'];
			var type =  storeData[i]['types'][0];
			sql="INSERT INTO PLACES(formatted_address,lat,lng,name,rating,type) values('"+formatted_address+"',"+lat+","+lng+",'"+name+"','"+rating+"','"+type+"')";


			(function(_db,_sql){
	   			execSQL(_db, _sql, [], function(rs){
	   			
	   			})
			})(this.db,sql) 
		}

	}

	obj.showStore = function(){

	}

	obj.getLunchShops = function(cb){
			var sql = "SELECT * FROM PLACES";

			execSQL(this.db,sql,[],function(res){
					console.log("res is");
					console.log(res)

					cb(res)
			})
	}

	return obj;
}







