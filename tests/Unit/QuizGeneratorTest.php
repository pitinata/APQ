<?php

namespace Tests\Unit;

use App\Http\Controllers\QuizGenerator;
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

        $data = QuizGenerator::generateOperator($totalNumber, ["1","2"]);

        $this->assertIsArray($data);
        $this->assertCount($totalNumber-1,$data);
    }

    public function test_answer_calculation(){

        $answer = QuizGenerator::calculateAnswer([1,2,3,4,5], ["*","/","/","*"]);

        $this->assertEquals(25, $answer);
    }
}
