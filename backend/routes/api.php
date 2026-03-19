<?php

use App\Http\Controllers\Api\PatientController;
use Illuminate\Support\Facades\Route;

Route::get('/patients', [PatientController::class, 'index']);
Route::post('/patients', [PatientController::class, 'store']);