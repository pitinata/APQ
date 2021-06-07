<?php

namespace Tests\Unit;

use App\Models\Paper;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PaperGeneratorTest extends TestCase
{
    use DatabaseTransactions;

    public function test_get_paper_data(){
        $quizzes = Paper::first()->quiz->all();

        $this->assertNotEmpty($quizzes);
    }

}
