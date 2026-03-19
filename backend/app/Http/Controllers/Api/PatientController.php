<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;
use Illuminate\Support\Facades\Storage;
use App\Jobs\SendPatientConfirmationEmail;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::latest()->get();
    }

    public function store(StorePatientRequest $request)
    {
        $path = $request->file('document_photo')->store('documents', 'public');

        $patient = Patient::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_country_code' => $request->phone_country_code,
            'phone_number' => $request->phone_number,
            'document_photo_path' => $path,
        ]);

        SendPatientConfirmationEmail::dispatch($patient);

        return response()->json($patient, 201);
    }
}
