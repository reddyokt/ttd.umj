<?php

namespace App\Http\Controllers;

use App\Models\Ajuan;
use App\Models\Klasifikasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Dirape\Token\Token;

class AjuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        $klas = Klasifikasi::where('is_active', 'Aktif')->get();

        return view ('ajuan.create', compact ('klas'));
    }

    public function store(Request $request)
    {
    //dd($request->toArray());

    $tanggal_surat = \DateTime::createFromFormat('m/d/Y', $request->tanggal_surat);
    $newtanggal_surat = $tanggal_surat->format('Y-m-d');

    $validatedData = $request->validate([
        'created_by'=> 'required',
        'klasifikasi_id'=> 'required',
        'perihal_surat' => 'required|max:2048',
        'tujuan_surat' => 'required',
        'jenis_surat' => 'required',
        'nomor_surat' => 'required',
        'file_surat' => 'file|mimes:doc,docx,pdf|required|max:100000'
    ]);

    if($request->file('file_surat')) {
        $validatedData['file_surat'] = $request->file('file_surat')->store('file_surat');
    }

    $validatedData ['tanggal_surat'] = $newtanggal_surat;
    $validatedData ['token'] = (new Token())->unique('ajuan', 'token', 15);

    Ajuan::create($validatedData);

       return redirect ('/dashboard')->with('success', 'Permohonan Tanda Tangan berhasil ditambahkan');
    }

    public function accept($id_ajuan)
    {
        $accept = Ajuan::find($id_ajuan);
        $accept->update(['status'=>'Diterima']);

        return redirect ('/dashboard')->with('success', 'Permohonan Tanda Tangan disetujui');
    }

    public function reject(Request $request, $id_ajuan)
    {
        //dd($request->toArray());
        $reject = Ajuan::find($id_ajuan);
        $reject->update([
                        'status'=>'Ditolak',
                        'revisi' => $request->revisi,
                        ]);

        return redirect ('/dashboard')->with('success', 'Permohonan ini telah ditolak');
    }

    public function showtoken($id_ajuan)
    {
        $data = Ajuan ::find($id_ajuan);

        return view ('showQR.page', compact ('data'));
    }

    public function edit($id_ajuan)
    {
        $klas = Klasifikasi::where('is_active', 'Aktif')->get();
        $edit = Ajuan::find($id_ajuan);

        //dd($edit);

        return view ('ajuan.edit', compact ('edit','klas'));
    }

    public function storeedit(Request $request, $id_ajuan)

    {

        //dd($request->toArray());
        $storeedit = Ajuan::find($id_ajuan);
        if($request->file('file_surat')) {
            $storeedit['file_surat'] = $request->file('file_surat')->store('file_surat');
        }
        $storeedit->update([
            'status' => $request->status,
            'tanggal_surat' => $request->tanggal_surat,
            'klasifikasi_id' => $request->klasifikasi_id,
            'perihal_surat' => $request->perihal_surat,
            'tujuan_surat' => $request->tujuan_surat,
            'jenis_surat' => $request->jenis_surat,
            'nomor_surat' => $request->nomor_surat,
    ]);


           return redirect ('/dashboard')->with('success', 'Permohonan Tanda Tangan berhasil diubah');
    }
}
