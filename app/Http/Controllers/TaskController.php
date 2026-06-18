<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $tasks = Task::with('user')->latest()->paginate(10);
        } else {
            $tasks = Task::where('user_id', $user->id)->latest()->paginate(10);
        }

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'canCreate' => $user->can('create tasks'),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Task::class);
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Task::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        auth()->user()->tasks()->create($validated);

        return redirect()->route('tasks.index')->with('success', 'Task created.');
    }

    public function show(Task $task): Response
    {
        Gate::authorize('view', $task);
        return Inertia::render('Tasks/Show', ['task' => $task->load('user')]);
    }

    public function edit(Task $task): Response
    {
        Gate::authorize('update', $task);
        return Inertia::render('Tasks/Edit', ['task' => $task]);
    }

    public function update(Request $request, Task $task)
    {
        Gate::authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $task->update($validated);
        return redirect()->route('tasks.index')->with('success', 'Task updated.');
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Task deleted.');
    }
}
