mainApp.controller('Jobs_controller', function ($scope, $rootScope, $http, $state, $filter) {

    $scope.isNewJob = true;
    $scope.isNewJob = $rootScope.isNewJob;
    $scope.editJobId = $rootScope.editJobId;
    $scope.isSubmited = false;
    $scope.isCompleted = false;

    $scope.jobs;

    $scope.job_employees;
    $scope.selected_employees;
    $scope.availableEmployees;
    $scope.all_employees = $rootScope.employees;
    $scope.job_constractors;
    $scope.all_constractors = $rootScope.constractors;
    console.log($scope.all_constractors);
    $scope.availableConstractors;
    $scope.selected_constractors = new Array();

    $scope.all_builders;


    $scope.item_names = [
        '6mm Villa Metres',
        '9mm Metres',
        '10mm RE Metres',
        '13mm Metres',
        '16mm Metres',
        'Balustrading',
        'Battens',
        'Bulk Head',
        'Ceiling Inso',
        'Cove Cornice',
        'Exys',
        'Hampers',
        'Level 5',
        'Ornate Cornice',
        'Rakes',
        'Rose',
        'Suspended Ceiling',
        'Square Set',
        'Wall Inso'
    ];

    price = 0;

    function load_jobs() {
        $http({
            method: 'POST',
            url: 'laravel/public/loadAllJobs'
        }).then(function (response) {
            $scope.jobs = response.data;

            $scope.all_builders = new Array();

            for (var i = 0; i < $scope.jobs.length; i++) {
                $scope.all_builders.push($scope.jobs[i].builder);
            }
            console.log($scope.all_builders);

            for (var i = 0; i < $scope.all_builders.length; i++) {
                for (var j = 1; j < $scope.all_builders.length; j++) {
                    if ($scope.all_builders[i] == $scope.all_builders[j]) {
                        $scope.all_builders.pop($scope.all_builders[i]);
                    }
                }
            }
            console.log($scope.all_builders);


            return $scope.all_builders;
        })
    }

    $scope.loadJobs = function () {
        $http({
            method: 'POST',
            data: {
                id: $scope.editJobId,
            },
            url: 'laravel/public/loadJob'
        }).then(function (response) {

            data = response.data[0];
            console.log(data);
            $scope.loadCurrentJobEmployees();
            $scope.loadCurrentJobConstractor();

            $scope.job_type = data.job_type;
            $scope.address = data.address;

            $scope.builder = data.builder;
            $scope.description = data.description;
            $scope.quoted = data.quoted;
            $scope.hours = data.hours;
            $scope.start_date = data.start_date;
            $scope.end_date = data.end_date;
            $scope.special_note = data.special_note;
            /*$scope.apply();*/
        })
    }

    $scope.submit_job = function () {

        if (validate() == 'timeerr') {
            alert('Please input correct start and end date');
            return;
        }
        if (validate() == false) {
            alert('Please input all information');
            return;
        }
        console.log($scope.bundle);

        if ($scope.isNewJob) {
            action = 'newJob';
        } else {
            action = 'editJob';
        }

        $scope.isSubmited = true;
        $scope.submit_label = '"Please wait a moment"';

        console.log(JSON.stringify($scope.end_date));
        $http({
            method: 'POST',
            data: {
                'action': action,
                'id': $scope.editJobId,
                'job_type': $scope.job_type,
                'address': $scope.address,
                'builder': $scope.builder,
                'description': $scope.description,
                'constractors': JSON.stringify($scope.selected_constractors),
                'employees': JSON.stringify($scope.selected_employees),
                'quoted': $scope.quoted,
                'hours': $scope.hours,
                'start_date': $scope.start_date,
                'end_date': $scope.end_date,
                'special_note': $scope.special_note,
                'color': randomColor(),
            },
            url: 'laravel/public/updateJob'
        }).then(function (response) {
            if (response.data == 'success') {
                if ($scope.isNewJob) {
                    $scope.submit_label = '"Your job created"';
                    initJobForm();
                } else {
                    $scope.loadJobs();
                    $scope.submit_label = '"Your job saved"';
                }

                for (var i = 0; i < $scope.selected_constractors.length; i++) {
                    console.log("This is the list of constractors: " + $scope.selected_constractors[i]);
                }
            }
        });
        $scope.selected_constractors = new Array();
    }

    function initJobForm() {
        $scope.job_type = '';
        $scope.address = '';
        $scope.builder = '';
        $scope.description = '';
        $scope.quoted = '';
        $scope.hours = '';
        $scope.start_date = '';
        $scope.end_date = '';
        $scope.special_note = '';
        $scope.selected_employees = '';
    }

    $scope.loadCurrentJobEmployees = function () {

        $http({
            method: 'POST',
            data: {
                id: $scope.editJobId,
            },
            url: 'laravel/public/loadJobEmployees'
        }).then(function (response) {
            data = response.data;
            $scope.job_employees = data;
            $scope.updateAvailableEmployees();

            /*$scope.apply();*/
        })
    }

    $scope.loadCurrentJobConstractor = function () {
        $http({
            method: 'POST',
            data: {
                id: $scope.editJobId,
            },
            url: 'laravel/public/loadJobConstractors'
        }).then(function (response) {
            data = response.data;
            $scope.job_constractors = data;
            $scope.updateAvailableConstractors();
            console.log($scope.availableConstractors);
            /*$scope.apply();*/
        })
    }

    function validate() {

        if (!$scope.job_type) return false;
        if (!$scope.address) return false;


    }

    $scope.address_options = {
        country: 'au',
        types: '(cities)'
    };


    if (!$scope.isNewJob) {
        $scope.loadJobs();
    } else {
        $scope.availableEmployees = $scope.all_employees;
        $scope.availableConstractors = $scope.all_constractors;
    }

    $scope.deleteCurrentJobEmployee = function (index) {


        $http({
            method: 'POST',
            data: {
                'job_id': $scope.editJobId,
                'employee_id': $scope.job_employees[index].employee_id,
            },
            url: 'laravel/public/deleteJobEmployee'
        }).then(function (response) {
            $scope.job_employees.splice(index, 1);
            $scope.updateAvailableEmployees();
            /*$scope.apply();*/
        })
    }

    $scope.deleteCurrentJobConstractor = function (index) {
        $http({
            method: 'POST',
            data: {
                'job_id': $scope.editJobId,
                'constractor_id': $scope.job_constractors[index].constractor_id,
            },
            url: 'laravel/public/deleteJobConstractor'
        }).then(function (response) {
            $scope.job_constractors.splice(index, 1);
            $scope.updateAvailableConstractors();
            /*$scope.apply();*/
        })
    }

    $scope.deleteCurrentJob = function () {

        $http({
            method: 'POST',
            url: 'laravel/public/deleteJob',
            data: {
                'id': $scope.editJobId
            },
        }).then(function (response) {
            $('#modal-delete').hide();
            window.location.href = "#!/dashboard";
        })
    }

    $scope.print_edit_constractor = function (index) {

        $scope.editConstractorId = $scope.job_constractors[index].constractor_id;
        $scope.getConstractorName = $scope.job_constractors[index].constractor_name;
        $http({
            method: 'POST',
            data: {
                'job_id': $scope.editJobId,
                'constractor_id': $scope.editConstractorId,
            },
            url: 'laravel/public/getEditJobConstractorInformation'
        }).then(function (response) {
            $scope.constractor_edit_description = response.data[0].constractor_description;
            $scope.constractor_edit_price = response.data[0].price;
            $scope.edit_start_cont_date = response.data[0].start_cont_date;
            $scope.edit_end_cont_date = response.data[0].end_cont_date;
            $scope.const_name = $scope.getConstractorName;
            load_items(response.data[0]);

        })

        setTimeout(function () {
            $.print($('#print_modal'));
        }, 1000);


    };

    $(document).on("click", ".k-overlay", function () {
        $('#modal-popup-contractor').close();
    });

    $scope.updateAvailableEmployees = function () {

        $scope.selected_employees = new Array();
        $scope.availableEmployees = new Array();

        for (i = 0; i < $scope.all_employees.length; i++) {
            var k = true;
            for (j = 0; j < $scope.job_employees.length; j++) {
                if ($scope.all_employees[i].employee_id == $scope.job_employees[j].employee_id) {
                    k = false;
                    break;
                }
            }
            if (k == true) $scope.availableEmployees.push($scope.all_employees[i]);
        }
    }

    $scope.updateAvailableConstractors = function () {

        $scope.availableConstractors = new Array();
        if ($scope.job_constractors.length == 0) {
            $scope.availableConstractors = $scope.all_constractors;
            return;
        }
        for (i = 0; i < $scope.all_constractors.length; i++) {
            var k = true;
            for (j = 0; j < $scope.job_constractors.length; j++) {
                if ($scope.all_constractors[i].constractor_id == $scope.job_constractors[j].constractor_id) {
                    k = false;
                    break;
                }
            }
            if (k == true) $scope.availableConstractors.push($scope.all_constractors[i]);
        }

    }

    $scope.hm = function () {
        $('#modal-delete').hide();
    }

    $scope.om = function () {
        $('#modal-delete').show();
    }

    $scope.add_constractor = function () {
        $('#modal-popup').show();
        $scope.constractor_items = new Array();

        default_item = {
            'name': '',
            'text1': '',
            'text2': '',
            'price': '',
            'default': true
        };

        $scope.constractor_items.push(default_item);

    }

    $('span.close').click(function () {
        $('.my_modal').hide();
    });

    $scope.edit_constractor = function (index) {


        $scope.editConstractorId = $scope.job_constractors[index].constractor_id;
        $scope.getConstractorName = $scope.job_constractors[index].constractor_name;
        $http({
            method: 'POST',
            data: {
                'job_id': $scope.editJobId,
                'constractor_id': $scope.editConstractorId,
            },
            url: 'laravel/public/getEditJobConstractorInformation'
        }).then(function (response) {
            $scope.constractor_edit_description = response.data[0].constractor_description;
            $scope.constractor_edit_price = response.data[0].price;
            $scope.edit_start_cont_date = response.data[0].start_cont_date;
            $scope.edit_end_cont_date = response.data[0].end_cont_date;
            $scope.const_name = $scope.getConstractorName;
            load_items(response.data[0]);
            $('#modal-popup-contractor').show();

        })
    }

    function load_items(data) {
        $scope.constractor_items = new Array();

        item_name = data.item.split(",");
        item_text1 = data.item_text1.split(",");
        item_text2 = data.item_text2.split(",");
        item_price = data.item_price.split(",");

        for (i = 0; i < item_name.length; i++) {
            item = {
                'name': item_name[i],
                'text1': item_text1[i],
                'text2': item_text2[i],
                'price': Number(item_price[i]),
            }

            $scope.constractor_items.push(item);
        }

        $scope.constractor_items[0].default = true;

        console.log($scope.constractor_items);

    }

    $scope.edit_constractor_submit = function () {

        item_name = $scope.constractor_items[0].name;
        item_text1 = $scope.constractor_items[0].text1;
        item_text2 = $scope.constractor_items[0].text2;
        item_price = $scope.constractor_items[0].price;

        for (i = 1; i < $scope.constractor_items.length; i++) {
            item_name += "," + $scope.constractor_items[i].name;
            item_text1 += "," + $scope.constractor_items[i].text1;
            item_text2 += "," + $scope.constractor_items[i].text2;
            item_price += "," + $scope.constractor_items[i].price;
        }
        if ($scope.start_cont_date && $scope.end_cont_date) {
            $http({
                method: 'POST',
                data: {
                    'job_id': $scope.editJobId,
                    'constractor_id': $scope.editConstractorId,
                    'constractor_description': $scope.constractor_edit_description,
                    'price': $scope.constractor_edit_price,
                    'item': item_name,
                    'item_text1': item_text1,
                    'item_text2': item_text2,
                    'item_price': item_price,
                    'start_cont_date': $scope.start_cont_date,
                    'end_cont_date': $scope.end_cont_date
                },
                url: 'laravel/public/editJobConstractor'

            }).then(function (response) {

                $('#modal-popup-contractor').hide();
                $scope.constractor_edit_description = '';
                $scope.constractor_edit_price = '';
                if (response.data == 'success') alert('success');

            })
        } else {
            $scope.invalidDates = true;
        }
    }

    $scope.submit_add_constractor = function () {


        if (!$scope.selected_constractor) {
            alert('need all information');
            return;
        }

        item_name = $scope.constractor_items[0].name;
        item_text1 = $scope.constractor_items[0].text1;
        item_text2 = $scope.constractor_items[0].text2;
        item_price = $scope.constractor_items[0].price;

        for (i = 1; i < $scope.constractor_items.length; i++) {
            item_name += "," + $scope.constractor_items[i].name;
            item_text1 += "," + $scope.constractor_items[i].text1;
            item_text2 += "," + $scope.constractor_items[i].text2;
            item_price += "," + $scope.constractor_items[i].price;
        }


        var constractor = {
            'constractor_id': $scope.selected_constractor,
            'constractor_description': $scope.constractor_add_description,
            'price': $scope.constractor_add_price,
            'item': item_name,
            'item_text1': item_text1,
            'item_text2': item_text2,
            'item_price': item_price,
            'start_cont_date': $scope.start_cont_date,
            'end_cont_date': $scope.end_cont_date
        };

        if ($scope.start_cont_date && $scope.end_cont_date) {
            $scope.selected_constractors.push(constractor);

            $scope.selected_constractor = '';
            $scope.constractor_add_description = '';
            $scope.constractor_add_price = '';
            $('.my_modal').hide()
            if (!$scope.isNewJob) {
                $scope.submit_job();
            }
        } else {
            $scope.invalidDates = true;
        }

    }


    $scope.add_item = function () {

        item = {
            'name': '',
            'text1': '',
            'text2': '',
            'price': '',
        };
        $scope.constractor_items.push(item);
        console.log($scope.constractor_items);
    }


    $scope.remove_item = function (index) {
        $scope.constractor_items.splice(index, 1);
        $scope.calc_item_price();
    }

    $scope.calc_item_price = function () {
        price = 0;

        $scope.constractor_items.forEach(function (item) {
            price = Number(item.text1) * Number(item.text2);
            item.price = price.toString();
        });

        total_price = 0;
        $scope.constractor_items.forEach(function (item) {
            total_price += Number(item.price);
        })

        $scope.constractor_add_price = total_price.toString();
        $scope.constractor_edit_price = total_price.toString();

    }

    // $scope.calc_price = function () {
    //     price = 0;
    //     $scope.constractor_items.forEach(function (item) {
    //         price += Number(item.price);
    //     })
    //     $scope.constractor_add_price = price.toString();
    // }


    function randomColor() {
        randomColors = ['#09efc6', '#09ef1a', '#efec09', '#ef8609', '#ef6009', '#b609ef', '#ef0986', '#09efec', '#ecef09', '#09a6ef', '#076692', '#c0b507', '#c04807', '#6b07c0', '#72aeb5', '#69811e', '#8d2b23']
        randomNumber = Math.floor(Math.random() * randomColors.length);
        return randomColors[randomNumber];
    }

    $(document).ready(function () {

        load_jobs();

        if ($rootScope.constrator_id != null) {

            $http({
                method: 'POST',
                data: {
                    'job_id': $scope.editJobId,
                    'constractor_id': $rootScope.constrator_id,
                },
                url: 'laravel/public/getEditJobConstractorInformation'
            }).then(function (response) {
                $scope.constractor_edit_description = response.data[0].constractor_description;
                $scope.constractor_edit_price = response.data[0].price;
                $scope.edit_start_cont_date = response.data[0].start_cont_date;
                $scope.edit_end_cont_date = response.data[0].end_cont_date;
                $scope.const_name = $rootScope.constractor_name_calendar;
                load_items(response.data[0]);
                $('#modal-popup-contractor').show();

            })

        }
    });

    $scope.completed_job = function () {
        $http({
            method: 'POST',
            url: 'laravel/public/markCompleteJob',
            data: {
                'id': $scope.editJobId
            }
        }).then(function (response) {
            $scope.jobs.forEach(function (job) {
                if (job.id == $scope.editJobId) {
                    job.job_type = 'Completed';
                }
            })
            $scope.isCompleted = true;
            $scope.submit_label = '"Job marked as completed"';
            $scope.loadJobs();
        })
    }

    console.log('selected_employee');

    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
    });

})
