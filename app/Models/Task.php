<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'status',
        'user_id',
    ];

    protected $casts = [
        'due_date' => 'date',
        'deleted_at' => 'datetime',
    ];

    // Status constants (optional but helpful)
    const STATUS_PENDING = 'pending';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED = 'completed';

    // Relationship: a Task belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Local scope to filter tasks by status
    public function scopeOfStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Local scope to filter tasks by user ID
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
