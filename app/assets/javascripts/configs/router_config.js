// ----------------------------------------
// Router
// ----------------------------------------

Crudangles.config(['$urlRouterProvider', '$stateProvider',
  function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/posts');

    $stateProvider
      .state('posts', {
        abstract: true,
        url: '/posts',
        template: '<div ui-view></div>',
        controller: 'PostsCtrl'
      })
      .state('posts.index', {
        url: '',
        templateUrl: '/templates/posts/index.html',
        controller: 'PostsIndexCtrl'
      })
      .state('posts.show', {
        url: '/:id',
        templateUrl: '/templates/posts/show.html',
        controller: 'PostsShowCtrl'
      });

  }]);

