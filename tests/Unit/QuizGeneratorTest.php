<?php

namespace Tests\Unit;

use App\Http\Controllers\QuizGenerator;
use App\Models\Quiz;
use Tests\TestCase;

class QuizGeneratorTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    public function test_number_generator(){

        $totalNumber = 10;

        $data = QuizGenerator::generateNumber($totalNumber, 1, false);

        $this->assertIsArray($data);
        $this->assertCount($totalNumber,$data);
    }

    public function test_operator_generator(){

        $totalNumber = 10;

        $data = QuizGenerator::generateOperator($totalNumber, ["+","-"]);

        $this->assertIsArray($data);
        $this->assertCount($totalNumber-1,$data);
    }

    public function test_answer_calculation(){

        $answer = QuizGenerator::calculateAnswer([1,2,3,4,5], ["+","+","+","+"]);

        $this->assertEquals(15, $answer);
    }

    public function test_question_generate(){
        $question = QuizGenerator::generateQuestion(totalNumber: 1, digitPerNumber:2, isMixDigit:false, operator: ["+","-"]);

        $this->assertInstanceOf(Quiz::class, $question);
    }

    // public function test_quiz_generator()
    // {
    //     // $response = $this->get('/quiz/get?totalQuestion=1&totalNumber=2&digitPerNumber=2&isMixDigit=true&operator[]=1&operator[]=2');

    //     // [
    //     //     "totalQuestion" => '1',
    //     //     "totalNumber" => 2,
    //     //     "digitPerNumber" => 2,
    //     //     "isMixDigit" => true,
    //     //     "operator" => [1]
    //     // ]

    //     $totalQuestion = 10;

    //     $paper = QuizGenerator::generatePaper(
    //         totalQuestion: $totalQuestion,
    //         totalNumber: 5,
    //         digitPerNumber: 2,
    //         isMixDigit: true,
    //         operator: [1,2]
    //     );

    //     print_r($paper);

    //     $this->assertIsArray($paper);
    //     $this->assertInstanceOf(Quiz::class,$paper[0]);
    //     $this->assertCount($totalQuestion, $paper);

    // }

}
