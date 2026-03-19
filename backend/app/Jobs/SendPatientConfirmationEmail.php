<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use App\Models\Patient;

class SendPatientConfirmationEmail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Patient $patient)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::raw(
            "Hello {$this->patient->full_name}, your registration was successful!",
            function ($message) {
                $message->to($this->patient->email)
                        ->subject('Patient Registration Confirmation');
            }
        );
    }
}
