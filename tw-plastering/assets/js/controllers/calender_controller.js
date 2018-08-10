mainApp.controller('Calender_controller', function ($scope, $rootScope, $http, $state, $filter, myService) {

    $scope.jobs;
    $scope.employees;
    $scope.randomColors = ['#09efc6', '#09ef1a', '#efec09', '#ef8609', '#ef6009', '#b609ef', '#ef0986', '#09efec', '#ecef09', '#09a6ef', '#076692', '#c0b507', '#c04807', '#6b07c0', '#72aeb5', '#69811e', '#8d2b23']
    $scope.check_all = true;

    $scope.jobbing_constractors;

    function init() {
    }

    $scope.loadAllJobs = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/loadAllJobs'
        }).then(function (response) {
            $scope.jobs = response.data;
            loadJobs2Calendar(response.data);
        })
    }

    $scope.hm = function () {
        $('#modal-delete').hide();
    }

    $scope.om = function () {
        $('#modal-delete').show();
    }

    function isShowJobByEmployee(job) {

        unCheckAllEmployee = true;
        $scope.employees.forEach(function (employee) {
            if (employee.checked) {
                unCheckAllEmployee = false;
            }
        })

        if (unCheckAllEmployee) {
            return true;
        }
        var return_val = false;
        job.employees.forEach(function (job_employee) {
            $scope.employees.forEach(function (employee) {
                if ((employee.checked == true) && (job_employee.employee_id == employee.employee_id)) {
                    return_val = true;
                }
            })
        });
        return return_val;
    }

    function isShowJobByAssigned(job) {
        if ($scope.check_completed_job !== true && job.job_type === 'Completed') {
            return false
        }
        if (($scope.check_assign_constractor == true) && (job.assign_constractor == 1)) {
            return true;
        } else if (($scope.check_assign_employee == true) && (job.assign_employee == 1)) {
            return isShowJobByEmployee(job);
        } else if ((!$scope.check_assign_constractor) && (!$scope.check_assign_employee)) {
            if (job.assign_employee == 1) {
                return isShowJobByEmployee(job);
            }
            return true;
        }
        return false;
    }

    function isShowJobByType(job) {
        return_val = false;
        if (($scope.check_all) && (job.job_type !== 'Completed')) return_val = true;

        if (($scope.check_completed_job == true) && (job.job_type == 'Completed')) {
            return_val = true;
        }
        if (($scope.check_current_job == true) && (job.job_type == 'New job')) {
            return_val = true;
        }
        if (($scope.check_quoted_job == true) && (job.job_type == 'Quoted')) {
            return_val = true;
        }

        if (return_val) {
            return isShowJobByAssigned(job);
        }
        return false;
    }

    function isShowJob(job) {

        if (isShowJobByType(job)) {
            return true;
        }
        return false;
    }

    $scope.filterJob = function () {
        var selectedjob = new Array();
        $scope.jobs.forEach(function (job) {
            if (isShowJob(job)) {
                selectedjob.push(job);
            }
        })

        $('#calendar').fullCalendar('removeEventSources');
        loadJobs2Calendar(selectedjob);

        $scope.assign = '';
    }

    $scope.changed_check_all = function () {

        $scope.filterJob();


    }


    $scope.loadEmployees = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/loadEmployee'
        }).then(function (response) {
            $scope.employees = response.data;
            $rootScope.employees = $scope.employees;
            // console.log($scope.employees);
            $scope.loadAllJobs()
        })
    }


    function randomColor(id) {
        rnd_color = $scope.randomColors[id % ($scope.randomColors.length)];
        return rnd_color;
    }

    function loadJobs2Calendar(jobs) {
        //  console.log(jobs);
        eventSources = new Array();
        jobs.forEach(function (job) {
            if (!$scope.check_completed_job) {
                if (job.job_type !== 'Completed') {
                    var newEvent = new Object();
                    newEvent.id = job.id;
                    newEvent.title = job.address;
                    newEvent.textColor = 'black';
                    newEvent.backgroundColor = job.color;
                    newEvent.start = new Date(job.start_date).toString();
                    newEvent.end = new Date(job.end_date).toString();
                    eventSources.push(newEvent);
                }
            }else{
                var newEvent = new Object();
                newEvent.id = job.id;
                newEvent.title = job.address;
                newEvent.textColor = 'black';
                newEvent.backgroundColor = job.color;
                newEvent.start = new Date(job.start_date).toString();
                newEvent.end = new Date(job.end_date).toString();
                eventSources.push(newEvent);
            }
        })
        $('#calendar').fullCalendar('addEventSource', eventSources);
    }

    function initCalendar() {
        $('#calendar').fullCalendar({
            customButtons: {
                myCustomButton: {
                    text: 'More',
                    click: function () {
                        alert('clicked the custom button!');
                    }
                }
            },

            header: {
                left: 'prev, next title',
                right: 'basicDay,basicWeek,month,FourDay,agendaCustom'
            },

            defaultView: 'month',

            views: {
                FourDay: {
                    type: 'basic',
                    duration: {days: 4},
                    buttonText: '4 Days'
                },
                agendaCustom: {
                    type: 'list',
                    duration: {days: 15},
                    buttonText: 'Agenda'
                },
                basicDay: {
                    buttonText: 'Day'
                },
                basicWeek: {
                    buttonText: 'Week'
                },
                month: {
                    buttonText: 'Month'
                }
            },
            stick: true,
            aspectRatio: 1.6,
            eventClick: function (calEvent, jsEvent, view) {

                /*alert('EventId: ' + calEvent.id);
                alert('Event: ' + calEvent.title);
                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                alert('View: ' + view.name);
                alert('JobAddress: ' + calEvent.title);
                // change the border color just for fun
                $(this).css('border-color', 'red');*/
                $scope.$apply(function () {
                    $scope.selected_job_id = calEvent.id;
                    $scope.start_date = calEvent.start.toString().substr(0, 10);
                    $scope.end_date = calEvent.end.toString().substr(0, 10);
                    $scope.street_address = calEvent.title;
                })

                loadCurrentEmployee(calEvent.id);
                loadCurrentConstructors(calEvent.id);

                $scope.jobs.forEach(function (job) {
                    if (job.id == $scope.selected_job_id) {
                        if (job.job_type == 'Completed') {

                            $('#popup_job #completed-button').hide();
                        } else {

                            $('#popup_job #completed-button').show();
                        }
                    }
                })


                $('#popup_job').show();

                $('.k-select').css('background-color', calEvent.backgroundColor);

            }
        });
    }

    $scope.edit_cons = function (index) {

        $rootScope.editJobId = $scope.selected_job_id;
        $rootScope.isNewJob = false;
        $scope.assign = '';
        $rootScope.constrator_id = $scope.jobbing_constractors[index].constractor_id;
        $rootScope.constractor_name_calendar = $scope.jobbing_constractors[index].constractor_name;
        window.location.href = "#!/jobs";

    }


    $scope.edit_job = function () {
        $rootScope.editJobId = $scope.selected_job_id;
        $rootScope.isNewJob = false;
        $scope.assign = '';
        window.location.href = "#!/jobs";
        $('#head_job').parent().find('.selected').removeClass('selected');
        $('#head_job').addClass('selected');
    }

    $rootScope.completed_job = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/markCompleteJob',
            data: {
                'id': $scope.selected_job_id
            }
        }).then(function (response) {
            $('.my_modal').hide();
            $scope.jobs.forEach(function (job) {
                if (job.id == $scope.selected_job_id) {
                    job.job_type = 'Completed';
                }
            })
            $scope.filterJob();
        })
    }

    $scope.delete_job = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/deleteJob',
            data: {
                'id': $scope.selected_job_id
            }
        }).then(function (response) {
            $('.my_modal').hide();
            $scope.jobs.forEach(function (job) {

            })

            for (i = 0; i < $scope.jobs.length; i++) {
                if ($scope.jobs[i].id == $scope.selected_job_id) {
                    $scope.jobs.splice(i, 1);
                }
            }
            $scope.filterJob();
        })
    }

    $scope.add_employee = function () {

        $http({
            method: 'POST',
            url: 'laravel/public/addJobEmployee',
            data: {
                'id': $scope.selected_job_id,
                'employee_id': $scope.assign,
            }
        }).then(function (response) {
            $('.my_modal').hide();
            for (i = 0; i < $scope.jobs.length; i++) {
                if ($scope.jobs[i].id == $scope.selected_job_id) {
                    $scope.jobs[i].assign_employee = 1;
                    var employee = {'job_id': $scope.selected_job_id, 'employee_id': $scope.assign, 'id': ''};
                    $scope.jobs[i].employees.push(employee);
                }
            }
            $scope.filterJob();
        })

    }

    function updateAvailableEmployees(data) {
        $scope.availableEmployees = new Array();

        for (i = 0; i < $scope.employees.length; i++) {
            var k = true;
            for (j = 0; j < data.length; j++) {
                if ($scope.employees[i].employee_id == data[j].employee_id) {
                    k = false;
                    break;
                }
            }
            if (k == true) $scope.availableEmployees.push($scope.employees[i]);
            //       console.log($scope.availableEmployees);
        }
    }

    function loadCurrentEmployee(jobId) {
        $http({
            method: 'POST',
            data: {
                id: jobId,
            },
            url: 'laravel/public/loadJobEmployees'
        }).then(function (response) {
            data = response.data;
            //   console.log(data);
            updateAvailableEmployees(data);

            /*$scope.apply();*/
        })
    }

    function loadCurrentConstructors(jobId) {
        $http({
            method: 'POST',
            data: {
                id: jobId,
            },
            url: 'laravel/public/loadJobConstractors'
        }).then(function (response) {
            data = response.data;
            $scope.jobbing_constractors = data;
        })
        return $scope.jobbing_constractors;
        console.log($scope.jobbing_constractors);

    }

    initCalendar();
    $scope.loadEmployees();

    $('span.close').click(function () {
        $('.my_modal').hide();
        $scope.assign = '';
    });

    $("#colorpicker").kendoColorPicker({
        messages: {
            apply: "Update",
            cancel: "Cancel"
        },
        change: function (e) {
            $('.k-select').css('background-color', e.value);
            $http({
                method: 'POST',
                url: 'laravel/public/changeJobColor',
                data: {
                    'id': $scope.selected_job_id,
                    'color': e.value
                }
            }).then(function (response) {
                $scope.jobs.forEach(function (job) {
                    if (job.id == $scope.selected_job_id) {
                        job.color = e.value;
                    }
                })
                $scope.filterJob();
            })
        }
    })
})
