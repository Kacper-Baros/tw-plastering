mainApp.controller('Main_controller', function($scope, $rootScope, $http, $state, $filter, myService) {

    $rootScope.isNewJob = true;
    $('#head_job').on('click', function(e) {
        $rootScope.isNewJob = true;
    })

    $rootScope.constractor_id;
    $rootScope.constractor_name_calendar;
    $scope.login = function() {
        $('#modal-popup-2').show();
    }

    $('#modal-popup-2 button').click(function() {
        $http({
            method: 'POST',
            url: 'laravel/public/login',
            data: {
                'password': $scope.password
            }
        }).then(function (response) {
            $scope.data = response.data;
            if($scope.data.success == 'success') {
                $scope.uName = $scope.data.username;
                localStorage.setItem('username', $scope.uName);
                $('#username-container').html('<h2 style="width:100%; font-size:14px; color:#565758">Logged in: '+$scope.uName+'</h2>');
                $('#modal-popup-2').hide();
            } else {
                alert('Password incorrect');
                $scope.password = '';
            }
        })
    })

    $scope.login();

})
