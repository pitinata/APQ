<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ChangePasswordController extends Controller
{
    public function form(Request $request){
        return Inertia::render('Auth/ChangePassword');
    }

    public function store(Request $request){
        $validator = $request->validate([
            'oldPassword' => ['required'],
            'newPassword' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if(Hash::check($request->input('oldPassword'), Auth::user()->password)){
            $user = Auth::user();
            $user->password = Hash::make($request->input('newPassword'));
            $user->remember_token = Str::random(60);
            $user->save();

            return Redirect::route('user.password.form')->with('success', 'Password has been changed.');
        }
        else{
            return Redirect::route('user.password.form')->with('failed', 'The original password is not correct. Please try again.');
        }
    }
}
