// ----------------------------------------
// PostsShowCtrl
// ----------------------------------------

Crudangles.controller('PostsShowCtrl',
  ['_', '$rootScope', '$scope', '$state', 'post',
  function(_, $rootScope, $scope, $state, post) {

    $scope.$on('comments.updated', function() {
      $scope.posts.refreshOne(post.id)
        .then(function(response) {
          angular.copy(response.comments, $scope.post.comments);
        });
    });


    if (_.isEmpty(post)) {
      $state.go('posts.index');
    } else {
      $scope.post = post;


      $scope.createComment = function() {
        $scope.post.createComment($scope.commentParams)
          .then(function(response) {
            console.log(response);
            $rootScope.$broadcast('comments.created');
            $scope.commentParams = {};
          }, function(response) {
            console.error(response);
          });
      };


      $scope.upvoteComment = function(id) {
        var comment = _.find($scope.post.comments, function(comment) {
          return comment.id === id;
        });

        comment.upvote()
          .then(function() {
            $rootScope.$broadcast('comments.updated');
          });
      };


      $scope.downvoteComment = function(id) {
        var comment = _.find($scope.post.comments, function(comment) {
          return comment.id === id;
        });

        comment.downvote()
          .then(function() {
            $rootScope.$broadcast('comments.updated');
          });
      };
    }

  }]);



