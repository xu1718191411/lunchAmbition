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
  .controller('GoogleMapController', function($scope) {
        $scope.name = "syoui"

               //Map initialization  

            //    setTimeout(function(){
            //     var latlng = new google.maps.LatLng(35.7042995, 139.7597564);
            //     var myOptions = {
            //         zoom: 8,
            //         center: latlng,
            //         mapTypeId: google.maps.MapTypeId.ROADMAP
            //     };
            //     console.log("map div...")
            //     console.log(document.getElementById("map"))
            //     $scope.map = new google.maps.Map(document.getElementById("map"), myOptions); 
            //     console.log("google map outputing......")
            //     console.log($scope.map)
            //     $scope.overlay = new google.maps.OverlayView();
            //     $scope.overlay.draw = function() {}; // empty function required
            //     $scope.overlay.setMap($scope.map);
            //     $scope.element = document.getElementById('map');
            //    },100)

            setTimeout(function(){

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 14
                  });

            },100)


  });