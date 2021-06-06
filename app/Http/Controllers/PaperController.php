<?php

namespace App\Http\Controllers;

use App\Models\Paper;
use App\Services\Pdf;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaperController extends Controller
{
    protected $pdf;

    public function __construct(Pdf $pdf){
        $this->pdf = $pdf;
    }

    public function create()
    {
        $papers = Paper::all();
        return view('generate.paper.generateForm', [
            'papers' => $papers,
        ]);
    }

    public function generate(Request $request, $paperId){

        $paper = Paper::findOrFail($paperId);
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
        ]), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => ("attachment; filename=question-{$paper->paper_id}.pdf"),
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


}
