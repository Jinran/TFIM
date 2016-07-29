angular.module('myDetail', [])

.controller('myDetailCtrl', ['$scope', '$rootScope', '$ionicLoading', function ($scope, $rootScope, $ionicLoading) {
    $scope.myInfo = new Object();
    $scope.myAvatar = 'img/sys/he.png';
    $scope.getMyInfo = function () {
        window.JMessage.getUserInfo('111', null, function (response) {
            console.log('1111');
            $scope.myInfo = angular.fromJson(response);
            console.log('======');
            console.log($scope.myInfo);
            console.log('======');
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });
    };
    
    window.JMessage.getUserAvatar($rootScope.userSession.username, function (path) {
        console.log(path);
    }, function (response) {
        console.log(response);
        $ionicLoading.show({
            template: response,
            noBackdrop: true,
            duration: 1000
        });
    });
}])