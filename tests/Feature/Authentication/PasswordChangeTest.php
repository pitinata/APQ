<?php

namespace Tests\Feature\Authentication;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class PasswordChangeTest extends TestCase
{
    use DatabaseTransactions;

    public function test_password_change(){
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('user/change-password', [
            'oldPassword' => 'password',
            'newPassword' => 'newpassword',
            'newPassword_confirmation' => 'newpassword',
        ]);

        Auth::guard('web')->logout();
        $this->assertGuest();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'newpassword',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);



    }
}
