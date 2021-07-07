<?php

namespace Tests\Feature\Quiz;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\Assert;

class QuizPaperTest extends TestCase
{
    use DatabaseTransactions;

    public function test_guest_cannot_download_quiz_paper(){
        $response = $this->get('/paper/generate/1');

        $response->assertRedirect('/login');
    }

    public function test_user_can_download_quiz_paper(){
        $user = User::findOrFail(1);

        $response = $this->actingAs($user)->get('/paper/generate/1');

        $response->assertOk();
        $this->assertTrue($response->headers->get('content-type') == 'application/pdf');

    }

    public function test_user_has_paper_list(){
        $user = User::findOrFail(1);

        $response = $this->actingAs($user)->get('/paper/list');

        $response->assertInertia(fn (Assert $page) => $page
            ->where('paperLists.total', function ($value) {
                return $value > 0;
            })
        );
    }
}
