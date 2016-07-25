angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$document', 'Chat', function ($scope, $document, Chat) {

    

    $scope.chatUserList = Chat.chatUsers();
    console.log($scope.chatUserList);
    $scope.$on('chatUsers.update', function (event) {
        $scope.chatUserList = Chat.chatUsers();
        //console.log($scope.chatUserList);
        $scope.$apply();
    });
    $scope.doRefresh = function () {
        //取得会话列表
        $scope.chatList = Chat.chatUsers();

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
            console.log(response);
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,  
                noBackdrop: true,
                duration: 1000
            });
        });

        $scope.$broadcast('scroll.refreshComplete');
    };
    //首次进入刷新，获取历史消息
    $scope.doRefresh();
    //进入会话
    $scope.enterChat = function () {

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

    .controller('singleContactCtrl', ['$scope', '$rootScope', '$stateParams', '$document', '$ionicLoading', function ($scope, $rootScope, $stateParams, $document, $ionicLoading) {
        $scope.username = $stateParams.username;
        $scope.targetid = $stateParams.targetid;

        $scope.singleChats = new Array();
        window.JMessage.getHistoryMessages('single', $scope.targetid, null, 0, 50, function (response) {
            $scope.singleChats = angular.fromJson(response);
            console.log($scope.singleChats);
            //$rootScope.$broadcast('singleContact.update');
        }, function (errorStr) {
            $ionicLoading.show({
                template: errorStr,
                noBackdrop: true,
                duration: 1000
            });
        });

        $document.bind('jmessage.onReceiveMessage', function(){
            alert(window.JMessage.message.content.text);
            //$scope.singleChats.push(window.JMessage.message);
        });

        /*$scope.$on('singleContact.update', function (event) {

        });*/

        $scope.sendSingleTextMessage = function (username, text) {
                window.JMessage.sendSingleTextMessage(username, text, null, function (response) {
                    //alert('发送消息成功');
                }, function (errorStr) {
                    alert('发送消息失败：' + errorStr);
                })
            };
    }])

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    //$scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', ['$scope', function ($scope) {

    $scope.username = '';
    $scope.text = '';

    $scope.sendSingleTextMessage = function (username, text) {
        window.JMessage.sendSingleTextMessage(username, text, null, function (response) {
            //alert('发送消息成功');
        }, function (errorStr) {
            alert('发送消息失败：' + errorStr);
        })
    };
}])
    .controller('contactsDetail', ['$scope', function ($scope) {

    }])

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
