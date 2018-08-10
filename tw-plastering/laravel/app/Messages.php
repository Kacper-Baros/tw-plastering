<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    protected $appends = ['created_time', 'created_date'];
    public function getCreatedTimeAttribute(){
        return Carbon::parse($this->attributes['created_at'])->format('H:iA:');
    }
    public function getCreatedDateAttribute(){
        return Carbon::parse($this->attributes['created_at'])->format('l, jS \of F Y');
    }
}
