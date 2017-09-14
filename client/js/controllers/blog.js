

angular.module('app').controller('AllBlogsController', ['$scope', 'Blog', function($scope,
      Blog) {
    $scope.blogs = Blog.find({
      filter: {
        include: [
          'blogger'
        ]
      }
    });
  }]).controller('AddBlogController', ['$scope', 'Blog',
      '$state', function($scope, Blog, $state) {
    $scope.action = 'Add';
   
    
    $scope.blog = {};
    $scope.isDisabled = false;


    $scope.submitForm = function() {
      Blog
        .create({
         
          content: $scope.blog.content
         
        })
        .$promise
        .then(function() {
          $state.go('all-blogs');
        });
    };
  }]).controller('DeleteBlogController', ['$scope', 'Blog', '$state',
      '$stateParams', function($scope, Blog, $state, $stateParams) {
    Blog
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-blogs');
      });
  }])
  .controller('EditBlogController', ['$scope', '$q', 'Blog',
      '$stateParams', '$state', function($scope, $q, Blog,
      $stateParams, $state) {
    $scope.action = 'Edit';
    
   
    $scope.blog = {};
    $scope.isDisabled = true;

    $q
      .all([
               Blog.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        
        $scope.blog = data[0];
       


    $scope.submitForm = function() {
     
      $scope.blog
        .$save()
        .then(function(blog) {
          $state.go('all-blogs');
        });
    };
  });
      }])
  .controller('MyBlogsController', ['$scope', 'Blog',
      function($scope, Blog) {
       
        $scope.$watch('currentUser.id', function(value) {
          if (!value) {
            return;
          }
          $scope.blogs = Blog.find({
            filter: {
              where: {
                publisherId: $scope.currentUser.id
              },
              include: [
                'blogger'
              ]
            }
          });
        });
  }]);
