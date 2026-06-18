<?php

namespace App\Services;

use App\Models\User;
use App\Models\GameSetting;
use Illuminate\Support\Facades\DB;

class GameService
{
    /**
     * Record a user's score for a game.
     * Requires a 'game_scores' table with columns: id, user_id, game_key, score, total, metadata (json), created_at.
     */
    public static function recordScore(User $user, string $gameKey, int $score, int $total, array $metadata = []): void
    {
        // If you create the game_scores table, uncomment below:
        /*
        DB::table('game_scores')->insert([
            'user_id' => $user->id,
            'game_key' => $gameKey,
            'score' => $score,
            'total' => $total,
            'metadata' => json_encode($metadata),
            'created_at' => now(),
        ]);
        */
    }

    /**
     * Get the highest score for a specific user in a given game.
     */
    public static function getUserHighScore(User $user, string $gameKey): ?array
    {
        // Uncomment after creating game_scores table
        /*
        return DB::table('game_scores')
            ->where('user_id', $user->id)
            ->where('game_key', $gameKey)
            ->orderByDesc('score')
            ->first();
        */
        return null;
    }

    /**
     * Get the leaderboard for a game (top 10 scores).
     */
    public static function getLeaderboard(string $gameKey, int $limit = 10): array
    {
        // Uncomment after creating game_scores table
        /*
        return DB::table('game_scores')
            ->join('users', 'game_scores.user_id', '=', 'users.id')
            ->select('users.name', 'game_scores.score', 'game_scores.total', 'game_scores.created_at')
            ->where('game_scores.game_key', $gameKey)
            ->orderByDesc('score')
            ->limit($limit)
            ->get()
            ->toArray();
        */
        return [];
    }
}
