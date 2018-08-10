<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;
use App\Users;

class userController extends Controller
{
    public function insertData(Request $req) {

        $name = $req->input('name');
        $email = $req->input('email');


       /* DB::table('users')->insert(['username' => $name, 'email' => $email]);*/

        $test = '';

        $user = new Users;

        $user->username = $name;
        $user->email = $email;
        $user->save();



        return response("success");
   //     $users = DB::select("select * from users where username='$name'");

     /*   $users = DB::table('users')->get();

        foreach($users as $user) {
            return response($user);
        }*/
/*
        $users = DB::table('users')->where('username', $name)->first();

        $names = DB::table('users')->pluck('username', 'email');

        foreach($names as $name => $email) {
            echo $email;
        }


        return response($users->email);*/
        /*$name = $req->input('name');
        $email = $req->input('email');
        return response($email);
        */



    }
}
