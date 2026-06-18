<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;

class MessagePolicy
{
    public function view(User $user, Message $message): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $user->id === $message->sender_id || $user->id === $message->receiver_id;
    }

    public function delete(User $user, Message $message): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $user->id === $message->sender_id;
    }

    // Add this method to allow authenticated users to create messages
    public function create(User $user): bool
    {
        return true; // All logged-in users can send messages
    }
}
