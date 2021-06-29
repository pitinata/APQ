<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ChangePasswordTest extends DuskTestCase
{
    public function testChangePasswordPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs(User::findOrFail(1))
                    ->visit('/user/change-password')
                    ->type('oldPassword', '12345678')
                    ->type('newPassword', '12345678')
                    ->type('newPassword_confirmation', '12345678')
                    ->press('CHANGE PASSWORD')
                    ->waitForText('Password has been changed.')
                    ->assertValue('[name="oldPassword"]', '')
                    ->type('oldPassword', '123456789')
                    ->type('newPassword', '12345678')
                    ->type('newPassword_confirmation', '12345678')
                    ->press('CHANGE PASSWORD')
                    ->waitForText('The original password is not correct. Please try again.')
                    ->assertValue('[name="oldPassword"]', '');
        });
    }
}
