<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class PaperGenerateFormTest extends DuskTestCase
{
    public function testGenerateFormPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/paper/form')
                    ->select('paperId', '2')
                    ->press('Download')
                    ->assertSee('stream');
        });
    }
}
