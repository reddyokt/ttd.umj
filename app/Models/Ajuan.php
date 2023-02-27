<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ajuan extends Model
{
    use HasFactory;

    protected $table = 'ajuan';
    protected $primaryKey = 'id_ajuan';
    protected $fillable = ['created_by','nama_surat','surat_untuk', 'perihal_surat', 'jenis_surat', 'nomor_surat', 'tanggal_surat', 'status','token'];

    public function user()
    {
        return $this->hasMany(Ajuan::class, 'created_by', 'id');
    }

}
