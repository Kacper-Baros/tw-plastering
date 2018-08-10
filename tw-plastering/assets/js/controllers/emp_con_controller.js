mainApp.controller('Emp_con_controller', function ($scope, $rootScope, $state, $filter, myService) {

    $scope.employees = myService.loadEmployees('laravel/public/loadEmployee');

})