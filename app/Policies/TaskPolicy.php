<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function view(User $user, Task $task): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $user->id === $task->user_id;
    }

    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create tasks');
    }

    public function update(User $user, Task $task): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $user->id === $task->user_id && $user->hasPermissionTo('edit tasks');
    }

    public function delete(User $user, Task $task): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }
        return $user->id === $task->user_id && $user->hasPermissionTo('delete tasks');
    }
}
