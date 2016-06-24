// ----------------------------------------
// PostService
// ----------------------------------------

Crudangles.factory('PostService',
  ['_', 'Restangular', 'CommentService',
  function(_, Restangular, CommentService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    Restangular.extendCollection('posts', function(collection) {

      collection.all = _all;
      collection.find = _find;
      collection.refreshOne = _refreshOne;
      collection.refreshAll = _refreshAll;
      collection.create = _create;

      return collection;
    });


    Restangular.extendModel('posts', function(model) {

      model.createComment = function(params) {
        params.postId = model.id;
        return CommentService.create(params)
          .then(function(response) {
            model.comments.push(response);
            return response;
          });
      };

      return model;
    });


    var _posts;


    var _restangularizePostComments = function(post) {
      post.comments = Restangular
          .restangularizeCollection(post, post.comments, 'comments');
    };


    var _restangularizePostsComments = function(posts) {
      _.each(posts, function(post) {
        _restangularizePostComments(post);
      });
    };


    var _createPost = function(params) {
      return Restangular.all('posts').post({
        post: {
          title: params.title,
          author: params.author,
          body: params.body
        }
      })
        .then(function(response) {
          _posts.then(function(posts) {
            posts.unshift(response);
          });
          return _posts;
        });
    };


    var _findPost = function(id) {
      id = parseInt(id);
      var result = _.find(_posts, function(post) {
        if (post.id === id) {
          return post;
        }
      });
      return result ? result : PostService.refreshOne(id);
    };


    var _refreshOne = function(id) {
      var index = _.findIndex(_posts, function(post) {
        return post.id === id;
      });

      if (index >= 0) {
        return _posts[index];
      } else {
        return _posts[index] = Restangular.one('posts', id).get()
          .then(function(post) {
            _restangularizePostComments(post);
            return post;
          });
      }
    };


    var _refreshAll = function() {
      if (_posts) {
        Restangular.all('posts').getList()
          .then(function(response) {
            _restangularizePostsComments(response);
            angular.copy(response, _posts);
          });
      } else {
        _posts = Restangular.all('posts').getList()
          .then(function(posts) {
            _restangularizePostsComments(posts);
            return posts;
          });
      }
      return _posts;
    };


    var _all = function() {
      return PostService.refreshAll();
    };


    var _find = function(id) {
      return _findPost(id);
    };


    var _create = function(params) {
      return _createPost(params);
    };

    // ----------------------------------------
    // Public
    // ----------------------------------------

    var PostService = {};


    PostService.all = _all;
    PostService.find = _find;
    PostService.refreshOne = _refreshOne;
    PostService.refreshAll = _refreshAll;
    PostService.create = _create;

    return PostService;

  }]);




