<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $primaryKey = 'quiz_id';

    protected $fillable = [
        'question_number', 'question_operator', 'answer'
    ];

    public function paper(){
        return $this->hasOne(Paper::class);
    }

}
