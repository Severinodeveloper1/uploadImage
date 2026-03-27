<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRepairRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('tickets.edit');
    }

    public function rules(): array
    {
        $rules = [
            'client_approved_repair' => ['required', 'boolean'],
        ];

        if ($this->boolean('client_approved_repair')) {
            $rules['repair_details'] = ['required', 'string'];
            $rules['final_description'] = ['required', 'string'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'repair_details.required' => 'Los detalles de reparación son obligatorios cuando se aprueba la reparación.',
            'final_description.required' => 'La descripción final es obligatoria cuando se aprueba la reparación.',
        ];
    }
}
