<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // All authenticated users can send messages
    }

    public function rules(): array
    {
        return [
            'receiver_id' => 'required|exists:users,id|different:sender_id',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:messages,id',
        ];
    }

    public function messages(): array
    {
        return [
            'receiver_id.different' => 'You cannot send a message to yourself.',
        ];
    }
}
