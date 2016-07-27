angular.module('contacts', [])

.controller('contactsCtrl', ['$scope', '$rootScope', '$document', 'Chat', function ($scope, $rootScope, $document, Chat) {

    $scope.exceptOwn = function (e) {
        return e.username != $rootScope.userSession.username;
    };

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
}]);