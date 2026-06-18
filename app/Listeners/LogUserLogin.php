<?php

namespace App\Listeners;

use App\Helpers\ActivityHelper;
use Illuminate\Auth\Events\Login;

class LogUserLogin
{
    public function handle(Login $event): void
    {
        ActivityHelper::log($event->user->id, 'logged_in', ['ip' => request()->ip()]);
    }
}
