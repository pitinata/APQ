<?php

namespace Tests\Unit;

use App\Models\Paper;
use Tests\TestCase;

class PaperGeneratorTest extends TestCase
{

    public function test_get_paper_data(){
        $quizzes = Paper::first()->quiz->all();

        $this->assertNotEmpty($quizzes);
    }

}
