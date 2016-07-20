angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'chat', '$document', function ($scope, chat, $document) {

    $scope.username = '';
    $scope.userpassword = '';
    $scope.text = '';
    $scope.login = function (username, userpassword) {
        chat.login(username, userpassword, function () {
            alert('登录成功');
        }, function (errorStr) {
            alert(errorStr);
        });
    };

    $scope.register = function (username, userpassword) {
        chat.register(username, userpassword, function () {
            alert("注册成功");
        }, function (errorStr) {
            alert(errorStr);
        })
    };
    $scope.sendSingleTextMessage = function (text) {
        chat.sendSingleTextMessage('jinran', text, function (response) {
            //alert('发送消息成功');
        }, function (errorStr) {
            alert('发送消息失败：' + errorStr);
        })
    };
}])

.controller('ChatsCtrl', ['$scope', '$document', '$ionicLoading', 'Chats', function ($scope, $document, $ionicLoading, Chats) {
    $scope.conversations = new Array();
    $scope.doRefresh = function () {
        //取得会话列表
        window.JMessage.getConversationList(function (response) {
            $scope.conversations = response;
            //alert(conversations);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });
        $scope.$broadcast('scroll.refreshComplete');
    };
    
    

    $document.bind('jmessage.onReceiveMessage', function () {
        var msg = window.JMessage.message;
        console.log(msg.content.text);
        alert(msg.content.text);
    });
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
}])

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('RegisterCtrl', ['$scope', '$ionicLoading', '$location', function ($scope, $ionicLoading, $location) {
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

.controller('LoginCtrl', ['$scope', '$state', '$ionicLoading', '$rootScope', function ($scope, $state, $ionicLoading, $rootScope) {
    $scope.login = function (username, userpassword) {
        window.JMessage.login(username, userpassword, function () {
            $ionicLoading.show({
                template: '登录成功',
                noBackdrop: true,
                duration: 1000
            });
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
