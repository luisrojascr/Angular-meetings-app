angular.module('myApp')
    .controller('SuccessController', SuccessController);

    SuccessController.$inject = ['$scope'];

    function SuccessController($scope){
        $scope.message = "Welcome to my App";   
    }