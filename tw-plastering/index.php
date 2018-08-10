<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>T & W Plastering Pty Ltd</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="shortcut icon" href="favicon.ico">
    <!-- Place favicon.ico in the root directory -->




    <!-- stylesheets -->

    <link href='lib/fullcalendar/fullcalendar.min.css' rel='stylesheet' />
    <link href='lib/fullcalendar/fullcalendar.print.min.css' rel='stylesheet' media='print' />
    <link href="lib/multi-select/select.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/general.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/custom_checkbox.css">
    <link rel="stylesheet" href="lib/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="lib/bootstrap-datepicker/css/bootstrap-datepicker.min.css">
    <link rel="stylesheet" href="lib/bootstrap-datepicker/css/bootstrap-datepicker.standalone.css">

    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.common.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.rtl.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.silver.min.css"/>
    <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2017.2.621/styles/kendo.mobile.all.min.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
<!--    <link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css"/>-->

    <!-- jquery library -->

    <script src="lib/jquery/dist/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="lib/jquery/jQuery.print.js"></script>

    <!-- fullcalendar library -->

    <script src='lib/fullcalendar/lib/moment.min.js'></script>
    <script src='lib/fullcalendar/fullcalendar.min.js'></script>


    <!-- angular library -->

    <script src="lib/angular/angular.min.js"></script>
    <script src="lib/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDVR0iqfY1VF3RyLYvQyObAL8DTxLIccWI&libraries=places"></script>
    <script src="lib/ngAutocomplete-master/src/ngAutocomplete.js"></script>

<!--    for autopredict-->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-animate.js"></script>


    <!-- mutiselect library -->

    <script src="lib/multi-select/select.min.js"></script>
    <script src="lib/multi-select/select-tpls.min.js"></script>
    <script src="lib/bootstrap-gh-pages/ui-bootstrap-tpls-1.2.5.js"></script>

    <script src="lib/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>

    <script src="http://kendo.cdn.telerik.com/2017.2.621/js/kendo.all.min.js"></script>

</head>
<body ng-app="mainApp" ng-controller="Main_controller">


    <!--=================================================================================================-->
    <!-- TABS SECTION -->
    <div class="job-tabs">

        <!-- tabs header -->
        <div class="job-tabs__header">
            <div class="wrapper row">

                <div class="col-sm-9 col-xs-12">
                    <!-- tabs navigation -->
                    <div class="row center-xs start-sm job-tabs__nav">
                        <li class="selected" id="head_dashboard"><a ui-sref="dashboard">Dashboard</a></li>
                        <li id="head_job"><a ui-sref="jobs">Jobs</a></li>
                        <li id="head_emp_cont"><a ui-sref="employee">Employees / Contractors</a></li>
                        <li id="head_cal"><a ui-sref="calender">Calender</a></li>
                    </div><!-- tabs navigation -->
                </div>

                <div class="col-sm-3 col-xs-12 first-xs last-sm site-logo">
                    <li><a href="#">T & W Plastering Pty Ltd</a></li>
                </div>

            </div><!-- wrapper -->
            <div class="white_row" style="background-color: white; height:45px; padding: 10px 20px">
                <div class="wrapper row" style="text-align: right" id="username-container"></div>
            </div>
        </div><!-- end tabs header -->


        </div>
            <!-- include tabs  -->

            <!-- tab -->
            <div ui-view></div>


        </div><!-- wrapper -->
    </div><!-- job-tabs -->

    <div id="modal-popup-2" class="my_modal">
        <div class="modal-content zoom-anim-dialog popup popup--small">
            <div class="row">
                <div class="col-xs-12 col-sm-4"></div>
                <div class="col-xs-12 col-sm-8">
                    <h2 class="section-title">Login</h2>
                </div>
            </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-4">
                        <label for="" class="label row-label">Password</label>
                    </div>
                    <div class="col-xs-12 col-sm-8">
                        <div class="form-group">
                            <input type="password" name="psw" class="form-control" required="required" ng-model="password">
                            <button class="button large-pd">Submit</button>
                        </div>
                    </div>
                </div>


        </div>
    </div>
    <!--<script src="assets/js/main.js"></script>-->

    <script src="assets/js/mainApp.js"></script>
    <script src="assets/js/services.js"></script>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/calendar.js"></script>
    <script src="assets/js/controllers/main_controller.js"></script>
    <script src="assets/js/controllers/emp_con_controller.js"></script>
    <script src="assets/js/controllers/calender_controller.js"></script>
    <script src="assets/js/controllers/dashboard_controller.js"></script>
    <script src="assets/js/controllers/jobs_controller.js"></script>
    <script src="assets/js/controllers/employee_controller.js"></script>
    <script src="assets/js/controllers/constractor_controller.js"></script>

</body>
