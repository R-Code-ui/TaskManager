<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Helpers\ActivityHelper;  // 👈 ADDED
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $messages = Message::with(['sender', 'receiver'])
                ->latest()
                ->paginate(15);
        } else {
            $messages = Message::where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id)
                ->with(['sender', 'receiver'])
                ->latest()
                ->paginate(15);
        }

        return Inertia::render('Messages/Inbox', [
            'messages' => $messages,
        ]);
    }

    public function sent(): Response
    {
        $user = auth()->user();

        $messages = Message::where('sender_id', $user->id)
            ->with('receiver')
            ->latest()
            ->paginate(15);

        return Inertia::render('Messages/Sent', [
            'messages' => $messages,
        ]);
    }

    public function create(): Response
    {
        $users = User::where('id', '!=', auth()->id())->get(['id', 'name', 'username']);
        return Inertia::render('Messages/Compose', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'parent_id' => 'nullable|exists:messages,id',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $validated['receiver_id'],
            'subject' => $validated['subject'],
            'body' => $validated['body'],
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        // 👇 ADDED – Log message sent
        ActivityHelper::log(auth()->id(), 'message_sent', [
            'message_id' => $message->id,
            'receiver_id' => $validated['receiver_id'],
            'subject' => $validated['subject'],
        ]);

        return redirect()->route('messages.index')
            ->with('success', 'Message sent successfully.');
    }

    public function show(Message $message): Response
    {
        Gate::authorize('view', $message);

        if (!auth()->user()->hasRole('admin') && $message->receiver_id === auth()->id()) {
            $message->markAsRead();
        }

        return Inertia::render('Messages/Show', [
            'message' => $message->load(['sender', 'receiver', 'replies.sender']),
        ]);
    }

    public function destroy(Message $message)
    {
        Gate::authorize('delete', $message);
        $message->delete();

        return redirect()->back()->with('success', 'Message deleted.');
    }

    public function markAsRead(Message $message)
    {
        Gate::authorize('view', $message);

        if ($message->receiver_id === auth()->id()) {
            $message->markAsRead();
        }

        return redirect()->back()->with('success', 'Message marked as read.');
    }
}
