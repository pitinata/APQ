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
    // use DatabaseTransactions;

    public function test_write_entry_to_database()
    {
        $this->withoutExceptionHandling();

        $latest_id = Paper::orderByDesc('paper_id')->first()->paper_id;
        $totalQuestion = 10;

        $response = $this->post('/quiz/generate',[
            "totalQuestion" => $totalQuestion,
            "totalNumber" => 2,
            "digitPerNumber" => 2,
            "isMixDigit" => true,
            "operator" => ["+"]
        ]);

        $response->assertOk();
        $response->assertSeeText("Generate successful.");

        $paper = Paper::find($latest_id+1);
        $quizzes = $paper->quiz->all();

        $this->assertInstanceOf(Paper::class,$paper);
        $this->assertInstanceOf(Quiz::class, $quizzes[0]);
        $this->assertNotEmpty($quizzes[0]->question_number);
        $this->assertNotEmpty($quizzes[0]->question_operator);
        $this->assertEquals($totalQuestion, count($quizzes));

    }
}
