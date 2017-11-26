var module = angular.module('app', ['onsen','ngMap']);
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

