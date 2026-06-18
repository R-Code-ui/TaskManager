<?php

use App\Models\ActivityLog;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        $isAdmin = $user->hasRole('admin');

        $recentActivity = ActivityLog::with('user')
            ->when(!$isAdmin, function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard', [
            'recentActivity' => $recentActivity,
        ]);
    })->name('dashboard');

    // Task routes
    Route::resource('tasks', TaskController::class);

    // Message routes
    Route::get('/messages/sent', [MessageController::class, 'sent'])->name('messages.sent');
    Route::post('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('messages.read');
    Route::resource('messages', MessageController::class);

    // Game routes
    Route::get('/games', [GameController::class, 'index'])->name('games.index');
    Route::get('/games/{gameKey}', [GameController::class, 'show'])->name('games.show');
    Route::get('/admin/games', [GameController::class, 'adminIndex'])->name('admin.games.index');
    Route::put('/admin/games/{game}', [GameController::class, 'update'])->name('admin.games.update');
});

require __DIR__.'/settings.php';
