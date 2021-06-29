<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class PaperListTest extends DuskTestCase
{
    public function testPaperListPage()
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs(User::findOrFail(1))
                    ->visit('/paper/list')
                    ->assertVisible('table');
        });
    }
}
