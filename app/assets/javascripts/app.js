// ----------------------------------------
// App
// ----------------------------------------

var Crudangles = angular.module('Crudangles', ['ui.router', 'restangular'])

.factory('_', ['$window', function($window) {
  return $window._;
}])

// ----------------------------------------
// Restangular
// ----------------------------------------

.config(['RestangularProvider', function(RestangularProvider) {

  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

}])

// ----------------------------------------
// Router
// ----------------------------------------

.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/posts');

    $stateProvider
      .state('posts', {
        abstract: true,
        url: '/posts',
        template: '<div ui-view></div>',
        controller: 'PostsCtrl',
        resolve: {
          posts: ['Restangular', function(Restangular) {
            console.log('Getting posts...');
            return Restangular.all('posts').getList();
          }]
        }
      })
      .state('posts.index', {
        url: '',
        templateUrl: '/templates/posts/index.html',
        controller: 'PostsCtrl'
      })
      .state('posts.show', {
        url: '/:id',
        templateUrl: '/templates/posts/show.html',
        controller: 'PostsCtrl'
      });

  }])

// ----------------------------------------
// PostCtrl
// ----------------------------------------

.controller('PostsCtrl',
  ['$scope', '_', 'posts', '$state',
  function($scope, _, posts, $state) {

    var o = {
      "posts.index": function() {
        $scope.posts = posts;
      },
      "posts.show": function() {
        $scope.post = _.find(posts, function(post) {
          return post.id === ~~$state.params.id;
        });
      }
    }[$state.current.name]();

  }]);




