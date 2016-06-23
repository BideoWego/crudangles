// ----------------------------------------
// CommentService
// ----------------------------------------

Crudangles.factory('CommentService',
  ['_', 'Restangular',
  function(_, Restangular) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    var _comments;


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var CommentService = {};


    CommentService.all = function() {
      return _comments ? _comments : CommentService.refreshAll();
    };


    CommentService.find = function(id) {
      id = parseInt(id);
      var result = _.find(_comments, function(comment) {
        if (comment.id === id) {
          return comment;
        }
      });
      return result ? result : CommentService.refreshOne(id);
    };


    CommentService.refreshOne = function(id) {
      var index = _.findIndex(_comments, function(comment) {
        return comment.id === id;
      });
      if (index >= 0) {
        return _comments[index];
      } else {
        return _comments[index] = Restangular.one('comments', id).get().$object;
      }
    };


    CommentService.refreshAll = function() {
      if (_comments) {
        _comments.splice(0);
        Restangular.all('comments').getList()
          .then(function(response) {
            for (var i = 0; i < response.length; i++) {
              _comments.push(response[i]);
            }
          });
      } else {
        _comments = Restangular.all('comments').getList().$object;
      }
      return _comments;
    };


    CommentService.create = function(params) {
      return Restangular.all('comments').post({
        comment: {
          author: params.author,
          body: params.body,
          post_id: params.postId
        }
      });
    };

    return CommentService;

  }]);




