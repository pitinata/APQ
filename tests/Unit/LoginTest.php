<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use WithFaker;

    public function test_login_with_incorrect_password(){
        $response = $this->post('/login', [
            'email' => 'a@a.com',
            'password' => '5678'
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHasErrors('email');
        $this->assertTrue(session()->hasOldInput('email'));
        $this->assertFalse(session()->hasOldInput('password'));
        $this->assertGuest();
    }

    public function test_login_with_correct_password(){
        $response = $this->post('/login', [
            'email' => 'a@a.com',
            'password' => '1234'
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticated();
    }

    public function test_logout_procedure(){
        $response = $this->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }

    public function test_register_procedure(){

        $email = $this->faker->email;

        $response = $this->post('/register', [
            'email' => $email,
            'name' => $this->faker->name(),
            'password' => '1234'
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticated();

        $this->assertEquals(User::where('email',$email)->first()->email, $email);
    }

    public function test_password_recovery_page(){

        Notification::fake();

        $user = User::where('email', 'a@a.com')->get();

        $response = $this->post('/password/email', [
            'email' => $user->email
        ]);

        $token = DB::table('password_resets')->first();
        $this->assertNotNull($token);

        Notification::assertSentTo($user,ResetPassword::class,function($notification, $channel) use ($token){
            return Hash::check($notification->token, $token->token) === true;
        });
    }

}
