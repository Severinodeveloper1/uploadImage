<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('tickets.sign');
    }

    public function rules(): array
    {
        return [
            'client_signature' => ['required', 'string', 'regex:/^data:image\/(png|jpeg|jpg|webp);base64,/'],
            'technician_signature' => ['required', 'string', 'regex:/^data:image\/(png|jpeg|jpg|webp);base64,/'],
        ];
    }

    public function messages(): array
    {
        return [
            'client_signature.required' => 'La firma del cliente es obligatoria.',
            'client_signature.regex' => 'La firma del cliente debe ser una imagen base64 válida.',
            'technician_signature.required' => 'La firma del técnico es obligatoria.',
            'technician_signature.regex' => 'La firma del técnico debe ser una imagen base64 válida.',
        ];
    }
}
