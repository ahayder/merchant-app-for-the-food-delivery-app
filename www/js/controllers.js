angular.module('starter.controllers', ['starter.factories'])

.controller('AppCtrl', function($scope, $rootScope, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $rootScope.login = true; // acctually it means false incase of ng-hide

  var loggedIn = window.localStorage['loggedIn'];

  if (loggedIn === "true") {

      $rootScope.login = true; // for ng-hide
      $state.go("app.tabs.orders"); //app.tabs.search

  } else {

      window.localStorage['loggedIn'] = "false";

      $state.go("login");
      $scope.logoutMessage = false;
  }

  $scope.logout = function() {

      window.localStorage['loggedIn'] = "false";
      window.localStorage['loggedInUserInofos'] = "";

      $scope.logoutMessage = true;
      $rootScope.login = true;
      $state.go("login");

      console.log(window.localStorage['loggedIn']);


  }


})

// Login/Signup     
.controller('LoginCtrl', ['$scope', 'MerchantFactory', '$ionicPopup', '$state', '$rootScope', '$timeout',
    function($scope, MerchantFactory, $ionicPopup, $state, $rootScope, $timeout) {

        $scope.logoutMessage = false;
        $rootScope.login = false;

        $scope.login = function(user) {

          MerchantFactory.login(user).then(function(response) {



              var userInfo = response.data;



              if (userInfo.length == 0) {

                  $ionicPopup.alert({
                      title: 'Unsuccessful',
                      template: 'The id or password mismatched'
                  });

              } else {

                  $rootScope.login = false;
                  window.localStorage['loggedIn'] = "true";
                  localStorage.setItem('resId',userInfo[0].res_id);
                  console.log(localStorage.getItem('resId'));
                  $state.go("app.tabs.orders");

              }

          }, function(error) {

              $ionicPopup.alert({
                  title: 'Unsuccessful',
                  template: 'Opps! there was a problem ' + error.message
              });

          });
        }

    }
])


.controller('OrdersTabCtrl', function($scope, MerchantFactory) {
  
  //Gettting order infos
  MerchantFactory.getOrders(localStorage.getItem('resId')).then(function(response){
    $scope.ordersInfo = response.data;

    console.log($scope.ordersInfo);
  
  });


})

.controller('OrdersDetailsCtrl', function($scope, $stateParams, MerchantFactory, $ionicPopup, $cordovaToast, $ionicPopup) {
  
  //Gettting order infos
  MerchantFactory.getOrderDetails($stateParams.orderNum).then(function(response){
    $scope.ordersDetail = response.data[0];
    console.log($scope.ordersDetail);
  });

  if($stateParams.deliveryStatus === "Pending"){
    $scope.confirmation = false;
  }

  if($stateParams.deliveryStatus === "Processing"){
    $scope.confirmation = true;
  }


  // Order confirmation popup

  $scope.confirmOrderPopup = function() {
    $scope.data = {};

    // An elaborate, custom popup
    var confirmOrderPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.orderConfirmCode">',
      title: 'Confirm Order',
      subTitle: 'Enter 4 Digit Order Confirmation Code',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Done</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.orderConfirmCode) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {

              MerchantFactory.orderProcessing($stateParams.orderNum).then(function(respone){
                  
                  $cordovaToast.showLongBottom('This Order is confirmed').then(function(success) {
                
                    $scope.confirmation = true;
              
                
                  }, function (error) {
                    $scope.confirmation = false;
                  });

                },function(error){

                    // An alert dialog
                     $scope.showAlert = function() {
                       var alertPopup = $ionicPopup.alert({
                         title: 'Error',
                         template: 'Opps! Something went wrong try again please'
                       });

                       alertPopup.then(function(res) {
                         console.log('Thank you for not eating my delicious ice cream cone');
                       });
                     };

                     $scope.showAlert();

                });

              

              //return $scope.data.orderConfirmCode;
            }
          }
        }
      ]
    });

    confirmOrderPopup.then(function(res) {
      console.log('Tapped!', res);
    });

  };





})

