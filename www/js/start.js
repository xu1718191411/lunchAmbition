var module = angular.module('app', ['onsen','uiGmapgoogle-maps']);
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

// module.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
//     uiGmapGoogleMapApiProvider.configure({
//         key: 'AIzaSyAOvoVMLV8MsHdpyCCriNbY4Jzmeu2utCE',
//         v: '3.17',
//         libraries: 'weather,geometry,visualization'
//     });
// }]);
module.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: true
        });
    }]
);
      

// module.config(
//     ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
//         GoogleMapApiProviders.configure({
//             china: true
//         });
//     }]
// );