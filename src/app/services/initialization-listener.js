module.exports =  function($rootScope) {
  $rootScope.app = {
    initialized: false
  };

  $rootScope.$on('$stateChangeSuccess', function() {
    $rootScope.app.initialized = true;
  });
};
