<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('buckets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->boolean('is_public')->default(true);
            $table->json('allowed_mime_types')->nullable();
            $table->integer('max_file_size_mb')->default(5);
            $table->integer('file_count')->default(0);
            $table->unsignedBigInteger('total_size_bytes')->default(0);
            $table->timestamps();

            $table->unique(['project_id', 'slug']);
            $table->index('project_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buckets');
    }
};
