<?php

namespace App\Http\Controllers;

use App\Models\GameSetting;
use App\Http\Requests\UpdateGameSettingRequest;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    // List all games (regular users see only enabled; admin sees all with toggle controls)
    public function index(): Response
    {
        $user = auth()->user();
        $isAdmin = $user && $user->hasRole('admin');

        if ($isAdmin) {
            $games = GameSetting::orderBy('name')->get();
        } else {
            // Regular users see only enabled games
            $games = GameSetting::where('enabled', true)->orderBy('name')->get();
        }

        return Inertia::render('Games/Index', [
            'games' => $games,
            'isAdmin' => $isAdmin,
        ]);
    }

    // Admin page to manage games (enable/disable)
    public function adminIndex(): Response
    {
        Gate::authorize('manage', GameSetting::class);

        $games = GameSetting::orderBy('name')->get();

        return Inertia::render('Admin/Games/Index', [
            'games' => $games,
        ]);
    }

    // Update a game's enabled status (admin only)
    public function update(GameSetting $game, UpdateGameSettingRequest $request)
    {
        Gate::authorize('update', $game);

        $game->update([
            'enabled' => $request->boolean('enabled'),
        ]);

        return redirect()->back()->with('success', 'Game status updated.');
    }

    // Load a specific game component (play)
    public function show(string $gameKey): Response
    {
        $game = GameSetting::where('game_key', $gameKey)->firstOrFail();

        // Regular users cannot play disabled games
        if (!auth()->user()->hasRole('admin') && !$game->enabled) {
            abort(403, 'This game is currently disabled.');
        }

        // Map game keys to React component names
        $componentMap = [
            'word_builder' => 'Games/WordBuilder',
            'reading_detective' => 'Games/ReadingDetective',
            'math_adventure' => 'Games/MathAdventure',
            'vocabulary_quest' => 'Games/VocabularyQuest',
            'sentence_builder' => 'Games/SentenceBuilder',
            'fraction_challenge' => 'Games/FractionChallenge',
        ];

        $component = $componentMap[$gameKey] ?? 'Games/NotFound';

        return Inertia::render($component, [
            'game' => $game,
        ]);
    }
}
