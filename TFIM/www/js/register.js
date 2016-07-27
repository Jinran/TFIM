angular.module('register', [])

.controller('registerCtrl', ['$scope', '$ionicLoading', '$location', function ($scope, $ionicLoading, $location) {
    $scope.username = '';
    $scope.userpassword = '';
    $scope.text = '';

    $scope.register = function (username, userpassword) {
        window.JMessage.register(username, userpassword, function () {
            $ionicLoading.show({
                template: '注册成功',
                noBackdrop: true,
                duration: 1000
            });
            $location.path('/login');
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        })
    };
}])