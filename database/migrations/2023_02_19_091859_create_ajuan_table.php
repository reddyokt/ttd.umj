<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ajuan', function (Blueprint $table) {
            $table->id('id_ajuan');
            $table->foreignId('created_by');
            $table->foreignId('klasifikasi_id');
            $table->text('perihal_surat');
            $table->string('tujuan_surat');
            $table->enum('jenis_surat',['internal', 'external']);
            $table->text('revisi')->nullable();
            $table->string('file_surat')->nullable();
            $table->string('nomor_surat')->nullable();
            $table->date('tanggal_surat')->nullable();
            $table->enum('status',['Menunggu', 'Diterima', 'Ditolak'])->default('Menunggu');
            $table->string('token')->unique();
            $table->foreignId('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ajuan');
    }
};
