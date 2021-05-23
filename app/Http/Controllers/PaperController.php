<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Services\Pdf;
use Illuminate\Http\Request;

class PaperController extends Controller
{
    protected $pdf;

    public function __construct(Pdf $pdf){
        $this->pdf = $pdf;
    }

    public function show(){

        $paper = Paper::findOrFail(20);
        $quizzes = $paper->quiz->all();

        foreach($quizzes as $key=>$quiz){
            $quiz->quizNumber = $key+1;
            $quiz->quizString = QuizGenerator::serializedQuestionToString($quiz->question_number,$quiz->question_operator);
        }

        $setting["showAnswer"] = true;

        return response($this->pdf->render('pdf.page', [
            'paper'=> $paper,
            'quizzes'=> $quizzes,
            'setting'=> $setting,
        ]), 200)->withHeaders([
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => ("attachment; filename='question-{$paper->paper_id}.pdf'"),
        ]);

        // $pdf = PDF::loadView('pdf.page', [
        //         'paper'=> $paper,
        //         'quizzes'=> $quizzes,
        //         'setting'=> $setting,
        //     ]);

        // return view('pdf.page',[
        //     'paper'=> $paper,
        //     'quizzes'=> $quizzes,
        //     'setting'=> $setting,
        // ]);
    }

    public function generate(Request $request)
    {
        $request->validate([
            'paperId' => 'required|integer|min:1',
        ]);

        $paper = Paper::findOrFail($request->get("paperId"));
        $quizzes = $paper->quiz->all();

    }
}
