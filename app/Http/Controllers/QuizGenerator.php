<?php

namespace App\Http\Controllers;

use App\Exceptions\IncompleteNumberOrOperatorException;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizGenerator extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


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
                "1"=>"+",
                "2"=>"-",
                "3"=>"*",
                "4"=>"/",
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
