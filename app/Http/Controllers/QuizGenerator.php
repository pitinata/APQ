<?php

namespace App\Http\Controllers;

use App\Exceptions\IncompleteNumberOrOperatorException;
use App\Models\Paper;
use App\Models\Quiz;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizGenerator extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // public static function generatePaper($totalQuestion, $totalNumber, $digitPerNumber, $isMixDigit, $operator)
    public function __invoke(Request $request)
    {
        $quizzes = [];

        $totalQuestion=$request->input("totalQuestion");
        $totalNumber=$request->input("totalNumber");
        $digitPerNumber=$request->input("digitPerNumber");
        $isMixDigit=$request->input("isMixDigit");
        $operator=$request->input("operator");

        for($i = 0; $i<$totalQuestion; $i++){
            $quiz = QuizGenerator::generateQuestion(
                $totalNumber,
                $digitPerNumber,
                $isMixDigit,
                $operator
            );

            array_push($quizzes, $quiz);
        }

        try {
            DB::transaction(function () use ($quizzes) {
                $paper = new Paper();
                $paper->save();

                foreach($quizzes as $quiz){
                    $quiz->paper_id = $paper->paper_id;
                    $quiz->save();
                }
            });

            return "Generate successful.";
        }
        catch(Exception $e){
            return "Failed to insert to database: ".$e;
        }


    }


    public static function generateQuestion($totalNumber, $digitPerNumber, $isMixDigit, $operator){

        $quiz = new Quiz();

        $numberArr = QuizGenerator::generateNumber($totalNumber, $digitPerNumber, $isMixDigit);
        $operatorArr = QuizGenerator::generateOperator($totalNumber, $operator);

        $quiz->question_number = serialize($numberArr);
        $quiz->question_operator = serialize($operatorArr);
        $quiz->answer = QuizGenerator::calculateAnswer($numberArr, $operatorArr);

        return $quiz;
    }

    public static function generateNumber($totalNumber, $digitPerNumber, $isMixDigit){

        $numberArr = [];

        for($i = 0; $i<$totalNumber; $i++){
            if($isMixDigit===true){
                array_push($numberArr, rand(0,pow(10,$digitPerNumber)-1));
            }
            else{
                array_push($numberArr, rand(pow(10,$digitPerNumber-1),pow(10,$digitPerNumber)-1));
            }
        }

        return $numberArr;
    }

    public static function generateOperator($totalNumber, $operator){

        $operatorArr = [];

        for($i = 0; $i<$totalNumber-1; $i++){
            $thisOperator = match($operator[array_rand($operator)]){
                1=>"+",
                2=>"-",
                3=>"*",
                4=>"/",
            };

            array_push($operatorArr, $thisOperator);
        }

        return $operatorArr;
    }



    public static function calculateAnswer($numberArr, $operatorArr){

        if(count($numberArr)!==count($operatorArr)+1){
            throw new IncompleteNumberOrOperatorException(message: "The amount of number and operator do not compatible with each other.
            The number array has ".count($numberArr)." members but The operator array has ".count($operatorArr)." members.");
        }
        else{
            $tempNumberArr = [];
            $tempOperatorArr = [];
            $tempNumber = null;

            while(count($operatorArr)>0){
                $currentOperator = array_shift($operatorArr);

                if($currentOperator == "*" || $currentOperator == "/"){
                    if($tempNumber==null){
                        $tempNumber = array_shift($numberArr);
                    }

                    $currentNumber = array_shift($numberArr);
                    switch($currentOperator){
                        case "*": $tempNumber = $tempNumber*$currentNumber; break;
                        case "/": $tempNumber = $tempNumber/$currentNumber; break;
                    }
                }
                else{
                    if($tempNumber!=null){
                        array_push($tempNumberArr, $tempNumber);
                        $tempNumber=null;
                    }
                    else{
                        array_push($tempNumberArr, array_shift($numberArr));
                    }
                    array_push($tempOperatorArr, $currentOperator);
                }
            }

            if(count($numberArr)>0){
                array_push($tempNumberArr, array_shift($numberArr));
            }
            if($tempNumber!=null){
                array_push($tempNumberArr, $tempNumber);
                $tempNumber=null;
            }

            $answer = $tempNumberArr[0];

            for($i = 0; $i < count($tempOperatorArr); $i++){
                switch($tempOperatorArr[$i]){
                    case "+": $answer += $tempNumberArr[$i+1]; break;
                    case "-": $answer -= $tempNumberArr[$i+1]; break;
                }
            }
            return $answer;
        }

    }

}
