<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GameSetting;

class GameSettingSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'game_key' => 'word_builder',
                'name' => 'Word Builder',
                'description' => 'Arrange scrambled letters to form a word. Build your vocabulary and spelling skills.',
                'enabled' => true,
            ],
            [
                'game_key' => 'reading_detective',
                'name' => 'Reading Detective',
                'description' => 'Read a short paragraph and answer questions. Test your reading comprehension.',
                'enabled' => true,
            ],
            [
                'game_key' => 'math_adventure',
                'name' => 'Math Adventure',
                'description' => 'Solve multiplication and division questions. Improve your mental math.',
                'enabled' => true,
            ],
            [
                'game_key' => 'vocabulary_quest',
                'name' => 'Vocabulary Quest',
                'description' => 'Select the correct meaning of words. Expand your vocabulary.',
                'enabled' => true,
            ],
            [
                'game_key' => 'sentence_builder',
                'name' => 'Sentence Builder',
                'description' => 'Arrange words to form correct sentences. Practice grammar and sentence structure.',
                'enabled' => true,
            ],
            [
                'game_key' => 'fraction_challenge',
                'name' => 'Fraction Challenge',
                'description' => 'Solve fraction questions. Master fractions and problem-solving.',
                'enabled' => true,
            ],
        ];

        foreach ($games as $game) {
            GameSetting::updateOrCreate(
                ['game_key' => $game['game_key']],
                $game
            );
        }
    }
}
