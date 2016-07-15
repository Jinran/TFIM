angular.module('chatService', [])
//JMessage插件封装service
.service('chat', function () {
    var appkey = '2e675ac288e30e8109bda11e';

    //测试service
    this.testFun = function () {
        return "testFun";
    };

    //JM注册
    this.register = function (username, password, successCallback, errorCallback) {
        window.JMessage.register(username, password, successCallback, errorCallback);
    };

    //JM登录
    this.login = function (username, password, successCallback, errorCallback) {
        window.JMessage.login(username, password, successCallback, errorCallback);
    };

    //JM登出
    this.logout = function () {
        window.JMessage.logout(successCallback, errorCallback)
    };

    //JM获取用户信息
    this.getUserInfo = function (username, successCallback, errorCallback) {
        window.JMessage.getUserInfo(username, appkey, successCallback, errorCallback)
    };

    //JM发送一条单聊文本消息
    this.sendSingleTextMessage = function (username, text, successCallback, errorCallback) {
        window.JMessage.sendSingleTextMessage(username, text, appkey, successCallback, errorCallback);
    };
})