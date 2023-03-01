<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ajuan extends Model
{
    use HasFactory;

    protected $table = 'ajuan';
    protected $primaryKey = 'id_ajuan';
    protected $guarded = [];

    public function users()
    {
        return $this->hasOne(User::class, 'id', 'created_by' );
    }

    public function klasifikasi()
    {
        return $this->hasOne(Klasifikasi::class, 'id_klasifikasi', 'klasifikasi_id' );
    }


}
