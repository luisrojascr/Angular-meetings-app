angular.module('myApp')
    .factory('Authentication', Authentication);

    Authentication.$inject = ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', 'FIREBASE_URL'];

    function Authentication($rootScope, $firebaseAuth, $location, $firebaseObject, FIREBASE_URL){
        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);
        
        auth.$onAuth(function(authUser){
           if(authUser){
               var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
               var userObj = $firebaseObject(userRef);
               $rootScope.currentUser = userObj;
           }else{
               $rootScope.currentUser = '';
           } 
        });
        
        var myObject = {
          login: function(user){
              auth.$authWithPassword({
                  email: user.email,
                  password: user.password
              }).then(function(regUser){
                  $location.path('/success');
              }).catch(function(error){
                  $rootScope.message = error.message;
              });
          },
            
          logout: function(){
              return auth.$unauth();
          },
            
          requireAuth: function(){
              return auth.$requireAuth();
          },
            
          register: function(user){
            auth.$createUser({
               email: user.email,
               password: user.password
            }).then(function(regUser){
                var regRef = new Firebase(FIREBASE_URL + 'users').child(regUser.uid).set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser: regUser.uid,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                });
                
                myObject.login(user);
                
            }).catch(function(error){
                $rootScope.message = error.message; 
            });
          }
        }; 
        
        return myObject;
    }