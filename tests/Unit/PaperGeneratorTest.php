<?php

namespace Tests\Unit;

use App\Models\Paper;
use Tests\TestCase;

class PaperGeneratorTest extends TestCase
{

    public function test_get_paper_data(){
        $idToGenerate = 2;
        $quizzes = Paper::find($idToGenerate)->quiz->all();

        $this->assertNotEmpty($quizzes);
    }

    public function test_paper_generator(){
        $idToGenerate = 2;
        $paper = Paper::findOrFail($idToGenerate);

        $response = $this->get('/paper/generate');
        $content = $response->streamedContent();

        $this->assertNotEmpty($content);

    }
}
