//35.690955, 139.701794


module.controller('MapController', function($scope,NgMap) {
  

    var vm = this;
  vm.types = "['establishment']";
  vm.placeChanged = function() {
    vm.place = this.getPlace();
    console.log('location', vm.place.geometry.location);
    vm.map.setCenter(vm.place.geometry.location);
  }

  
  NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
  });





});

