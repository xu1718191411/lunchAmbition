var APPLICATION_KEY = "13189140e16f068df04ebe4d93ebaf5767d6ec824736f14d2467426f9ce3b7ee";
var CLIENT_KEY = "a1ea34fca85c56a9cc9176da51ccbdc95b2fb162f80fe421250661a29c754c91";
var MEMBER_ID = 1
ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);

var myDB = {

    findAllData: function(tableName, qualification, cb) {
        var tableData = ncmb.DataStore(tableName)

        for (var i in qualification) {
            var title = i
            var value = qualification[i]
            tableData.equalTo(title, value)
            console.log("title:" + title)
            console.log("value:" + value)
        }


        tableData.fetchAll().then(function(results) {

            cb(null, results)

        }).catch(function(err) {
            cb(err, null)
        })
    },

    insertIntoDataBase: function(tableName, info, cb) {
        var tableData = ncmb.DataStore(tableName)
        var newTableInstance = new tableData();
        for (var i in info) {
            newTableInstance.set(i, info[i])
        }
        newTableInstance.save().then(function() {
            console.log("保存に成功しました。:: " + newTableInstance.objectId);
            cb(null, newTableInstance.objectId)
        }).catch(function(error) {
            console.log("保存に失敗しました。エラー:" + error);
            cb(true, error)
        })

    },

    updateInfoDateBase: function(tableName, qualification, info, cb) {
        var tableData = ncmb.DataStore(tableName)

        var title
        var value

        for (var i in qualification) {
            title = i
            value = qualification[i]
            tableData = tableData.equalTo(title, value)
        }


        tableData
            .fetchAll()
            .then(function(results) {
                var result = results[0]
                for (var i in info) {
                    result.set(i, info[i])
                        //result.set(lastCheckInTime,1111111)
                }
                result.update().then(function() {
                    console.log("更新成功しました。:: " + result.objectId);
                    cb(null, result.objectId)
                }).catch(function(error) {
                    console.log("更新に失敗しました。エラー:" + error);
                    cb(true, error)
                })

            }).catch(function(err) {
                console.log(err);
            });

    },

    deleteInfoDateBase: function(tableName, qualification, cb) {
        var tableData = ncmb.DataStore(tableName)
        var title
        var value

        for (var i in qualification) {
            title = i
            value = qualification[i]
            tableData.equalTo(title, value)
        }

        tableData.delete().then(function(result) {
                cb(null, result)
            })
            .catch(function(err) {
                // エラー処理
                cn(err, null)
            });

    },

    login: function(userName, password, teamId, cb) {
        var user = new ncmb.User({ userName: userName, password: password, teamID: teamId });
        console.log({ userName: userName, password: password, teamID: teamId })
        ncmb.User.login(user)
            .then(function(data) {
                // ログイン後処理
                cb(null, data)
            })
            .catch(function(err) {
                // エラー処理
                cb(err, null)
            });
    },

    getCurrentUser: function() {
        var currentUser = ncmb.User.getCurrentUser();
        if (currentUser) {
            return currentUser
        } else {
            return null
        }
    },

    registerUser: function(info) {
        //Userのインスタンスを作成
        var user = new ncmb.User();

        for (var i in info) {
            user.set(i, info[i])
        }

        // user.set("userName", "Yamada Tarou")
        // .set("password", "password")
        // .set("phone_number", "090-1234-5678"); // 任意フィールドを追加

        // 新規登録
        user.signUpByAccount()
            .then(function() {
                alert(1)
                    // 登録後処理
            })
            .catch(function(err) {
                console.log(err)
                    // エラー処理
            });

    }




}