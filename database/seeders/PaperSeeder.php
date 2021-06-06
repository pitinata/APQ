<?php

namespace Database\Seeders;

use App\Models\Paper;
use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Paper::factory()
        ->withUserId(1)
        ->count(100)
        ->has(Quiz::factory()->count(10))
        ->create();
    }
}
