<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_code')->unique();

            // Datos del cliente
            $table->string('company_name')->nullable();
            $table->string('client_name');
            $table->foreignId('document_type_id')->constrained('document_types');
            $table->string('document_number');
            $table->text('reported_failure');
            $table->string('phone');

            // Datos del servicio
            $table->date('service_date');
            $table->date('entry_date');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->foreignId('technician_id')->constrained('users');

            // Datos del producto
            $table->string('product_name');
            $table->string('model');
            $table->string('serial_number');
            $table->string('warranty_seals'); // intacto, roto, sin_sello

            // Observaciones físicas
            $table->text('physical_observations')->nullable();

            // Conformidad de recepción
            $table->text('reception_client_signature')->nullable();
            $table->text('reception_technician_signature')->nullable();
            $table->timestamp('reception_signed_at')->nullable();

            // Reparación
            $table->boolean('client_approved_repair')->default(false);
            $table->text('repair_details')->nullable();
            $table->text('final_description')->nullable();

            // Conformidad final
            $table->text('delivery_client_signature')->nullable();
            $table->text('delivery_technician_signature')->nullable();
            $table->timestamp('delivery_signed_at')->nullable();

            // Estado
            $table->string('status')->default('draft');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_tickets');
    }
};
