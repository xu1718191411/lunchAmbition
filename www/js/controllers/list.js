module.controller('LISTController', function($scope) {
    $scope.name = "NAGANO"
    $scope.lunch = {};
    $scope.lunch.list = [];
    $scope.shopDetail = {};
    getShopList()
    $scope.isDetailShow = false;
    $scope.showDetail = function(ShopID, address) {
        console.log("cccc", ShopID);
        ////ShopID = "ChIJ0yLs0nQSA2ARwPw6Aaf4ScM";
        $scope.isDetailShow = true;
        myDB.findAllData("ShopDetailList", { ShopID: ShopID }, function(err, res) {
            if (err != null) console.log(err)
            $scope.$apply(function() {
                $scope.shopDetail = res[0]
                $scope.shopDetail["address"] = address
            })
        })
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