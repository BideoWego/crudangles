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

  }]);

