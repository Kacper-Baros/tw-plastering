mainApp.controller('Dashboard_controller', function ($scope, $rootScope, $http, $state, $filter, myService) {

    $rootScope.uName;

    $scope.go_emp_constractor = function () {

        window.location.href = "#!/employee";
        $('#head_emp_cont').parent().find('.selected').removeClass('selected');
        $('#head_emp_cont').addClass('selected');
    }

    $scope.go_jobs = function () {
        $rootScope.isNewJob = true;
        window.location.href = "#!/jobs";
        $('#head_job').parent().find('.selected').removeClass('selected');
        $('#head_job').addClass('selected');
    }

    function load_jobs() {
        $http({
            method: 'POST',
            url: 'laravel/public/loadAllJobs'
        }).then(function (response) {
            $scope.jobs = response.data;
            console.log($scope.jobs);
            $("#content-chat").height($("#content-jobs").height());
        })
    }

    $scope.go_edit_job = function (index) {
        $rootScope.editJobId = $scope.jobs[index].id;
        $rootScope.isNewJob = false;
        window.location.href = "#!/jobs";
        $('#head_job').parent().find('.selected').removeClass('selected');
        $('#head_job').addClass('selected');
    }
    load_jobs();

    $('#currentDate').on('change', function () {
        var today = new Date().toLocaleDateString();
        var selectedDate = new Date($scope.currentDate).toLocaleDateString()
        if (selectedDate !== today) {
            $scope.isDisabled = true;
        } else {
            $scope.isDisabled = false;
        }
        $scope.loadMessages($scope.currentDate)
    })

    $scope.loadMessages = function (date) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getUTCFullYear();
        console.log(date == 0);
        if (!date) {
            var actualDate = yyyy + '-' + mm + '-' + dd;
        } else {
            actualDate = date;
        }
        console.log(actualDate);
        $http({
            method: 'POST',
            url: 'laravel/public/getMessages/' + actualDate
        }).then(function (response) {
            $scope.messages = response.data;
        })
    }


    $scope.sendMessage = function () {
        if ($scope.newMessage !== "" || $scope.newMessage !== null) {
            $http({
                method: 'POST',
                data: {
                    'sent_by': localStorage.getItem('username'),
                    'msg': $scope.newMessage
                },
                url: 'laravel/public/sendMessage'
            }).then(function (response) {
                console.log(localStorage.getItem('username'));
                $scope.loadMessages();
                $scope.newMessage = "";
            });
        }else{
            alert('please write a message before sending');
        }
    }

    if (localStorage.getItem('username')) {
        $scope.loadMessages();
    }

    $('.datepicker').datepicker({
        format: 'DD, dd MM yyyy',
        endDate: 'tomorrow',
    }).datepicker("setDate", new Date());

    $scope.deleteMessage = function (message_id) {
        $http({
            method: 'POST',
            data: {
                'message_id': message_id
            },
            url: 'laravel/public/deleteMessage'
        }).then(function (response) {
            $scope.loadMessages($scope.currentDate);
        })
    }
    
    $('#spenthours').change(function(){

    });
    $scope.savehour = function (){
    	alert($('#spenthours').val());
    }
})
