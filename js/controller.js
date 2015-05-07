var app = angular.module('final', ['ngRoute', 'ngResource']);



app.config(function($routeProvider,$locationProvider){


         $routeProvider.when('/',{templateUrl: 'partials/home.html', controller:'homeController'}).when('/login',{templateUrl:'partials/login.html', controller:'loginController'}).when('/register',{templateUrl:'partials/registration.html', controller:'registrationController'});

});



app.controller('registrationController',['$scope', '$resource','$window',function($scope,$resource, $window){
    var registerUser=$resource('/api/registerUser');
    $scope.submit=function(){
        //alert($scope.fName);
        var RNU=new registerUser();
        RNU.fname=$scope.fName;
        RNU.lname=$scope.lName;
        RNU.email=$scope.email;
        RNU.password=$scope.password;
        RNU.$save(function(){
            alert('You are registered');
            $window.location.assign('/');
        })

    }

}]);
app.controller('loginController', ['$scope', '$resource','$window',function($scope,$resource, $window){
    $scope.submit=function(){
        //alert($scope.name+$scope.password);
        //var flag=false;
        var login=$resource('/api/login');
        loginUser=new login();
        loginUser.username=$scope.name;
        loginUser.password=$scope.password;
        loginUser.$save(function(flag){
                if(flag.id==='yes'){
                    //alert('bal');
                    //$location.path('/').replace();
                    $window.location.assign('/');
                }
        });
    };
}]);

app.controller("homeController", ['$scope', '$resource',function($scope,$resource){
    var saveNewQuestion=$resource('/api/saveNewQuestion');
    var saveNewAnswer=$resource('/api/saveNewAnswer');
    saveNewQuestion.query(function(result){
                $scope.QAnswers=result;
            });
        $('#newQuestion').hide();
        $scope.show=function($scope){
           // alert("ok");
            //Campuses.push({});
              $('#newQuestion').show();
        };
        $scope.postQ=function(question){
            $('#newQuestion').hide(); 
           // alert(question);
            //$scope.QAnswers.unshift({id:$scope.QAnswers.length, Question:question, Answers:[]});
            var date=new Date();
            var SNQ=new saveNewQuestion();
            SNQ.date=date.getTime();
            SNQ.Question=question;
            SNQ.Answers=[];
            SNQ.$save(function(result){
                $scope.QAnswers.unshift(result); 
            });

        };
        $scope.submitAnswer=function(answerText,question, answers){
            //alert(index);
          // $('#'+index+' li:eq(0)').after('<li class="list-group-item">'+answerText+'</li>');
            //$scope.QAnswers[index].Answers.unshift({answerID:$scope.QAnswers[index].Answers.length, answer:answerText});
            var SNA=new saveNewAnswer();
            SNA.Question=question;
            SNA.answer=answerText;
            SNA.answers=[];
            SNA.answers=answers;
            SNA.answers.push({Answer:answerText}); 
            SNA.$save();
           // alert(SNA.answers);
            
            
        };
    }]);