<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_key',
        'name',
        'enabled',
        'description',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];

    // Helper method to check if a game is enabled by its key
    public static function isEnabled(string $gameKey): bool
    {
        $game = self::where('game_key', $gameKey)->first();
        return $game ? $game->enabled : false;
    }

    // Get all enabled games
    public static function enabledGames()
    {
        return self::where('enabled', true)->get();
    }
}
