<?php

namespace App\Http\Controllers;

use App\Constractor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Users;
use App\Constrator;
use App\Job_constractor;

class constractorController extends Controller
{

    public $constrator;



    public function loadConstractor(Request $req) {

        $constrator = new Constractor();
        $constrators = $constrator::all();


        return json_encode($constrators);

        //return response('constractor');
    }

    public function deleteConstractor(Request $req) {
        $constractor_id = $req->input('constractor_id');

        $constractor = new Constractor();
        $constractor::where('constractor_id', $constractor_id)->delete();

        $job_constractor = new Job_constractor();
        $job_constractor::where('constractor_id', $constractor_id)->delete();

        return response("sdfsdf");

    }

    public function addConstractor(Request $req) {
        $constractor_name = $req->input('constractor_name');

        $constractor = new Constractor();
        $constractor->constractor_name = $constractor_name;

        $constractor->save();

        return response("sdfsdf");

    }

    public function editConstractor(Request $req) {
        $constractor = new Constractor();
        $constractor::where('constractor_id', $req->input('constractor_id'))->delete();
        $constractor = new Constractor();
        $constractor->constractor_name = $req->input('constractor_name');
        $constractor->constractor_id = $req->input('constractor_id');
        $constractor->save();
        return response('success');
    }
}
