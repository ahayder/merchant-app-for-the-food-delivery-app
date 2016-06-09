angular.module('starter.factories', [])

.factory('MerchantFactory', ['$http', function ($http) {
	
	var driver = [];
	return {
		login: function(info){
			return $http.get("https://savor365.com/api/resLogin?resUserId="+info.resUserId+"&password="+info.password);
		},
		getOrders: function(resId) {
			return $http.get("https://savor365.com/api/findOrders?resId="+resId);
		},
		getOrderDetails: function(orderNum){
			return $http.get("https://savor365.com/api/findOrderDetails?orderNum="+ orderNum);
		},
		getDeliveryDetails: function(resId){
			return $http.get("https://savor365.com/api/findDeliveryInfo?resId=" + resId);
		},
		getBankInfo: function(resId){
			return $http.get("https://savor365.com/api/bankInfo?resId=" + resId);
		},
		getDrivers: function(resId){
			return $http.get("https://savor365.com/api/driverInfos?resId=" + resId);
		},
		saveDriverForNextState: function(driverInfo){
			driver = driverInfo;
		},
		getDriverInfo: function(){
			return driver;
		},
		addNewDriver: function(driverInfo){
			console.log(driverInfo)
			return $http({

                method: 'POST',
                url: 'https://savor365.com/api/addNewDriver',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: driverInfo

            });
		},
		getResInfo: function(resId){
			return $http.get("https://savor365.com/api/resInfo?resId="+resId);
		},
		orderProcessing: function(orderNum){
			return $http.get("https://savor365.com/api/orderConfirmByMerchant?orderNum="+orderNum);
		},
		addCounterUser: function(user){
			return $http.get("https://savor365.com/api/saveCounterUser?resId="+localStorage.getItem('resId')+"&username="+user.username+"&password="+user.password);
		},
		getCounterUser: function(){
			return $http.get("https://savor365.com/api/getCounterUsers?resId="+localStorage.getItem('resId'));
		}

	};
}]);