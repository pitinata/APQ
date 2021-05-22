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

    public function test_serialize_question_to_string(){
        $questionNumber = 'a:2:{i:0;i:74;i:1;i:21;}';
        $questionOperator = 'a:1:{i:0;s:1:"+";}';

        $questionString = QuizGenerator::serializedQuestionToString($questionNumber, $questionOperator);

        $this->assertEquals("74+21",$questionString);
    }

}
