<?php

namespace App\Listeners;

use App\Helpers\ActivityHelper;
use Illuminate\Auth\Events\Logout;

class LogUserLogout
{
    public function handle(Logout $event): void
    {
        if ($event->user) {
            ActivityHelper::log($event->user->id, 'logged_out', ['ip' => request()->ip()]);
        }
    }
}
