"use strict";

const app = angular.module('app', []);

app.controller('main', ["$scope", "$http", ($scope, $http) => {
  $scope.nav = (e) => {
    const className = e.target.className;
    if(className.includes("homepageNav")){
      $scope.move(0);
    } else if (className.includes("aboutpageNav")) {
      $scope.move(-100);
    } else if (className.includes("productpageNav")) {
      $scope.move(-200);
    }
  }

  $scope.move = (position) => {
    $(".container").css("top", position+"vh");
  }

  $scope.logout = () => {
    const url = "/logout";
    //send the request
    $http({
      url: url,
      method: 'GET',
    }).then(function successCallback(response) {
        window.location.href = "/logout";
      }, function errorCallback(response) {
        console.log(response)
      });

  }

}]);
