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

        if(auth()->user()->id == $paper->user_id){
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
        }
        else{
            abort(403, "You don't have access to this file.");
        }

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

    public function view($paperId){
        $paper = Paper::findOrFail($paperId);
        $quizzes = $paper->quiz->all();

        foreach($quizzes as $key=>$quiz){
            $quiz->quizNumber = $key+1;
            $quiz->quizString = QuizGenerator::serializedQuestionToString($quiz->question_number,$quiz->question_operator);
        }

        $setting["showAnswer"] = true;

        return view('pdf.page', [
            'paper'=> $paper,
            'quizzes'=> $quizzes,
            'setting'=> $setting,
        ]);
    }

    public function list(){

        $paperLists = Paper::where('user_id', auth()->user()->id)->orderByDesc('paper_id')->paginate(10)->onEachSide(2);

        $paperLists->load('quiz');

        return Inertia::render('Paper/List', [
            'paperLists' => $paperLists,
        ]);
    }


}
