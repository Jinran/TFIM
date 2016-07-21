angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$document', function ($scope, $document) {

    $scope.username = '';
    $scope.userpassword = '';
    
    $scope.sendSingleTextMessage = function (text) {
        window.JMessage.sendSingleTextMessage('jinran', text, function (response) {
            //alert('发送消息成功');
        }, function (errorStr) {
            alert('发送消息失败：' + errorStr);
        })
    };

    $scope.chatUserList = new Array();
    $scope.$on('chatUsers.update', function (event) {
        $scope.chatUserList = chat.chatUsers();
        console.log($scope.chatUserList);
        $scope.$apply();
    });
    $scope.doRefresh = function () {
        //取得会话列表
        $scope.chatList = Chat.update(function (response) {
            //console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });

        $scope.$broadcast('scroll.refreshComplete');
    };
}])

.controller('ChatsCtrl', ['$scope', '$document', '$ionicLoading', '$rootScope', 'Chat', function ($scope, $document, $ionicLoading, $rootScope, Chat) {
    $scope.chatList = new Array();
    $scope.$on('chats.update', function (event) {
        $scope.chatList = Chat.chats();
        console.log($scope.chatList);
        $scope.$apply();
    });
    $scope.doRefresh = function () {
        //取得会话列表
        $scope.chatList = Chat.updateChats(function (response) {
            //console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,  
                noBackdrop: true,
                duration: 1000
            });
        });

        $scope.$broadcast('scroll.refreshComplete');
    };
    
    $scope.remove = function (username) {
        window.JMessage.deleteSingleConversation(username, $rootScope.appKey, function () {
            //取得会话列表
            $scope.chatList = Chat.updateChats(function (response) {
                //console.log(response);
            }, function (errorStr) {
                $ionicLoading.show({
                    template: errorStr,
                    noBackdrop: true,
                    duration: 1000
                });
            });
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        })
    };

    //全局监听事件，监听广播获取的消息
    $document.bind('jmessage.onReceiveMessage', function () {
        //console.log(window.JMessage.message.content.text);
        //取得会话列表
        $scope.chatList = Chat.updateChats(function (response) {
            //console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });
    });
}])

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    //$scope.chat = Chats.get($stateParams.chatId);
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
            var userSession = new Object();
            userSession.username = username;
            $rootScope.userSession = userSession;
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
