<?php

namespace App\Http\Controllers;

use App\Models\GameSetting;
use App\Helpers\ActivityHelper;  // 👈 ADDED
use App\Http\Requests\UpdateGameSettingRequest;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $isAdmin = $user && $user->hasRole('admin');

        if ($isAdmin) {
            $games = GameSetting::orderBy('name')->get();
        } else {
            $games = GameSetting::where('enabled', true)->orderBy('name')->get();
        }

        return Inertia::render('Games/Index', [
            'games' => $games,
            'isAdmin' => $isAdmin,
        ]);
    }

    public function adminIndex(): Response
    {
        Gate::authorize('manage', GameSetting::class);

        $games = GameSetting::orderBy('name')->get();

        return Inertia::render('Admin/Games/Index', [
            'games' => $games,
        ]);
    }

    public function update(GameSetting $game, UpdateGameSettingRequest $request)
    {
        Gate::authorize('update', $game);

        $game->update([
            'enabled' => $request->boolean('enabled'),
        ]);

        // 👇 ADDED – Log game status change
        ActivityHelper::log(auth()->id(), 'game_updated', [
            'game_key' => $game->game_key,
            'game_name' => $game->name,
            'enabled' => $game->enabled,
        ]);

        return redirect()->back()->with('success', 'Game status updated.');
    }

    public function show(string $gameKey): Response
    {
        $game = GameSetting::where('game_key', $gameKey)->firstOrFail();

        if (!auth()->user()->hasRole('admin') && !$game->enabled) {
            abort(403, 'This game is currently disabled.');
        }

        // 👇 ADDED – Log game play
        ActivityHelper::log(auth()->id(), 'game_played', [
            'game_key' => $game->game_key,
            'game_name' => $game->name,
        ]);

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
