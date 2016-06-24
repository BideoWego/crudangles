// ----------------------------------------
// PostsCtrl
// ----------------------------------------

Crudangles.controller('PostsCtrl',
  ['$scope', 'posts',
  function($scope, posts) {

    $scope.posts = posts;

  }]);

