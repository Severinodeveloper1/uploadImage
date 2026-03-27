<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ticket_photos', function (Blueprint $table) {
            $table->foreignId('storage_file_id')->nullable()->after('service_ticket_id')
                ->constrained('storage_files')->nullOnDelete();
            $table->string('file_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('ticket_photos', function (Blueprint $table) {
            $table->dropConstrainedForeignId('storage_file_id');
            $table->string('file_path')->nullable(false)->change();
        });
    }
};
