<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::post('/', function () {
    return response('success');
 //   return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/



Route::group(['middleware' => ['web']], function () {
    ////employee requests
  
    Route::post('/deleteEmployee', 'employeeController@deleteEmployee');
    Route::post('/addEmployee', 'employeeController@addEmployee');
    Route::post('/editEmployee', 'employeeController@editEmployee');
    Route::post('/loadEmployee', 'employeeController@loadEmployee');
    
////messages requests

    Route::post('/sendMessage', 'MessagesController@sendMessage');
    Route::post('/getMessages/{date}', 'MessagesController@getAllMessages');
    Route::post('/deleteMessage', 'MessagesController@deleteMessage');


////constractor requests
    Route::post('/loadConstractor', 'constractorController@loadConstractor');
    Route::post('/deleteConstractor', 'constractorController@deleteConstractor');
    Route::post('/addConstractor', 'constractorController@addConstractor');
    Route::post('/editConstractor', 'constractorController@editConstractor');

/////job requests
    Route::post('/loadJobEmployees', 'jobController@loadJobEmployees');
    Route::post('/loadJobConstractors', 'jobController@loadJobConstractors');
    Route::post('/loadJob', 'jobController@loadJob');
    Route::post('/deleteJob', 'jobController@deleteJob');
    Route::post('/updateJob', 'jobController@updateJob');
    Route::post('/loadAllJobs', 'jobController@loadAllJobs');
    Route::post('/deleteJobEmployee', 'jobController@deleteJobEmployee');
    Route::post('/deleteJobConstractor', 'jobController@deleteJobConstractor');
    Route::post('/editJobConstractor', 'jobController@editJobConstractor');
    Route::post('/markCompleteJob', 'jobController@markCompleteJob');
    Route::post('/changeJobColor', 'jobController@changeJobColor');
    Route::post('/getEditJobConstractorInformation', 'jobController@getEditJobConstractorInformation');
    Route::post('/addJobEmployee', 'jobController@addJobEmployee');
    Route::post('/login', 'loginController@login');
});





/*Route::group(['middleware' => ['web']], function () {

});*/


