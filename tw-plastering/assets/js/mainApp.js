var mainApp = angular.module('mainApp', ['ui.router', 'oi.select', 'ngAutocomplete', 'ui.bootstrap']);

mainApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'assets/views/dashboard.html',
            controller: 'Dashboard_controller'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('jobs', {
            url: '/jobs',
            templateUrl: 'assets/views/jobs.html',
            controller: 'Jobs_controller'
        })
        .state('employee', {
            url: '/employee',
            templateUrl: 'assets/views/employee-contractors.html',
            controller: 'Emp_con_controller'
        })
        .state('calender', {
            url: '/calender',
            templateUrl: 'assets/views/calender.html',
            controller: 'Calender_controller'
        })

});



