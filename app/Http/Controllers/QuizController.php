<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{

    public function create()
    {
        return view('generate.generateForm');
    }

    public function generate(Request $request)
    {
        $request->validate([
            'totalQuestion' => 'required|integer|min:1|max:1000',
            'totalNumber' => 'required|integer|min:2|max:5',
            'digitPerNumber' => 'required|integer|min:1|max:10',
            'isMixDigit' => 'required|boolean',
            'operator' => 'required|array|min:1',
        ]);

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
