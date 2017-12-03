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

    $scope.login = function(memberName){
        myDB.login(memberName,memberName,$scope.teamID,function(err,res){
            console.log(err)
            console.log(res)
            if(err == null){
                myNavigator.pushPage("start.html", { animation: "slide" })
            }else{
                    alert("login error")
            }
        })
    }

    $scope.register = function(){
        myDB.registerUser({userName:"xu",password:"xu",teamID:1,"phone_number":"090-1234-5678"});
        myDB.registerUser({userName:"nagano",password:"nagano",teamID:2,"phone_number":"090-1234-5678"});
        myDB.registerUser({userName:"honda",password:"honda",teamID:1,"phone_number":"090-1234-5678"});
        myDB.registerUser({userName:"miya",password:"miya",teamID:1,"phone_number":"090-1234-5678"});
        myDB.registerUser({userName:"nagase",password:"nagase",teamID:2,"phone_number":"090-1234-5678"});
    }


});