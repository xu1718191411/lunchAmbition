module.controller('TeamController', function($scope) {
    $scope.HighPointUser = [];
    getHighPoint()

    function getHighPoint() {
        myDB.findAllData("GetPointList", {}, function(err, results) {
            if (err) {
                console.log("error happened when execute GetPointList")
                console.log(err)
                return;
            }
            for (var i = 0; i < results.length; i++) {
                var MemberID = results[i].MemberID;



                (function(_i) {
                    myDB.findAllData("MemberList", { MemberID: MemberID }, function(err, res) {
                        if (err) console.log(err)

                        if (res == null) res = {}
                        if (Object.keys(res).length != 0) {
                            results[_i]["TeamID"] = res[0]["TeamID"]
                            var teamID = res[0].TeamID;
                            (function(__i) {
                                myDB.findAllData("TeamList", { TeamID: teamID }, function(_err, _res) {
                                    if (_err) console.log(_err)

                                    if (Object.keys(_res).length != 0) {

                                        results[__i]["TeamName"] = _res[0]["TeamName"]



                                        $scope.$apply(function() {

                                            // results.sort(function(a, b) {
                                            //     return a.TeamID - b.TeamID
                                            // })

                                            $scope.HighPointUser = results;


                                            $scope.HighPointUser.sort(function(a, b) {
                                                return a.TeamID - b.TeamID
                                            })

                                        })



                                    }
                                })
                            })(_i)

                        }
                    })
                })(i)






            }
        })
    }



})