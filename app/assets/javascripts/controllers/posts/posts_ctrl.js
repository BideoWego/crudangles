// ----------------------------------------
// PostsCtrl
// ----------------------------------------

Crudangles.controller('PostsCtrl',
  ['$scope', '$state', 'PostService',
  function($scope, $state, PostService) {
    
    $scope.posts = PostService.all();

  }]);

