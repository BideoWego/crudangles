// ----------------------------------------
// PostService
// ----------------------------------------

Crudangles.factory('PostService',
  ['_', 'Restangular', 'CommentService',
  function(_, Restangular, CommentService) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _posts;


    var _createPost = function(params) {
      return Restangular.all('posts').post({
        post: {
          title: params.title,
          author: params.author,
          body: params.body
        }
      })
        .then(function(response) {
          console.log(response);
          _posts.unshift(response);
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


    Restangular.extendCollection('posts', function(collection) {

      collection.create = _createPost;
      collection.find = _findPost;

      return collection;
    });


    Restangular.extendModel('posts', function(model) {

      model.createComment = function(params) {
        params.postId = model.id;
        console.log(params);
        return CommentService.create(params)
          .then(function(response) {
            console.log(response);
            model.comments.push(response);
            return response;
          });
      };

      return model;
    });


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var PostService = {};


    PostService.all = function() {
      return _posts ? _posts : PostService.refreshAll();
    };


    PostService.find = function(id) {
      return _findPost(id);
    };


    PostService.refreshOne = function(id) {
      var index = _.findIndex(_posts, function(post) {
        return post.id === id;
      });
      if (index >= 0) {
        return _posts[index];
      } else {
        return _posts[index] = Restangular.one('posts', id).get().$object;
      }
    };


    PostService.refreshAll = function() {
      if (_posts) {
        _posts.splice(0);
        Restangular.all('posts').getList()
          .then(function(response) {
            for (var i = 0; i < response.length; i++) {
              _posts.push(response[i]);
            }
          });
      } else {
        _posts = Restangular.all('posts').getList().$object;
      }
      return _posts;
    };


    PostService.create = function(params) {
      return _createPost(params);
    };

    return PostService;

  }]);




