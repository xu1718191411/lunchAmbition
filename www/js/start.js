var module = angular.module('app', ['onsen']);
angular.element(document).ready(function () {
    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            console.log("端末の準備ができました");
            angular.bootstrap(document.body, ['app']);
        }, false);
    } else {
        console.log("ブラウザの準備ができました");
        angular.bootstrap(document.body, ['app']);
    }
});



function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 14
    })
}