// ----------------------------------------
// PostsIndexCtrl
// ----------------------------------------

Crudangles.controller('PostsIndexCtrl',
  ['$scope', '$state', 'posts',
  function($scope, $state, posts) {

    $scope.createPost = function() {
      $scope.posts.create($scope.postParams)
        .then(function(response) {
          console.log(response);
          $scope.postParams = {};
        }, function(response) {
          console.error(response);
        });
    };

  }]);

