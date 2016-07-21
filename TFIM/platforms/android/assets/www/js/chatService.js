/**
 * 用户会话列表service
 * 需要cordova-plugin-JMessage插件支持
 * Date 2016-07-21
 * @author Dav
 */
angular.module('chatService', [])

.service('Chat', ['$rootScope', function ($rootScope) {
    var chats = new Array();
    var chatUsers = new Array();
    var userInfo = new Array();

    return {
        chats: function () {
            return chats;
        },
        chatUsers: function () {
            return chatUsers
        },
        userInfo: function () {
            return userInfo
        },
        updateChats: function (successCallback, errorCallback) {
            var successCallback = successCallback || function () { };
            var errorCallback = errorCallback || function () { };
            //取得当前用户所有会话列表
            window.JMessage.getConversationList(function (response) {
                chats = angular.fromJson(response);
                $rootScope.$broadcast('chats.update');
                successCallback(chats);
            }, function (errorStr) {
                errorCallback(errorStr);
            });
            return chats;
        },
        updateChatUsers: function (successCallback, errorCallback) {
            var successCallback = successCallback || function () { };
            var errorCallback = errorCallback || function () { };
            //获得用户通讯录列表
            window.JMessage.getUserInfo($rootScope.userSession.username, $rootScope.appKey, function (response) {
                chatUsers = angular.fromJson(response);
                $rootScope.$broadcast('chatUsers.update');
                successCallback(chatUsers);
            }, function (errorStr) {
                errorCallback(errorStr);
            })
        },
        remove: function () { },
        top: function () { },
        get: function () { }
    }
}])