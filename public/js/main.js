"use strict";

const app = angular.module('app', []);

app.controller('main', ["$scope", "page", ($scope, page) => {
  $scope.introduction = "Welcome to the APP!";
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

  $(".login").click((e) => { page.navigate(e) });
}]);

app.service("page", function ($http) {

  this.navigate = function () {
    //cache the values of username and password
    const username = $(".username").val();
    const password = $(".password").val();
    //clear the fields
    $(".username").val("").blur();
    $(".password").val("").blur();
    //init a JSON string to send in a http post request and cache url
    const post = JSON.stringify({ username: username, password: password });
    const url = "http://localhost:3000/login";

    //send the request
    $http({
      url: url,
      dataType: 'json',
      method: 'POST',
      data: post,
      headers: { "Content-Type": "application/json" },
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        window.location.href = "/homepage";
        console.log("im in");
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  };

});
