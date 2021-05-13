<?php

namespace Tests\Feature;

use App\Models\Paper;
use App\Models\Quiz;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class QuizDbTest extends TestCase
{
    //use DatabaseTransactions;

    public function test_write_entry_to_database()
    {
        $this->withoutExceptionHandling();

        $latest_id = Paper::orderby('paper_id')->first()->paper_id;
        $totalQuestion = 10;

        $response = $this->post('/quiz/generate',[
            "totalQuestion" => $totalQuestion,
            "totalNumber" => 2,
            "digitPerNumber" => 2,
            "isMixDigit" => true,
            "operator" => [1]
        ]);

        $response->assertOk();
        $response->assertSeeText("Generate successful.");

        $paper = Paper::find($latest_id+1);
        $quizzes = Quiz::where("paper_id", $latest_id+1)->get();

        $this->assertInstanceOf(Paper::class,$paper);
        $this->assertInstanceOf(Quiz::class, $quizzes->first());
        $this->assertNotEmpty($quizzes->first()->question_number);
        $this->assertNotEmpty($quizzes->first()->question_operator);
        $this->assertEquals($totalQuestion, count($quizzes));

    }
}
