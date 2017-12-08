module.controller('TeamController', function($scope) {
    $scope.name = "MIYAMOTO"
    $scope.lunch = {};
    $scope.lunch.HighPointUser = [];
    getHighPoint()

    function getHighPoint() {
        var PointList = ncmb.DataStore("GetPointList");
        PointList.fetchAll()
            .then(function(result) {

                for (var i = 0; i < result.length; i++) {
                    var MemberID = result[i].MemberID;
                    console.log("TGGGGGGGGG:" + MemberID)
                        (function(_i) {
                            console.log("TGGGGGGGGG:1")
                            myDB.findAllData("MemberList", { MemberID: MemberID }, function(err, res) {
                                console.log("TGGGGGGGGG:2")
                                if (err) console.log(err)
                                console.log("TGGGGGGGGG:3")
                                console.log(res)
                                if (Object.keys(res).length != 0) {
                                    result[_i]["TeamID"] = res[0]["TeamID"]
                                    console.log(result);
                                }
                            })
                        })(i)
                }

                $scope.$apply(function() {
                    $scope.lunch.GetPoint = result;

                    $scope.name = "No1";
                })

            })
            .catch(function(err) {

            });

    }
})