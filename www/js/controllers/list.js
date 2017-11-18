module.controller('LISTController',function($scope){
    $scope.name = "NAGANO"
    $scope.lunch = {};
    $scope.lunch.list = [];
    getShopList()


    function getShopList(){
        var lunchShop = ncmb.DataStore("ShopList");    //データテーブル作成
        lunchShop.fetchAll()
        .then(function(results){
            $scope.apply(function(){
                $scope.lunch.list = list;
                console.log($scope.lunch.list);
                $scope.name = "hahahahaha"
            })
        })
        .catch(function(err){

        });
    };


    // document.addEventListener('pageinit',function(e){
    //     if(e.target.id === "listPage"){
    //         getShopList();
        
    //     }
    // });

})