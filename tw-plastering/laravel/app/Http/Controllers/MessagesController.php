<?php

namespace App\Http\Controllers;

use App\Messages;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;

class MessagesController extends Controller
{
    public function sendMessage(Request $request) {
        $message = new Messages();

        $message->sent_by = $request->sent_by;
        $message->msg = $request->msg;

        $message->save();

        return response('success');
    }

    public function getAllMessages($date) {

        $messages = Messages::whereDate('created_at', '=', Carbon::parse($date)->format('Y-m-d'))->get();
        return json_encode($messages);
    }

    public function deleteMessage(Request $request) {

        $message_id = $request->input('message_id');
        $messages = Messages::where('id', $message_id)->delete();
        return response("success");
    }
}
