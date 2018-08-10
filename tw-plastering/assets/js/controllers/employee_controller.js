mainApp.controller('Employee_controller', function ($scope, $rootScope, $http, $state, $filter, myService) {

    $scope.employees;
    $scope.new_employee_name;


    $scope.loadEmployees = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/loadEmployee'
        }).then(function (response) {
            if (response.date == "authenticate_error") {

            }
            $scope.employees = response.data;
            $rootScope.employees = $scope.employees;
        })
    }

    $scope.deleteEmployee = function (employee_id) {
        $http({
            method: 'POST',
            data: {
                'employee_id': employee_id
            },
            url: 'laravel/public/deleteEmployee'
        }).then(function (response) {
            $scope.loadEmployees();
        })
    }

    $scope.addEmployee = function () {
        if (!$scope.new_employee_name) {
            alert('please enter employee name');
            return;
        }
        $http({
            method: 'POST',
            data: {
                'employee_name': $scope.new_employee_name
            },
            url: 'laravel/public/addEmployee'
        }).then(function (response) {
            $scope.loadEmployees();
        });
    }

    $scope.delete_employee_by_index = function (index) {
        employee_id = $scope.employees[index].employee_id;
        $scope.deleteEmployee(employee_id);

    }


    $scope.edit_employee_name = function($event, index) {

        var target = $($event.target);
        var currentText = target.html();
        var inputTag = $("<input type='text' class='edit_input' value='" + target.html() + "'>");
        inputTag.keypress(function (e) {
            if (e.keyCode == 13) {
                if (inputTag.val() != '') {
                    target.html(inputTag.val()).show();
                } else {
                    target.html(currentText).show();
                }
                inputTag.remove();

                edit_employee_name_submit(target.html(), index);
            }
        })
        target.parent().append(inputTag);
        target.hide();
        /* setTimeout(function() {
         $(window).click(function(event) {
         if (!$(event.target).is('input')) {
         if (inputTag.val() != '') {
         target.html(inputTag.val()).show();
         } else {
         target.html(currentText).show();
         }
         inputTag.remove();
         }
         })
         })*/

    }

    function edit_employee_name_submit(new_name, index) {
        $http({
            method: 'POST',
            url: 'laravel/public/editEmployee',
            data: {
                'employee_id': $scope.employees[index].employee_id,
                'employee_name': new_name,
            }
        }).then(function (response) {
            if(response.data == 'success') {
                $scope.employees[index].employee_name = new_name;
                $rootScope.employees = $scope.employees;
            }

        })
    }


    $scope.loadEmployees();

})