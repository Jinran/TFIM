angular.module('contactDetail', [])

.controller('contactDetailCtrl', ['$scope', '$rootScope', '$stateParams', '$ionicLoading', function ($scope, $rootScope, $stateParams, $ionicLoading) {
    $scope.username = $stateParams.username;
    $scope.targetid = $stateParams.targetid;

    window.JMessage.getUserInfo($scope.targetid, null, function (response) {
        $scope.userInfo = angular.fromJson(response);
        console.log($scope.userinfo);
    }, function (errorStr) {
        $ionicLoading.show({
            template: errorStr,
            noBackdrop: true,
            duration: 1000
        });
    });
}])