angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('add-blog', {
        url: '/add-blog',
        templateUrl: 'views/blog-form.html',
        controller: 'AddBlogController',
        authenticate: true
      })
      .state('all-blogs', {
        url: '/all-blogs',
        templateUrl: 'views/all-blogs.html',
        controller: 'AllBlogsController'
      })
      .state('edit-blog', {
        url: '/edit-blog/:id',
        templateUrl: 'views/blog-form.html',
        controller: 'EditBlogController',
        authenticate: true
      })
      .state('delete-blog', {
        url: '/delete-blog/:id',
        controller: 'DeleteBlogController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-blogs', {
        url: '/my-blogs',
        templateUrl: 'views/my-blogs.html',
        controller: 'MyBlogsController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('all-blogs');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    
      if (toState.authenticate && !LoopBackAuth.accessTokenId) {
        event.preventDefault(); 

        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };

        $state.go('forbidden');
      }
    });

   
    if (LoopBackAuth.accessTokenId && !$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);
