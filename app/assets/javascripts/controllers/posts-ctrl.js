// ----------------------------------------
// PostCtrl
// ----------------------------------------

Crudangles.controller('PostsCtrl',
  ['_', '$scope', '$state', 'Restangular', 'posts', 'ActionService',
  function(_, $scope, $state, Restangular, posts, ActionService) {

    var _createPost = function(post) {
      return Restangular.all('posts').post({
        post: {
          title: post.title,
          author: post.author,
          body: post.body
        }
      });
    };


    var _createComment = function(comment) {
      return Restangular.all('comments').post({
        comment: {
          author: comment.author,
          body: comment.body,
          post_id: comment.postId
        }
      });
    };


    ActionService.init($state).create({
      "posts": {

        "index": function() {
          $scope.posts = posts;
          $scope.createPost = function() {
            _createPost($scope.postParams)
              .then(function(response) {
                console.log(response);
                $scope.posts.unshift(response);
                $scope.postParams = {};
              }, function(response) {
                console.error(response);
              });
          };
        },


        "show": function(params) {
          $scope.post = _.find(posts, function(post) {
            return post.id === parseInt(params.id);
          });
          $scope.createComment = function() {
            $scope.commentParams.postId = $scope.post.id;
            _createComment($scope.commentParams)
              .then(function(response) {
                console.log(response);
                $scope.post.comments.push(response);
                $scope.commentParams = {};
              }, function(response) {
                console.error(response);
              });
          };
        }

      }
    });

  }]);

