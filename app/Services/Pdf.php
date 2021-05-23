<?php

namespace App\Services;

use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Pdf{

    public function render($viewName, $data){
        $view = View::make($viewName,$data)->render();

        $path = tempnam(sys_get_temp_dir(), Str::random());

        $process = new Process([
            "google-chrome",
            "--no-sandbox",
            "--headless",
            "--print-to-pdf-no-header",
            "--print-to-pdf=".$path,
            'data:text/html,'.rawurlencode($view)
        ], "/");

        try{
            $process->mustRun();

            return File::get($path);
        }catch(ProcessFailedException $exception){
            echo $exception;
        }
    }

}

?>
