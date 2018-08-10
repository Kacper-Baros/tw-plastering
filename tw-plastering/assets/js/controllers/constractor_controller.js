mainApp.controller('Constractor_controller', function ($scope, $rootScope, $http, $state, $filter, myService) {

    $scope.constractors;
    $scope.new_constractor_name;

    $scope.loadConstrators = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/loadConstractor'
        }).then(function (response) {
            $scope.constractors = response.data;
            $rootScope.constractors = response.data;

        })
    }

    $scope.deleteConstractor = function (Constractor_id) {
        $http({
            method: 'POST',
            data: {
                'constractor_id': Constractor_id
            },
            url: 'laravel/public/deleteConstractor'
        }).then(function (response) {
            $scope.loadConstrators();
        })
    }

    $scope.addConstractor = function () {
        if (!$scope.new_constractor_name) {
            alert('please enter constractor name');
            return;
        }
        $http({
            method: 'POST',
            data: {
                'constractor_name': $scope.new_constractor_name
            },
            url: 'laravel/public/addConstractor'
        }).then(function (response) {
            $scope.loadConstrators();
        });
    }

    $scope.delete_constractor_by_index = function (index) {
        constrator_id = $scope.constractors[index].constractor_id;
        $scope.deleteConstractor(constrator_id);
    }

    $scope.edit_constractor_name = function($event, index) {

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

                edit_constractor_name_submit(target.html(), index);
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

    function edit_constractor_name_submit(new_name, index) {
        $http({
            method: 'POST',
            url: 'laravel/public/editConstractor',
            data: {
                'constractor_id': $scope.constractors[index].constractor_id,
                'constractor_name': new_name,
            }
        }).then(function (response) {
            if(response.data == 'success') {
                $scope.constractors[index].constractor_name = new_name;
                $rootScope.constractors = $scope.constractors;
            }

        })
    }

    $scope.loadConstrators();

})