.controller('DriversCtrl', ['$scope', 'MerchantFactory','$ionicModal', '$ionicPopup', '$state', function ($scope, MerchantFactory, $ionicModal, $ionicPopup, $state) {
  
  $scope.$on('$ionicView.afterEnter', function() {
    MerchantFactory.getDrivers(localStorage.getItem('resId')).then(function(response){
      $scope.drivers = response.data;
      console.log($scope.drivers);
    });
    console.log('AFTER ENTER FIRED');
  });

  

  $scope.saveForNextState = function(driverInfo){
    MerchantFactory.saveDriverForNextState(driverInfo);
  }

  $ionicModal.fromTemplateUrl('templates/driver/add-driver-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });
  // Order Modal
  $scope.addNewDriverModal = function() {
      $scope.modal.show();
  };
  // Order modal closing function

  $scope.closeModal = function() {
      
      MerchantFactory.getDrivers(localStorage.getItem('resId')).then(function(response){
        $scope.drivers = response.data;
      });
      $scope.modal.hide();

  };

  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });

  $scope.saveDriver = function(driver){

    driver.resId = localStorage.getItem('resId');
    console.log(driver);

    MerchantFactory.addNewDriver(driver).then(function(response){

      console.log(response.data)

      if(response.data == 1){

        $ionicPopup.alert({
                  title: 'Success',
                  template: 'New Driver Added Successfully'
              }).then(function(){

                $scope.closeModal();

              });
      }
      else{
        $ionicPopup.alert({
                  title: 'Error',
                  template: "Something went wrong, please try again"
              })
      }

    });
  }

}])


.controller('DriverCtrl', ['$scope','MerchantFactory', function ($scope, MerchantFactory) {
  
  $scope.driver = MerchantFactory.getDriverInfo();
  console.log($scope.driver);

}])

.controller('DeliveryInfoCtrl', ['$scope', 'MerchantFactory', function ($scope, MerchantFactory) {

  MerchantFactory.getDeliveryDetails(localStorage.getItem('resId')).then(function(response){
    $scope.deliveryInfo = response.data[0];
    console.log($scope.deliveryInfo);
  })

}])

.controller('PaymentInfoCtrl', ['$scope', 'MerchantFactory', function ($scope, MerchantFactory) {
  
  MerchantFactory.getBankInfo(localStorage.getItem('resId')).then(function(response){
    $scope.bankInfo = response.data[0];
    console.log($scope.bankInfo);
  });
}])

.controller('ProfileCtrl', ['$scope', 'MerchantFactory', function ($scope, MerchantFactory) {

  MerchantFactory.getResInfo(localStorage.getItem('resId')).then(function(response){
    
    $scope.resInfo = response.data[0];
    console.log($scope.resInfo);
  
  });
  
}])

.controller('CounterUsersCtrl', function ($scope, $ionicModal, MerchantFactory, $ionicPopup) {


  MerchantFactory.getCounterUser().then(function(response){
    $scope.cusers = response.data;
  });

  $ionicModal.fromTemplateUrl('templates/counterUser/add-counter-user.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.modal = modal;
  });
  // Order Modal
  $scope.addNewCounterUserModal = function() {
      $scope.modal.show();
  };
  // Order modal closing function

  $scope.closeModal = function() {
    MerchantFactory.getCounterUser().then(function(response){
      $scope.cusers = response.data;
    });
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
      $scope.modal.remove();
  });

  $scope.saveCounterUser = function(user){

    user.resId = localStorage.getItem('resId');



    MerchantFactory.addCounterUser(user).then(function(response){

      if(response.data == 1){

        $ionicPopup.alert({
                  title: 'Success',
                  template: 'New User Added Successfully'
              }).then(function(){
                user.username = "";
                user.password = "";
                $scope.closeModal();

              });
      }
      else{
        $ionicPopup.alert({
                  title: 'Error',
                  template: "Something went wrong, please try again"
              })
      }

    });
  }
  
});
