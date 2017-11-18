module.controller('LoginController', function ($scope) {
    // ここにJavaScriptを利用した、動的なアプリの動作を書いていきます
    $scope.MemberName = "xu"
    $scope.teamName = ""
    $scope.teamID = ""
    $scope.teamList = []
    retrieval();
    function retrieval(){
        var teamData = ncmb.DataStore("TeamList");
        teamData.fetchAll().then(function(results){
                $scope.$apply(function(){
                    $scope.teamList = results;
                    $scope.teamName = results[0].TeamName
                    $scope.teamID = results[0]. TeamID
                })
        })
    } 

    function findUserList(cb){
        var memberData = ncmb.DataStore("MemberList"); 
        console.log($scope.teamID)
        memberData.equalTo("TeamID", parseInt($scope.teamID))
        .fetchAll().then(function(results){
            $scope.$apply(function(){
                if(cb(results)){
                    ons.notification.alert({
                        title:'成功',
                        message: 'ログインできました'
                    });  
                }else{
                    ons.notification.alert({
                        title:'エラー',
                        message: 'ログインできませんでした'
                    });  
                }
            })
        })
    }

    $scope.login = function(){
        findUserList(function(results){
               console.log(results)
               for(var i=0;i<results.length;i++){
                   if(results[i].MemberName == $scope.MemberName){


                       ncmb.User.login(results[i].MemberName, "hey")
                       .then(function(data){
                         // ログイン後処理
                         console.log(data)
                       })
                       .catch(function(err){
                        console.log("loginData"+err)
                         // エラー処理
                       });


                       return true

                   }
               }

               return false
        }) 
    }


    function signUp(){
        var user = new ncmb.User();
        
        //ユーザー名・パスワードを設定
        user.set("userName", "xu")
            .set("password", "hey")
            .set("TeamID", 1); // 任意フィールドを追加
        
        // 新規登録
        user.signUpByAccount()
            .then(function(){
              // 登録後処理
            })
            .catch(function(err){
              // エラー処理
            });
        
    }


});