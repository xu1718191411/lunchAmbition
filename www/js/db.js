var APPLICATION_KEY = "13189140e16f068df04ebe4d93ebaf5767d6ec824736f14d2467426f9ce3b7ee";
var CLIENT_KEY = "a1ea34fca85c56a9cc9176da51ccbdc95b2fb162f80fe421250661a29c754c91";
var MEMBER_ID = 1123445
ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);

var myDB = {
    
    insertIntoDataBase : function(tableName,info,cb){
        var tableData = ncmb.DataStore(tableName)
        var newTableInstance = new tableData();
        for(var i in info){
            newTableInstance.set(i,info[i])
        }
        newTableInstance.save().then(function(){
            console.log("保存に成功しました。:: " + newTableInstance.objectId);
            cb(null,"ok")
        }).catch(function(error){
            console.log("保存に失敗しました。エラー:" + error);
            cb(true,error)
        })

    },

    updateInfoDateBase:function(tableName,qualification,info,cb){
        var tableData = ncmb.DataStore(tableName)

        var title
        var value

        for(var i in qualification){
            title = i
            value = qualification[i]
            tableData.equalTo(title,value)
        }


        var newTableInstance = new tableData();
        

        newTableInstance
        .fetchAll()
        .then(function(results){
            var result = results[0]
            for(var i in info){
                result.set(i,info[i])
            }
            result.save().then(function(){
                console.log("更新成功しました。:: " + result.objectId);
                cb(null,"ok")
            }).catch(function(error){
                console.log("更新に失敗しました。エラー:" + error);
                cb(true,error)
            })


        }).catch(function(err){
            console.log(err);
        });






    
    }
}
