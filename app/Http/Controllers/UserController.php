<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function index ()
    {

        $data = User::all();
        return view ('user.index' , compact ('data'));
    }

    public function create()
    {
        $role = Role::all();
        return view ('user.create', compact ('role'));
    }

    public function store(Request $request)
    {
        //dd($request->toArray());
        $user = User::create([
            'name' => $request->nama,
            'email' => $request->email,
            'role_id'=> $request->role_id,
            'password'=> Hash::make('qwerty'),
            ]);

        return redirect ('/user/index');
    }
}

