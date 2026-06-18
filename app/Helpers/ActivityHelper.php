<?php

namespace App\Helpers;

use App\Models\ActivityLog;

class ActivityHelper
{
    public static function log($userId, $action, $details = []): void
    {
        ActivityLog::create([
            'user_id' => $userId,
            'action' => $action,
            'details' => $details,
        ]);
    }
}
