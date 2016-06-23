// ----------------------------------------
// PostsShowCtrl
// ----------------------------------------

Crudangles.controller('PostsShowCtrl',
  ['$controller', '$scope', '$state', 'PostService',
  function($controller, $scope, $state, PostService) {
    
    $controller('PostsCtrl', { $scope: $scope });


    $scope.post = PostService.find($state.params.id);

    console.log($scope);
    console.log($scope.posts);
    console.log($scope.post);


    $scope.createComment = function() {
      $scope.post.createComment($scope.commentParams)
        .then(function(response) {
          console.log(response);
          $scope.commentParams = {};
        }, function(response) {
          console.error(response);
        });
    };

  }]);



