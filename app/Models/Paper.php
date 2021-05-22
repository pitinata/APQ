<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paper extends Model
{
    use HasFactory;

    protected $primaryKey = 'paper_id';

    public function quiz(){
        return $this->hasMany(Quiz::class, 'paper_id');
    }
}
