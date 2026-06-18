<?php

namespace App\Policies;

use App\Models\GameSetting;
use App\Models\User;

class GamePolicy
{
    public function viewAny(User $user): bool
    {
        // All authenticated users can view the list of enabled games
        return true;
    }

    public function view(User $user, GameSetting $game): bool
    {
        // Admins can view all; regular users only enabled games
        if ($user->can('manage games')) return true;
        return $game->enabled && $user->can('view games');
    }

    public function manage(User $user): bool
    {
        return $user->can('manage games');
    }

    public function update(User $user, GameSetting $game): bool
    {
        return $user->can('manage games');
    }
}
