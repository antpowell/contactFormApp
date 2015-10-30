angular.module('formApp', [])
    .controller("appController", ['$scope', '$http', function ($scope, $http) {
        console.log("hello World from controller");

        var refresh = function(){
        //=============================Get data from server=============================
            $http.get('/contactList').success(function(response) {
                console.log("I got the data I requested");
                $scope.contactList = response;
                $scope.contact = "";
            });
        };

        refresh();

        $scope.addContact = function(){
            if($scope.contact!= ""){
                console.log($scope.contact);
                $http.post('/contactList', $scope.contact).success(function(response){
                    console.log(response);
                    refresh();
                });
                console.log("Contact is not null");
            }else{
                console.log("------->There is no value for contact!<-------");
                console.log("------->There is no value for contact!<-------");
            }


        };

        $scope.removeContact = function(id){
            console.log("Contact's id to be removed: "+ id);
            $http.delete('/contactList/' + id).success(function(response){
                console.log(response);
                refresh();
            });
        };

        $scope.editContact= function(id){
            $http.get('/contactList/' + id).success(function(response){
                console.log(response);
                $scope.contact = response;

            });
        };
        $scope.update=function(){
            $http.put("/contactList/"+$scope.contact._id, $scope.contact).success(function(response){
                console.log(response.name+ " file was updated!");
                refresh();
            });
        }

    }]);

