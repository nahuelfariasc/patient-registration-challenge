<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'full_name',
        'email',
        'phone_country_code',
        'phone_number',
        'document_photo_path',
    ];
}
