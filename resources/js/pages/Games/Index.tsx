import { Head, Link } from '@inertiajs/react';
import { GameSetting } from '@/types';
import GameCard from '@/components/games/GameCard';

interface IndexProps {
    games: GameSetting[];
    isAdmin: boolean;
}

export default function Index({ games, isAdmin }: IndexProps) {
    return (
        <>
            <Head title="Games" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Learning Games</h1>
                        {isAdmin && (
                            <Link
                                href="/admin/games"
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                Manage Games →
                            </Link>
                        )}
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {games.map((game) => (
                            <GameCard key={game.game_key} game={game} isAdmin={isAdmin} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
