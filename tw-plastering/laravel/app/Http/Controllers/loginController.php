<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Users;

class loginController extends Controller
{

    public function login(Request $req) {
        $user = new Users();
        $user = $user::where('password', $req->input('password'))->first();
        if($user) {
            $req->session()->push('password', $user->password);
            return response()
                ->json([
                    'success' => 'success',
                    'username' => $user->username
                ]);
        } else {
            return response('error');
        }

    }
}
