<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class QuizGenerateFormTest extends DuskTestCase
{
    public function testGenerateFormPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs(User::findOrFail(1))
                    ->visit('/quiz/form')
                    ->type('totalQuestion', '2')
                    ->type('totalNumber','2')
                    ->type('digitPerNumber','2')
                    ->click('#headlessui-switch-1')
                    ->click('#headlessui-switch-2')
                    ->check('#plus')
                    ->check('#minus')
                    ->press('GENERATE')
                    ->waitForText('Generate Successful')
                    ->assertPathIs('/quiz/generate')
                    ->assertSee('2 Question(s)')
                    ->assertSee('N1 * N2')
                    ->assertSee('≥ 0')
                    ->assertSee('1-99')
                    ->assertSeeIn('#plus.bg-yellow-100', '+')
                    ->assertSeeIn('#minus.bg-yellow-100', '−')
                    ->assertSeeIn('#multiply.bg-white', '×')
                    ->assertSeeIn('#divide.bg-white', '÷')
                    ->press('GENERATE PDF FILE');
        });
    }
}
