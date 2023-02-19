<?php

namespace App\Http\Controllers;

use App\Models\Ajuan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AjuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {

        return view ('ajuan.create');
    }

    public function store(Request $request)
    {
    //dd($request->toArray());
    $tanggal_surat = \DateTime::createFromFormat('m/d/Y', $request->tanggal_surat);
    $newtanggal_surat = $tanggal_surat->format('Y-m-d');

    $ajuan = Ajuan::create([
    'nama_surat' => $request->nama_surat,
    'surat_untuk'=> $request->surat_untuk,
    'perihal_surat'=> $request->perihal_surat,
    'jenis_surat'=> $request->jenis_surat,
    'nomor_surat'=>$request->nomor_surat,
    'tanggal_surat' => $newtanggal_surat,
    ]);

       return redirect ('/dashboard')->with('success', 'Permohonan Tanda Tangan berhasil ditambahkan');
    }
}
