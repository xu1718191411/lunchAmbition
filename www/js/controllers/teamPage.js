module.controller('TeamController',function($scope){
    $scope.name = "MIYAMOTO"
    $scope.lunch = {};
    $scope.lunch.HighPointUser = [];
    getHighPoint()

    function getHighPoint(){
        var PointList = ncmb.DataStore("GetPointList");    
        PointList.fetchAll()
        .then(function(result){
 
            $scope.dataArray(function(){
                $scope.lunch.GetPoint=list;
                console.log($scope.lunch.HighPointUser);
                $scope.name ="No1";
            })
        })
        .catch(function(err){

        });

    }
})


