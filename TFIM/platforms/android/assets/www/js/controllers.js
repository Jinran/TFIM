angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'chat', function ($scope, chat) {
    /*document.addEventListener('jmessage.onReceiveTextMessage', function () {
        var msg = window.JMessage.textMessage;
        alert('接收消息成功：' + msg);
    }, false);*/

    $scope.$on('jmessage.onReceiveTextMessage', function () {
        var msg = window.JMessage.textMessage;
        alert('接收消息成功：' + msg);
    });
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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
