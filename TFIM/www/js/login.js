angular.module('login', [])

.controller('loginCtrl', ['$scope', '$state', '$ionicLoading', '$rootScope', function ($scope, $state, $ionicLoading, $rootScope) {
    $scope.login = function (username, userpassword) {
        window.JMessage.login(username, userpassword, function () {
            $ionicLoading.show({
                template: '登录成功',
                noBackdrop: true,
                duration: 1000
            });
            //登陆成功将session信息存入userSession，并加入全局$rootScope对象
            var userSession = new Object();
            userSession.username = username;
            $rootScope.userSession = userSession;
            //登录成功标识
            $rootScope.isLogin = true;
            $state.go('tab.chats');
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });
    };
}]);