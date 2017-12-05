module.controller('LISTController', function($scope) {
    $scope.name = "NAGANO"
    $scope.lunch = {};
    $scope.lunch.list = [];
    getShopList()
    $scope.isDetailShow = false;
    $scope.showDetail = function(){
        $scope.isDetailShow = true;
    }

    function getShopList() {
        myDB.findAllData("ShopList", {}, function(err, res) {
            if (err != null) console.log(err)
            $scope.$apply(function() {
                $scope.lunch.list = res
            })

        });

    };


    // document.addEventListener('pageinit',function(e){
    //     if(e.target.id === "listPage"){
    //         getShopList();

    //     }
    // });

})