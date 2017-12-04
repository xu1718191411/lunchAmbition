module.controller('TeamController', function($scope) {
    $scope.name = "MIYAMOTO"
    $scope.lunch = {};
    $scope.lunch.HighPointUser = [];
    getHighPoint()

    function getHighPoint() {
        var PointList = ncmb.DataStore("GetPointList");
        PointList.fetchAll()
            .then(function(result) {
                console.log(111111111)
                console.log(result);
                $scope.$apply(function() {
                    $scope.lunch.GetPoint = result;

                    $scope.name = "No1";
                })
            })
            .catch(function(err) {

            });

    }
})