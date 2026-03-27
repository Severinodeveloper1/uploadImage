<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'DNI', 'code' => 'dni'],
            ['name' => 'RUC', 'code' => 'ruc'],
            ['name' => 'Carné de Extranjería', 'code' => 'ce'],
            ['name' => 'Pasaporte', 'code' => 'pasaporte'],
        ];

        foreach ($types as $type) {
            DocumentType::firstOrCreate(
                ['code' => $type['code']],
                ['name' => $type['name'], 'is_active' => true],
            );
        }
    }
}
