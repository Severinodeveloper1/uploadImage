<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('storage_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bucket_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('original_name');
            $table->string('filename')->unique();
            $table->string('path');
            $table->string('folder')->nullable();
            $table->string('url');
            $table->unsignedBigInteger('size_bytes');
            $table->string('mime_type');
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->json('metadata')->nullable();
            $table->boolean('is_public')->default(true);
            $table->integer('download_count')->default(0);
            $table->timestamps();

            $table->index('bucket_id');
            $table->index('project_id');
            $table->index('folder');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('storage_files');
    }
};
