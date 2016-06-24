// ----------------------------------------
// CommentService
// ----------------------------------------

Crudangles.factory('CommentService',
  ['_', 'Restangular',
  function(_, Restangular) {

    // ----------------------------------------
    // Private
    // ----------------------------------------

    Restangular.extendCollection('comments', function(collection) {

      collection.all = _all;
      collection.find = _findComment;
      collection.refreshOne = _refreshOne;
      collection.refreshAll = _refreshAll;
      collection.create = _create;

      return collection;
    });


    Restangular.extendModel('comments', function(model) {

      model.upvote = function() {
        model.score += 1;
        return model.put();
      };

      model.downvote = function() {
        model.score -= 1;
        return model.put();
      };

      return model;
    });


    var _comments;


    var _all = function() {
      return _refreshAll();
    };


    var _createComment = function(params) {
      return Restangular.all('comments').post({
        comment: {
          author: params.author,
          body: params.body,
          post_id: params.postId
        }
      });
    };


    var _findComment = function(id) {
      id = parseInt(id);
      var result = _.find(_comments, function(comment) {
        if (comment.id === id) {
          return comment;
        }
      });
      return result ? result : CommentService.refreshOne(id);
    };


    var _refreshOne = function(id) {
      var index = _.findIndex(_comments, function(comment) {
        return comment.id === id;
      });
      if (index >= 0) {
        return _comments[index];
      } else {
        return _comments[index] = Restangular.one('comments', id).get();
      }
    };


    var _refreshAll = function() {
      if (_comments) {
        Restangular.all('comments').getList()
          .then(function(response) {
            console.log(_comments);
            angular.copy(response, _comments);
          });
      } else {
        _comments = Restangular.all('comments').getList().$object;
      }
      return _comments;
    };


    var _create = function(params) {
      return _createComment(params);
    };


    // ----------------------------------------
    // Public
    // ----------------------------------------

    var CommentService = {};

    CommentService.all = _all;
    CommentService.find = _findComment;
    CommentService.refreshOne = _refreshOne;
    CommentService.refreshAll = _refreshAll;
    CommentService.create = _create;

    return CommentService;

  }]);




