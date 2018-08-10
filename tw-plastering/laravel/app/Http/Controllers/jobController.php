<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Users;
use App\Job;
use App\Job_employee;
use App\Job_constractor;
use App\Empolyee;
use App\Constractor;

class jobController extends Controller
{

    public function loadJob(Request $req) {

        $job = new Job();
        $job = $job::where('id', $req->input('id'))->get();
        return json_encode($job);
        //return response('job');
    }

    public function updateJob(Request $req) {
        $job = new Job();

        $action = $req->input('action');
        if ($action == 'editJob') {               ///// In case of job Edit.
            $job = $job::where('id', $req->input('id'))->first();
        } else {
            $job->color = $req->input('color');
        }

        $job->job_type = $req->input('job_type');
        $job->address = $req->input('address');
        $job->builder = $req->input('builder');
        $job->description = $req->input('description');
        $job->quoted = $req->input('quoted');
        $job->hours = $req->input('hours');
        $job->start_date = $req->input('start_date');
        $job->end_date = $req->input('end_date');
        $job->special_note = $req->input('special_note');


        $job->save();               /// save job model

        $employees = json_decode($req->input('employees'));
        $constractors = json_decode($req->input('constractors'));
        $this->updateEmployees($job->id, $employees);    ///add employees in job
        $this->updateConstractors($job->id, $constractors);
        return response('success');
    }

    public function updateEmployees($job_id, $employees) {

        if ($employees) {
            foreach ($employees as $employee) {
                $job_employee = new Job_employee();
                $job_employee->job_id = $job_id;
                $job_employee->employee_id = $employee->employee_id;
                $job_employee->save();
                $job = New Job();
                $job = $job::where('id', $job_id)->first();
                $job->assign_employee = 1;
                $job->save();
            }
        }

    }

    public function loadJobEmployees(Request $req) {
        $job_id = $req->input('id');
        $job_employees = new Job_employee();
        $job_employees = $job_employees::where('job_id', $job_id)->get();

        $employees = array();
        foreach ($job_employees as $job_employee) {
            $employee = new Empolyee();
            $employee = $employee::where('employee_id', $job_employee->employee_id)->first();
            array_push($employees, $employee);
        }

        return json_encode($employees);
    }

    public function loadJobConstractors(Request $req) {
        $job_id = $req->input('id');
        $job_constractors = new Job_constractor();
        $job_constractors = $job_constractors::where('job_id', $job_id)->get();

        $constractors = array();
        foreach ($job_constractors as $job_constractor) {
            $constractor = new Constractor();
            $constractor = $constractor::where('constractor_id', $job_constractor->constractor_id)->first();
            array_push($constractors, $constractor);
        }

        return json_encode($constractors);
    }

    public function updateConstractors($job_id, $constractors) {

        if ($constractors) {
            foreach ($constractors as $constractor) {

                foreach ($constractor->constractor_id as $cons_id) {

                    $job_constractor = new Job_constractor();
                    $job_constractor->job_id = $job_id;
                    $job_constractor->constractor_id = $cons_id->constractor_id;
                    $job_constractor->constractor_description = isset($constractor->constractor_description) ? $constractor->constractor_description : '';
                    $job_constractor->price = $constractor->price;
                    $job_constractor->item = $constractor->item;
                    $job_constractor->item_text1 = $constractor->item_text1;
                    $job_constractor->item_text2 = $constractor->item_text2;
                    $job_constractor->item_price = $constractor->item_price;
                    $job_constractor->start_cont_date = $constractor->start_cont_date;
                    $job_constractor->end_cont_date = $constractor->end_cont_date;
                    $job_constractor->save();
                }
                $job = New Job();
                $job = $job::where('id', $job_id)->first();
                $job->assign_constractor = 1;
                $job->save();
            }
        }
    }

    public function editJobConstractor(Request $req) {
        $job_constractor = new Job_constractor();
        $job_constractor = $job_constractor::where('job_id', $req->input('job_id'))->where('constractor_id', $req->input('constractor_id'))->first();
        $job_constractor->price = $req->input('price');
        $job_constractor->constractor_description = $req->input('constractor_description');
        $job_constractor->item = $req->input('item');
        $job_constractor->item_text1 = $req->input('item_text1');
        $job_constractor->item_text2 = $req->input('item_text2');
        $job_constractor->item_price = $req->input('item_price');
        $job_constractor->start_cont_date = $req->input('start_cont_date');
        $job_constractor->end_cont_date = $req->input('end_cont_date');
        $job_constractor->save();
        return response('success');
    }

    public function loadAllJobs(Request $req) {
        $jobs = New Job();
        $jobs = $jobs::all();

        foreach ($jobs as $job) {
            $job['employees'] = array();
            $employee = new Job_employee();
            $job['employees'] = $employee::where('job_id', $job->id)->get();
            $job['constractors'] = array();
            $constractor = new Job_constractor();
            $job['constractors'] = $constractor::where('job_id', $job->id)->get();
        }
        return json_encode($jobs);
    }


    public function deleteJobEmployee(Request $req) {
        $job_employee = new Job_employee();
        $job_employee::where('job_id', $req->input('job_id'))->where('employee_id', $req->input('employee_id'))->delete();
        $job_employee = new Job_employee();
        $job_employee = $job_employee::where('job_id', $req->input('job_id'))->first();
        if(!$job_employee) {
            $job = new Job();
            $job = $job::where('id', $req->input('job_id'))->first();
            $job->assign_employee = 0;
            $job->save();
        }
    }

    public function deleteJobConstractor(Request $req) {
        $job_constractor = new Job_constractor();
        $job_constractor::where('job_id', $req->input('job_id'))->where('constractor_id', $req->input('constractor_id'))->delete();
        $job_constractor = new Job_constractor();
        $job_constractor = $job_constractor::where('job_id', $req->input('job_id'))->first();
        if(!$job_constractor) {
            $job = new Job();
            $job = $job::where('id', $req->input('job_id'))->first();
            $job->assign_constractor = 0;
            $job->save();
        }
    }

    public function markCompleteJob(Request $req) {
        $job = new Job();
        $job = $job::where('id', $req->input('id'))->first();
        $job->job_type = 'Completed';
        $job->save();
    }

    public function changeJobColor(Request $req) {
        $job = new Job();
        $job = $job::where('id', $req->input('id'))->first();
        $job->color = $req->input('color');
        $job->save();
    }

    public function deleteJob(Request $req) {

        $id = $req->input('id');
        $job = new Job();
        $job = $job::where('id', $id)->delete();

        $job_employee = new Job_employee();
        $job_employee::where('job_id', $id)->delete();

        $job_constractor = new Job_constractor();
        $job_constractor::where('job_id', $id)->delete();

    }

    public function getEditJobConstractorInformation(Request $req) {
        $job_constractor = new Job_constractor();
        $job_constractor = $job_constractor::where('job_id', $req->input('job_id'))->where('constractor_id', $req->input('constractor_id'))->get();
        return json_encode($job_constractor);
    }

    public function addJobEmployee(Request $req) {
        $job_employee = new Job_employee();
        $job_employee->job_id = $req->input('id');
        $job_employee->employee_id = $req->input('employee_id');
        $job_employee->save();
        $job = New Job();
        $job = $job::where('id', $req->input('id'))->first();
        $job->assign_employee = 1;
        $job->save();
        return response('success');
    }
}
