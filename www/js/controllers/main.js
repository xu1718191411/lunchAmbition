// APIキーの設定
var APPLICATION_KEY ="13189140e16f068df04ebe4d93ebaf5767d6ec824736f14d2467426f9ce3b7ee";
var CLIENT_KEY ="a1ea34fca85c56a9cc9176da51ccbdc95b2fb162f80fe421250661a29c754c91";

ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);

module.controller('mainCtrl', function ($scope) {
    // ここにJavaScriptを利用した、動的なアプリの動作を書いていきます

    $scope.moveToPage = function(page) {
        if (page === "page1") {
            pageNavigator.pushPage('page1.html');
        }else if(page==='back'){
            pageNavigator.popPage(); //1つ前の画面に戻る
        }
    }

});


module
  .controller('SplitterController', function() {
    this.load = function(page) {
      mySplitter.content.load(page)
        .then(function() {
          mySplitter.left.close();
        });
    };
  });


  module
    .controller('GoogleMapController', function($scope,NgMap) {
            $scope.name = "syoui"

            var vm = this;
            vm.types = "['establishment']";
            $scope.name = "syoui"
            $scope.centerPos = {}
            $scope.positions =[];
            var geocoder = new google.maps.Geocoder();
            vm.geocoder = geocoder;


            $scope.search = function() {
              //searchFromKeyWords($scope.address)
              searchNearBy($scope.address)
            }

            $scope.saveStore = function(p){
              $scope.saveShop(p)
            }

            NgMap.getMap().then(function(map) {
              allowCurrentLocation(map)
              vm.map = map;
              vm.service = new google.maps.places.PlacesService(map);

            });



            searchNearBy =  function(text){
              $scope.positions = []
                vm.service.nearbySearch({
                  location: $scope.centerPos,
                  radius: 500,
                  type: ['store']
                }, function(results, status){
                      $scope.$apply(function(){
                          if (status === google.maps.places.PlacesServiceStatus.OK) {
                              for (var i = 0; i < results.length; i++) {
                                  console.log(results[i])
                                   var pos = [results[i].geometry.location.lat(),results[i].geometry.location.lng()]
                                   var obj = {pos:pos,name:results[i].name,formatted_address:results[i].vicinity,place_id:results[i].place_id}
                                   $scope.positions.push(obj)
                              }
                          }
                      })

                });
            }
             
             searchFromKeyWords = function(text){

                    vm.geocoder.geocode({country: 'JP','address': text}, function(results, status) {

                      $scope.$apply(function(){
                          if (status === 'OK') {
                            vm.map.setCenter(results[0].geometry.location);
                            console.log("results",results);
                            for(var i=0;i<results.length;i++){
                                    var formatted_address = results[i].formatted_address
                                    var place_id = results[i].place_id
                                    var pos = [results[i].geometry.location.lat(),results[i].geometry.location.lng()]
                                    var obj = {pos:pos,name:text,formatted_address:formatted_address,place_id:place_id}
                                    $scope.positions.push(obj)
                                    console.log($scope.positions)
                            }

                          } else {
                            alert('Geocode was not successful for the following reason: ' + status);
                          } 
                      })

                    }); 

              }


            function allowCurrentLocation(map){
              var infoWindow = new google.maps.InfoWindow({map: map});

              // Try HTML5 geolocation.
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  $scope.$apply(function(){
                        var pos = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };
                        $scope.centerPos = pos;

                        infoWindow.setPosition(pos);
                        infoWindow.setContent('現在地');
                        map.setCenter(pos);
                  })

                }, function() {

                    $scope.$apply(function(){
                          handleLocationError(true, infoWindow, map.getCenter());
                    })

              })
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
            }


            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
              infoWindow.setPosition(pos);
              infoWindow.setContent(browserHasGeolocation ?
                                    'Error: The Geolocation service failed.' :
                                    'Error: Your browser doesn\'t support geolocation.');
            }







        $scope.saveShop = function(p) {
              //外部サーバー保存
              //保存先クラスの作成
              var LunchShopData = ncmb.DataStore("ShopList");    //データテーブル作成
              //クラスインスタンスを作成
              var lunchShop = new LunchShopData();
              var shopname = p.name;

              console.log("確認:" + shopname); 

              var objID = "";
       
              if (typeof shopname === "string" && shopname !== "") {
                  lunchShop.set("ShopName",shopname);  //サーバーに記録
                  lunchShop.set("PlaceID",p.place_id);
                  lunchShop.set("FormattedAddress",p.formatted_address);
                  lunchShop.set("LAT",p.pos[0])
                  lunchShop.set("LNG",p.pos[1])
                  lunchShop.save()
                  .then(function (){
                      // 保存に成功した場合の処理
                      console.log("保存に成功しました。:: "+ lunchShop.objectId);
                      objID = lunchShop.objectId;
                      setSuccess(shopname,objID);
                  })
                  .catch(function (error){
                      // 保存に失敗した場合の処理
                      console.log("保存に失敗しました。エラー:" + error); 
                      setError();
                  });
              }


              $scope.shopItem = {};
        }



          //登録成功時
          function setSuccess(shopname,object_id){
              ons.notification.alert({
                  title:'登録成功',
                  message: '店舗登録しました'
              });  
          
          }


          //登録失敗時
          function setError(){
              ons.notification.alert({
                  title:'登録失敗',
                  message: '登録失敗しました'
              }); 
          }




    });








