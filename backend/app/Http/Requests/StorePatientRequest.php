<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'regex:/^[a-zA-Z\s]+$/'],
            'email' => ['required', 'email', 'ends_with:@gmail.com', 'unique:patients,email'],
            'phone_country_code' => ['required', 'regex:/^\+\d+$/'],
            'phone_number' => ['required', 'numeric'],
            'document_photo' => ['required', 'image', 'mimes:jpg,jpeg'],
        ];
    }
}
