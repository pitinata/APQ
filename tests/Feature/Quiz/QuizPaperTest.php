<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class QuizPaperTest extends TestCase
{
    use DatabaseTransactions;

    public function test_guest_cannot_download_quiz_paper(){
        $response = $this->post('/paper/generate',[
            'paperId' => 1,
        ]);

        $response->assertRedirect('/login');
    }

    public function test_user_can_download_quiz_paper(){
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/paper/generate',[
            'paperId' => 1,
        ]);

        $response->assertOk();
        $this->assertTrue($response->headers->get('content-type') == 'application/pdf');

    }
}
