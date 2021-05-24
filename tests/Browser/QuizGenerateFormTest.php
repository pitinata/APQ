<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class QuizGenerateFormTest extends DuskTestCase
{
    public function testGenerateFormPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/quiz/form')
                    ->type('totalQuestion', '2')
                    ->type('totalNumber','2')
                    ->type('digitPerNumber','2')
                    ->check('isMixDigit')
                    ->check('isPositiveOnly')
                    ->check('operator[0]')
                    ->check('operator[1]')
                    ->press('generate')
                    ->assertSee('Generate successful.');
        });
    }
}
