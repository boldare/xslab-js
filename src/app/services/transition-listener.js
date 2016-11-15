module.exports =  function($rootScope, $mdToast, $state) {
  $rootScope.$on('$stateChangeError', function(e, toState, toParams, formState, formParams, errorObj) {
    if (!errorObj.error) {
      return;
    }

    $mdToast.show(
      $mdToast
        .simple()
        .highlightClass('md-accent')
        .textContent(errorObj.error)
        .hideDelay(3000)
    );

    if ('gameList' !== formState.name) {
      $state.go('gameList');
    }
  });
};
