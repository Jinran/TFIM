angular.module('tf.util.ui-router', [])

.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })
    // Each tab has its own nav history stack:
    //消息选项卡
    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'chatsCtrl'
            }
        }
    })
    //通讯录选项卡
    .state('tab.contacts', {
        url: '/contacts',
        views: {
            'tab-contacts': {
                templateUrl: 'templates/tab-contacts.html',
                controller: 'contactsCtrl'
            }
        }
    })
    //用户选项卡
    .state('tab.me', {
        url: '/me',
        views: {
            'tab-me': {
                templateUrl: 'templates/tab-me.html',
                controller: 'meCtrl'
            }
        }
    })
    //测试选项卡
    .state('tab.test', {
        url: '/test',
        views: {
            'tab-test': {
                templateUrl: 'templates/tab-test.html',
                controller: 'testCtrl'
            }
        }
    })
    //单聊页面模板，传值：username用户昵称，targetid用户名称
    .state('singleContact', {
        url: '/singleContact?username&targetid',
        templateUrl: 'templates/single-contact.html',
        controller: 'singleContactCtrl',
        cache: false,
    })
    //通讯录用户详情页面模板，传值：username用户昵称，targetid用户名称
    .state('contactDetail', {
        url: '/contactDetail?username&targetid',
        templateUrl: 'templates/contact-detail.html',
        controller: 'contactDetailCtrl',
        cache: false,
    })
    //用户登录页面模板
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    //用户注册页面模板
    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('login');
});