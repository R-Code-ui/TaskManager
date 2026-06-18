<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'subject',
        'body',
        'is_read',
        'parent_id',
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    // Relationship: sender
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Relationship: receiver
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    // Relationship: parent message (for replies)
    public function parent()
    {
        return $this->belongsTo(Message::class, 'parent_id');
    }

    // Relationship: replies to this message
    public function replies()
    {
        return $this->hasMany(Message::class, 'parent_id');
    }

    // Mark as read
    public function markAsRead()
    {
        if (!$this->is_read) {
            $this->update(['is_read' => true]);
        }
    }
}
