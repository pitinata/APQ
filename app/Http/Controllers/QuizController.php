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

        $paperInfo['totalQuestion'] = $request->input("totalQuestion");
        $paperInfo['totalNumber'] = $request->input("totalNumber");
        $paperInfo['digitPerNumber'] = $request->input("digitPerNumber");
        $paperInfo['isMixDigit'] = $request->input("isMixDigit");
        $paperInfo['isPositiveOnly'] = $request->input("isPositiveOnly");
        $paperInfo['operator'] = $request->input("operator");

        for($i = 0; $i<$paperInfo['totalQuestion']; $i++){

            $passFlag = false;

            while($passFlag == false){
                $quiz = QuizGenerator::generateQuestion(
                    $paperInfo['totalNumber'],
                    $paperInfo['digitPerNumber'],
                    $paperInfo['isMixDigit'],
                    $paperInfo['operator']
                );

                $passFlag = QuizGenerator::checkPositive($quiz->answer, $paperInfo['isPositiveOnly']);
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

            $paperInfo['paperId'] = $returnedPaperId;

            return Inertia::render('Quiz/GenerateFormResult', [
                'paperInfo' => $paperInfo
            ]);
        }
        catch(Exception $e){
            return "Failed to insert to database: ".$e;
        }

    }

}
