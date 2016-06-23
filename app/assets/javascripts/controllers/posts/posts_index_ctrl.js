// ----------------------------------------
// PostsIndexCtrl
// ----------------------------------------

Crudangles.controller('PostsIndexCtrl',
  ['$controller', '$scope', '$state',
  function($controller, $scope, $state) {
    
    $controller('PostsCtrl', { $scope: $scope });


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

