// ----------------------------------------
// App
// ----------------------------------------

var Crudangles = angular.module('Crudangles', ['templates'])

.factory('PostService',
  ['$http',
  function($http) {

    var _posts = [];


    var PostService = {
      posts: _posts
    };


    PostService.all = function() {
      return $http({
        url: 'api/v1/posts.json',
        method: 'GET'
      })
        .then(function(response) {
          for (var i = 0; i < response.data.length; i++) {
            var post = response.data[i];
            _posts.push(post);
          }
          console.log(response);
        }, function(response) {
          console.error(response);
        });
    };


    return PostService;

  }])

.controller('PostsCtrl',
  ['$scope', 'PostService',
  function($scope, PostService) {

    $scope.posts = PostService.posts;
    PostService.all();

  }]);




