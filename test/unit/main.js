'use strict';

describe('Main Controller', function(){
  var scope;

  beforeEach(module('movieStubApp'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define movie details', inject(function($controller) {

    $controller('movieStubController', {
      $scope: scope
    });
    
    expect(scope.headerSrc).toBe("template/header.html");
  }));
});
