<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('tickets.create');
    }

    public function rules(): array
    {
        return [
            'company_name' => ['nullable', 'string', 'max:255'],
            'client_name' => ['required', 'string', 'max:255'],
            'document_type_id' => ['required', 'exists:document_types,id'],
            'document_number' => ['required', 'string', 'max:50'],
            'reported_failure' => ['required', 'string'],
            'phone' => ['required', 'string', 'max:30'],
            'service_date' => ['required', 'date'],
            'entry_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'product_name' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'serial_number' => ['required', 'string', 'max:255'],
            'warranty_seals' => ['required', 'in:intacto,roto,sin_sello'],
            'physical_observations' => ['nullable', 'string'],
            // Accesorios (array opcional)
            'accessories' => ['nullable', 'array'],
            'accessories.*.name' => ['required_with:accessories', 'string', 'max:255'],
            'accessories.*.included' => ['boolean'],
            'accessories.*.notes' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'client_name.required' => 'El nombre del cliente es obligatorio.',
            'document_type_id.required' => 'El tipo de documento es obligatorio.',
            'document_number.required' => 'El número de documento es obligatorio.',
            'reported_failure.required' => 'La falla reportada es obligatoria.',
            'phone.required' => 'El teléfono es obligatorio.',
            'service_date.required' => 'La fecha de atención es obligatoria.',
            'entry_date.required' => 'La fecha de ingreso es obligatoria.',
            'start_time.required' => 'La hora de inicio es obligatoria.',
            'product_name.required' => 'El nombre del producto es obligatorio.',
            'model.required' => 'El modelo es obligatorio.',
            'serial_number.required' => 'El número de serie es obligatorio.',
            'warranty_seals.required' => 'El estado de sellos de garantía es obligatorio.',
            'warranty_seals.in' => 'El estado de sellos debe ser: intacto, roto o sin_sello.',
        ];
    }
}
