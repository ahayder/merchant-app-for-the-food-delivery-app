// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl',
      cache: false
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.drivers', {
      url: '/drivers',
      views: {
        'menuContent': {
          templateUrl: 'templates/driver/drivers.html',
          controller: 'DriversCtrl'
        }
      }
    })

    .state('app.driver', {
      url: '/driver',
      views: {
        'menuContent': {
          templateUrl: 'templates/driver/driver.html',
          controller: 'DriverCtrl'
        }
      }
    })

    .state('app.counter-users', {
      url: '/counter-users',
      views: {
        'menuContent': {
          templateUrl: 'templates/counterUser/counter-users.html',
          controller: 'CounterUsersCtrl'
        }
      }
    })

    .state('app.delivery-info', {
      url: '/delivery-info',
      views: {
        'menuContent': {
          templateUrl: 'templates/delivery-info.html',
          controller: 'DeliveryInfoCtrl'
        }
      }
    })

    .state('app.payment-info', {
      url: '/payment-info',
      views: {
        'menuContent': {
          templateUrl: 'templates/payment-info.html',
          controller: 'PaymentInfoCtrl'
        }
      }
    })

    .state('app.change-password', {
      url: '/change-password',
      views: {
        'menuContent': {
          templateUrl: 'templates/change-password.html'
        }
      }
    })

    .state('app.tabs', {
      url: '/tabs',
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/tabs.html'
        }
      }
    })
      
    .state('app.tabs.orders', {
      url: "/orders",
      views: {
        'orders-tab': {
          templateUrl: "templates/tab-orders.html",
          controller: 'OrdersTabCtrl'
        }
      }
    })

    .state('app.tabs.order-detail', {
      url: "/orders-detail/:orderNum/:deliveryStatus",
      views: {
        'orders-tab': {
          templateUrl: "templates/order-details.html",
          controller: 'OrdersDetailsCtrl'
        }
      }
    })

    // .state('app.tabs.facts', {
    //   url: "/facts",
    //   views: {
    //     'home-tab': {
    //       templateUrl: "templates/tab-facts.html"
    //     }
    //   }
    // })

    // .state('app.tabs.facts2', {
    //   url: "/facts2",
    //   views: {
    //     'home-tab': {
    //       templateUrl: "templates/tab-facts2.html"
    //     }
    //   }
    // })

    .state('app.tabs.accounts', {
      url: "/about",
      views: {
        'accounts-tab': {
          templateUrl: "templates/tab-accounts.html"
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tabs/orders');
});
