// ----------------------------------------
// RecentCommentsCtrl
// ----------------------------------------

Crudangles.controller('RecentCommentsCtrl',
  ['_', '$rootScope', '$scope', 'recentComments',
  function(_, $rootScope, $scope, recentComments) {

    $scope.$on('comments.created', function() {
      recentComments.refreshAll();
    });


    $scope.$on('comments.updated', function() {
      recentComments.refreshAll();
    });


    $scope.recentComments = recentComments;


    $scope.upvoteComment = function(id) {
      var comment = _.find(recentComments, function(comment) {
        return comment.id === id;
      });

      comment.upvote()
        .then(function() {
          $rootScope.$broadcast('comments.updated');
        });
    };


    $scope.downvoteComment = function(id) {
      var comment = _.find(recentComments, function(comment) {
        return comment.id === id;
      });

      comment.downvote()
        .then(function() {
          $rootScope.$broadcast('comments.updated');
        });
    };

  }]);




