<?php

namespace Tests\Feature\Quiz;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GenerateQuizTest extends TestCase
{
    use DatabaseTransactions;

    public function test_guest_cannot_access_quiz_form_page()
    {
        $response = $this->get('/quiz/form');
        $response->assertRedirect('/login');
    }

    public function test_user_can_access_quiz_form_page()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/quiz/form');
        $response->assertStatus(200);
    }

    public function test_guest_cannot_generate_quiz()
    {
        $response = $this->post('/quiz/generate', [
            "totalQuestion" => 10,
            "totalNumber" => 2,
            "digitPerNumber" => 2,
            "isMixDigit" => true,
            "operator" => ["+"]
        ]);
        $response->assertRedirect('/login');
    }

    public function test_user_can_generate_quiz()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/quiz/generate', [
            "totalQuestion" => 10,
            "totalNumber" => 2,
            "digitPerNumber" => 2,
            "isMixDigit" => true,
            "operator" => ["+"]
        ]);
        $response->assertSee("Generate Successful");
        $response->assertStatus(200);
        $response->assertSessionHasNoErrors();
    }
}
