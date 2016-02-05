angular.module('myApp')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'Authentication'];

    function LoginController($scope, Authentication){
        
        $scope.login = function(){
            Authentication.login($scope.user);
        }
        
        $scope.logout = function(){
            Authentication.logout($scope.user);
        }
        
        
    }

    