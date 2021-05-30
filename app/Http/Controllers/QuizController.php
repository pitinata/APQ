<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuizController extends Controller
{

    public function create()
    {
        return Inertia::render('Quiz/GenerateForm');
    }

    public function generate(Request $request)
    {
        $request->validate([
            'totalQuestion' => 'required|integer|min:1|max:100',
            'totalNumber' => 'required|integer|min:2|max:4',
            'digitPerNumber' => 'required|integer|min:1|max:2',
            'operator' => 'required|array|min:1',
        ]);

        $quizzes = [];

        $totalQuestion=$request->input("totalQuestion");
        $totalNumber=$request->input("totalNumber");
        $digitPerNumber=$request->input("digitPerNumber");
        $isMixDigit=$request->input("isMixDigit");
        $isPositiveOnly=$request->input("isPositiveOnly");
        $operator=$request->input("operator");

        for($i = 0; $i<$totalQuestion; $i++){

            $passFlag = false;

            while($passFlag == false){
                $quiz = QuizGenerator::generateQuestion(
                    $totalNumber,
                    $digitPerNumber,
                    $isMixDigit,
                    $operator
                );

                $passFlag = QuizGenerator::checkPositive($quiz->answer, $isPositiveOnly);
            }

            array_push($quizzes, $quiz);
        }

        try {
            $returnedPaperId = DB::transaction(function () use ($quizzes) {
                $paper = new Paper();
                $paper->save();

                foreach($quizzes as $quiz){
                    $quiz->paper_id = $paper->paper_id;
                    $quiz->save();
                }

                return $paper->paper_id;
            });

            return "Generate successful.";
        }
        catch(Exception $e){
            return "Failed to insert to database: ".$e;
        }

    }

}
