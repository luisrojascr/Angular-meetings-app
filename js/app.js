angular.module('myApp', ['ngRoute', 'firebase'])
    .constant('FIREBASE_URL', 'https://angreg91.firebaseio.com/')
    .run(['$rootScope', '$location', 
          function($rootScope, $location){
              $rootScope.$on('$routeChangeError', function(event, next, previous, error){
                  if(error='AUTH_REQUIRED'){
                      $rootScope.message = 'Sorry, you must log in to access that page';
                      $location.path('/login');
                  }
              })
          }
     ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }).
            when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegistrationController'
            }).
            when('/success', {
                templateUrl: 'views/success.html',
                controller: 'SuccessController',
                resolve: {
                    currentAuth: function(Authentication){
                        return Authentication.requireAuth();
                    }
                }
            }).
            otherwise({
                redirectTo: '/login'
            })
    }]);