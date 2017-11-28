// APIキーの設定
var APPLICATION_KEY = "13189140e16f068df04ebe4d93ebaf5767d6ec824736f14d2467426f9ce3b7ee";
var CLIENT_KEY = "a1ea34fca85c56a9cc9176da51ccbdc95b2fb162f80fe421250661a29c754c91";

ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);

module.controller('mainCtrl', function($scope) {
    // ここにJavaScriptを利用した、動的なアプリの動作を書いていきます

    $scope.moveToPage = function(page) {
        if (page === "page1") {
            pageNavigator.pushPage('page1.html');
        } else if (page === 'back') {
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
    .controller('GoogleMapController', function($scope, $timeout, NgMap) {
        $scope.name = "syoui"

        var qualificationLeastTime = 10;
        var qualificationLeastDistance = 1500
        var checkInShop = {
            placeId: undefined,
            checkInTime: undefined,
            lastCheckTime: undefined,
            lat: undefined,
            lng: undefined
        }

        var vm = this;
        vm.types = "['establishment']";
        $scope.name = "syoui"
        $scope.centerPos = {}
        $scope.positions = [];
        $scope.selectedShop = {}
        $scope.detailShop = {}
        $scope.ifShowDeail = false;
        var geocoder = new google.maps.Geocoder();
        vm.geocoder = geocoder;

        var service = new google.maps.DistanceMatrixService();
        vm.distanceService = service;

        $scope.search = function() {
            //searchFromKeyWords($scope.address)
            $scope.ifShowDeail = false;
            searchNearBy($scope.address)
        }

        $scope.saveStore = function(n, p) {
            $scope.saveShop(p)
        }

        $scope.clear = function() {
            $scope.positions = [];
        }

        $scope.showInfo = function(p, i) {
            $scope.selectedShop = i
            vm.map.showInfoWindow("cached", this);
            $scope.goToDetail(i);
        }

        $scope.goToDetail = function(p) {
            $scope.ifShowDeail = true;
            requireForDetail(p.place_id)
        }

        $scope.backToList = function() {
            $scope.ifShowDeail = false;
        }

        $scope.startCheckIn = function(p) {
            console.log(p)
            console.log($scope.centerPos)

            if (Object.getOwnPropertyNames($scope.centerPos).length > 0) {
                // calculate the distance between current location and the destination place
                var origin1 = new google.maps.LatLng($scope.centerPos.lat, $scope.centerPos.lng);
                var destinationB = new google.maps.LatLng(p.geometry.location.lat(), p.geometry.location.lng());
                calculateDistanceBetweenTwoPoints(origin1, destinationB, function(distance) {
                    if (distance > qualificationLeastDistance) {
                        alert("店にとりあえず行こうよう")
                    } else {
                        alert("店につきました、いただきましょう")

                        checkInShop.placeId = p.place_id
                        checkInShop.checkInTime = Date.parse(new Date()) / 1000
                        checkInShop.lastCheckTime = Date.parse(new Date()) / 1000
                        checkInShop.lat = p.geometry.location.lat()
                        checkInShop.lng = p.geometry.location.lng()


                        startCheckIng()

                    }
                });
            } else {
                alert("現在地を取得してください")
            }
        }

        NgMap.getMap().then(function(map) {
            allowCurrentLocation(map)
            vm.map = map;
            vm.service = new google.maps.places.PlacesService(map);
        });

        searchNearBy = function(text) {
            $scope.positions = []
            vm.service.nearbySearch({
                location: $scope.centerPos,
                radius: 500,
                rankby: "distance",
                radius: 1500,
                keyword: text
            }, function(results, status) {
                $scope.$apply(function() {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var pos = [results[i].geometry.location.lat(), results[i].geometry.location.lng()]
                            var obj = { pos: pos, name: results[i].name, formatted_address: results[i].vicinity, place_id: results[i].place_id, icon: results[i].icon }
                            $scope.positions.push(obj)
                        }
                    }
                })

            });
        }

        searchFromKeyWords = function(text) {

            vm.geocoder.geocode({ country: 'JP', 'address': text }, function(results, status) {

                $scope.$apply(function() {
                    if (status === 'OK') {
                        vm.map.setCenter(results[0].geometry.location);
                        for (var i = 0; i < results.length; i++) {
                            var formatted_address = results[i].formatted_address
                            var place_id = results[i].place_id
                            var pos = [results[i].geometry.location.lat(), results[i].geometry.location.lng()]
                            var obj = { pos: pos, name: text, formatted_address: formatted_address, place_id: place_id }
                            $scope.positions.push(obj)

                        }

                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                })

            });

        }

        function requireForDetail(_id) {
            vm.service.getDetails({
                placeId: _id
            }, function(place, status) {

                $scope.$apply(function() {

                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(place)
                            //formatted_address
                            //formatted_phone_number
                            //geometry
                            //location
                            //lat
                            //lng
                            //icon
                            //nam
                            //photos[]
                            //getUrl()
                            //width
                            //height
                            //place_id
                            //rating
                            //price_level
                            //website

                        $scope.detailShop = place;
                    }

                })

            });
        }


        function allowCurrentLocation(map) {
            var infoWindow = new google.maps.InfoWindow({ map: map });

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    $scope.$apply(function() {
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

                    $scope.$apply(function() {
                        handleLocationError(true, infoWindow, map.getCenter());
                    })

                })
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
        }


        function calculateDistanceBetweenTwoPoints(departure, destination, cb) {
            vm.distanceService.getDistanceMatrix({
                origins: [departure],
                destinations: [destination],
                travelMode: 'DRIVING',
            }, function(response, status) {
                console.log(response)
                cb(response['rows'][0]['elements'][0]['distance']['value']);
                // See Parsing the Results for
                // the basics of a callback function.
            });
        }

        function startCheckIng() {
            //get current location
            //caclulate the distance location between current location and destination 


            getCurrentLocation(function(err, obj) {
                if (err == 1) return; //get current location in failure


                var origin1 = new google.maps.LatLng(obj.lat, obj.lng);
                var destinationB = new google.maps.LatLng(checkInShop.lat, checkInShop.lng);

                calculateDistanceBetweenTwoPoints(origin1, destinationB, function(distance) {
                    if (distance < qualificationLeastDistance) {

                        checkInShop.lastCheckTime = Date.parse(new Date()) / 1000
                        console.log(checkInShop)
                        if (checkInShop.lastCheckTime - checkInShop.checkInTime < qualificationLeastTime) {

                            $timeout(function() {
                                startCheckIng()
                            }, 1000)
                        } else {
                            alert("it is good")
                        }
                    }
                })



            })

        }


        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        }

        function getCurrentLocation(cb) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $scope.centerPos = pos;
                    vm.map.setCenter(pos);

                    cb(0, pos)
                }, function() {
                    cb(1, { msg: "error" })
                });
            } else {
                cb(1, { msg: "not supported" })
            }
        }

        $scope.saveShop = function(p) {
            //外部サーバー保存
            //保存先クラスの作成
            var LunchShopData = ncmb.DataStore("ShopList"); //データテーブル作成
            //クラスインスタンスを作成
            var lunchShop = new LunchShopData();
            var shopname = p.name;


            var objID = "";

            if (typeof shopname === "string" && shopname !== "") {
                lunchShop.set("ShopName", shopname); //サーバーに記録
                lunchShop.set("PlaceID", p.place_id);
                lunchShop.set("FormattedAddress", p.formatted_address);
                lunchShop.set("LAT", p.pos[0])
                lunchShop.set("LNG", p.pos[1])
                lunchShop.save()
                    .then(function() {
                        // 保存に成功した場合の処理
                        console.log("保存に成功しました。:: " + lunchShop.objectId);
                        objID = lunchShop.objectId;
                        setSuccess(shopname, objID);
                    })
                    .catch(function(error) {
                        // 保存に失敗した場合の処理
                        console.log("保存に失敗しました。エラー:" + error);
                        setError();
                    });
            }


            $scope.shopItem = {};
        }



        //登録成功時
        function setSuccess(shopname, object_id) {
            ons.notification.alert({
                title: '登録成功',
                message: '店舗登録しました'
            });

        }


        //登録失敗時
        function setError() {
            ons.notification.alert({
                title: '登録失敗',
                message: '登録失敗しました'
            })
        }



    })