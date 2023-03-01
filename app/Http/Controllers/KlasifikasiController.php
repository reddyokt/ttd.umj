<?php

namespace App\Http\Controllers;

use App\Models\Klasifikasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class KlasifikasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index ()
    {
        $data = Klasifikasi::all();

        return view ('klasifikasi.index', compact ('data'));
    }

    public function create()
    {
        return view ('klasifikasi.create');
    }

    public function store(Request $request)
    {
            //dd($request->toArray());

            $ajuan = Klasifikasi::create([
            'nama_klasifikasi' => $request->nama_klasifikasi,
            ]);

            return redirect ('/klasifikasi/index')->with('success', 'Klasifikasi Surat berhasil dibuat');
    }
}

