var tinzaApp = angular.module('tinzaApp', ['ngRoute' , 'ngAnimate' , 'ngDialog']);

tinzaApp.config(['$routeProvider' , function($routeProvider){

$routeProvider
    .when('/home' , {
      templateUrl: 'index.html' ,
      controller: 'headerController'
    })
    .when('/singup' , {
    templateUrl: 'partials/singUp.html' ,
    controller: 'signupController'
    })
    .when('/singin' , {
    templateUrl: 'partials/singin.html' ,
    controller: 'headerController'
    })


}]);



tinzaApp.controller('headerController', function ($scope, ngDialog, $rootScope) {


    $rootScope.x = 0;

    $scope.openSignupDialog = function () {
        if ($rootScope.x === 0) {
            ngDialog.open({
                template: 'partials/signup.html', className: 'ngdialog-theme-default'
            });
            $rootScope.x = 1;

        } else {
            ngDialog.close({
                template: 'partials/signup.html', className: 'ngdialog-theme-default'
            });
            $rootScope.x = 0;
        }
    };

    $scope.openSigninDialog = function () {
        alert("Hello");
        if ($rootScope.x === 0) {
            ngDialog.open({
                template: 'partials/signin.html', className: 'ngdialog-theme-default'
            });
            $rootScope.x = 1;

        } else {
            ngDialog.close({
                template: 'partials/signin.html', className: 'ngdialog-theme-default'
            });
            $rootScope.x = 0;
        }
    };

});
tinzaApp.controller('signupController', function ($scope, ngDialog,$timeout, $rootScope) {
    $rootScope.x = 0;
    $scope.test = 0;
    $scope.level=0;
    $scope.password='';
    $scope.paswordstrenght=0;
    $scope.re = "^(?=.{6,20}$)(?=.*\d)(?=.*[a-zA-Z]).*$";
    $scope.dring = function(){
      $scope.test=1;
      $("#character").effect("shake");

    };
    $scope.next = function(steporder){

      if(steporder-1 == 5){
        if($scope.paswordstrenght<=1){
          $scope.test=1;
          $("#character").effect("shake");
          return;
        }
      }

      $scope.step = steporder;
      $scope.test=0;
    };

});

tinzaApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };

});





tinzaApp.directive('checkStrength', function () {

    return {
        replace: false,
        restrict: 'EACM',
        link: function (scope, iElement, iAttrs) {

            var strength = {
                colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
                mesureStrength: function (p) {

                    var _force = 0;
                    var _regex = /[$-/:-?{-~!"^_`\[\]]/g;

                    var _lowerLetters = /[a-z]+/.test(p);
                    var _upperLetters = /[A-Z]+/.test(p);
                    var _numbers = /[0-9]+/.test(p);
                    var _symbols = _regex.test(p);

                    var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                    var _passedMatches = $.grep(_flags, function (el) { return el === true; }).length;

                    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
                    _force += _passedMatches * 10;

                    // penality (short password)
                    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

                    // penality (poor variety of characters)
                    _force = (_passedMatches == 1) ? Math.min(_force, 10) : _force;
                    _force = (_passedMatches == 2) ? Math.min(_force, 20) : _force;
                    _force = (_passedMatches == 3) ? Math.min(_force, 40) : _force;

                    return _force;

                },
                getColor: function (s) {

                    var idx = 0;
                    if (s <= 10) { idx = 0; }
                    else if (s <= 20) { idx = 1; }
                    else if (s <= 30) { idx = 2; }
                    else if (s <= 40) { idx = 3; }
                    else { idx = 4; }

                    return { idx: idx + 1, col: this.colors[idx] };

                }
            };

            scope.$watch(iAttrs.checkStrength, function () {
                    var c = strength.getColor(strength.mesureStrength(scope.password));
                    scope.paswordstrenght=c.idx;
                    scope.test=0;
            });

        },
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>'
    };

});
