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

        $validatedData = $request->validate([
            'name'=> 'required|max:50',
            'username'=> 'required|max:50',
            'email'=> 'email|required',
            'role_id' => 'required',
            'profile_picture' => 'image|file|required|max:2048'
        ]);

        if($request->file('profile_picture')) {
            $validatedData['profile_picture'] = $request->file('profile_picture')->store('profile_picture');
        }

        $validatedData ['password'] = Hash::make('qwerty');

        User::create($validatedData);
        return redirect ('/user/index');
    }
}

