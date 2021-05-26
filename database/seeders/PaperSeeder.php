<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('papers')->insert([
            'paper_id' => 1
        ]);

        DB::table('quizzes')->insert([
            'quiz_id' => 1,
            'paper_id' => 1,
            'question_number' => 'a:2:{i:0;i:9;i:1;i:37;}',
            'question_operator' => 'a:1:{i:0;s:1:"+";}',
            'answer' => '46.00',
        ]);

        DB::table('quizzes')->insert([
            'quiz_id' => 2,
            'paper_id' => 1,
            'question_number' => 'a:2:{i:0;i:4;i:1;i:2;}',
            'question_operator' => 'a:1:{i:0;s:1:"+";}',
            'answer' => '6.00',
        ]);
    }
}
