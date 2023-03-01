<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Illuminate\Http\Request;
use illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {
        return view('login.index');
    }

    public function authenticate(Request $request)
    {
        //dd($request->toArray());
        $credentials = $request->validate([
            'username'=> 'required',
            'password'=> 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->with('loginError', 'Login Gagal!, periksa kembali Username dan Password anda');
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }
}
