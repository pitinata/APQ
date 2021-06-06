<?php

namespace Database\Factories;

use App\Http\Controllers\QuizGenerator;
use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Quiz::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $numberArr = QuizGenerator::generateNumber(2, 2, true);
        $operatorArr = QuizGenerator::generateOperator(2, ["+","-"]);

        return [
            "question_number" => serialize($numberArr),
            "question_operator" => serialize($operatorArr),
            "answer" => QuizGenerator::calculateAnswer($numberArr, $operatorArr),
        ];
    }
}
