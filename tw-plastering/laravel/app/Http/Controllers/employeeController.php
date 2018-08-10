<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Users;
use App\Empolyee;
use App\Job_employee;

class employeeController extends Controller
{

    public function loadEmployee(Request $req) {

        $employee = new Empolyee();
        $employees = $employee::all();


        return json_encode($employees);

        //return response('employee');
    }

    public function deleteEmployee(Request $req) {
        $employee_id = $req->input('employee_id');

        $employee = new Empolyee();
        $employee = $employee::where('employee_id', $employee_id);
        $employee->delete();

        $job_employee = new Job_employee();
        $job_employee::where('employee_id', $employee_id)->delete();

        return response("sdfsdf");

    }

    public function addEmployee(Request $req) {
        $employee_name = $req->input('employee_name');

        $employee = new Empolyee();
        $employee->employee_name = $employee_name;

        $employee->save();

        return response("sdfsdf");

    }

    public function editEmployee(Request $req) {
        $employee = new Empolyee();
        $employee::where('employee_id', $req->input('employee_id'))->delete();
        $employee = new Empolyee();
        $employee->employee_name = $req->input('employee_name');
        $employee->employee_id = $req->input('employee_id');
        $employee->save();
        return response('success');
    }
}
