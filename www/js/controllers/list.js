module.controller('LISTController', function($scope) {
    $scope.name = "NAGANO"
    $scope.lunch = {};
    $scope.lunch.list = [];
    $scope.shopDetail = {};
    getShopList()
    $scope.isDetailShow = false;

    $scope.showDetail = function(ShopID, address, ShopName, Genre, access) {
        ////ShopID = "ChIJ0yLs0nQSA2ARwPw6Aaf4ScM";
        $scope.isDetailShow = true;
        myDB.findAllData("ShopDetailList", { ShopID: ShopID }, function(err, res) {
            if (err != null) console.log(err)
            $scope.$apply(function() {
                $scope.shopDetail = res[0]

                $scope.shopDetail["address"] = address
                $scope.shopDetail["ShopName"] = ShopName
                $scope.shopDetail["Genre"] = Genre
                $scope.shopDetail["access"] = access
            })
        })
    }

    $scope.backbtn = function() {
        $scope.isDetailShow = false;
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