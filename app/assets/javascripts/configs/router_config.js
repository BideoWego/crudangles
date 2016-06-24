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
        resolve: {
          "posts": ['PostService', function(PostService) {
            return PostService.all();
          }],
          "recentComments": ['CommentService', function(CommentService) {
            return CommentService.all();
          }]
        },
        views: {
          "": {
            template: '<div ui-view></div>',
            controller: 'PostsCtrl'
          },
          "recent-comments": {
            templateUrl: '/templates/comments/recent_comments.html',
            controller: 'RecentCommentsCtrl'
          }
        }
      })
      .state('posts.index', {
        url: '',
        views: {
          "": {
            templateUrl: '/templates/posts/index.html',
            controller: 'PostsIndexCtrl'
          }
        }
      })
      .state('posts.show', {
        url: '/:id',
        views: {
          "": {
            templateUrl: '/templates/posts/show.html',
            controller: 'PostsShowCtrl',
            resolve: {
              "post": ['posts', '$stateParams', 'PostService', function(posts, $stateParams, PostService) {
                return PostService.find($stateParams.id);
              }]
            }
          }
        }
      });

  }]);


Crudangles.run(['$rootScope', function($rootScope) {
  $rootScope.$on("$stateChangeError", console.error.bind(console));
}]);



