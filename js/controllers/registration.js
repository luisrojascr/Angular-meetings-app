angular.module('myApp')
    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', 'Authentication'];

    function RegistrationController($scope, Authentication){
        
        $scope.register = function(){
           Authentication.register($scope.user);
        }   
    }