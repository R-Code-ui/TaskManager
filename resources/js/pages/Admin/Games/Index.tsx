import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GameSetting } from '@/types';
import { Save, RefreshCw } from 'lucide-react';

interface AdminGamesProps {
    games: GameSetting[];
}

export default function AdminGamesIndex({ games }: AdminGamesProps) {
    const [localGames, setLocalGames] = useState(games);
    const [saving, setSaving] = useState<number | null>(null);

    const handleToggle = (gameId: number, currentEnabled: boolean) => {
        // Optimistically update UI
        setLocalGames(prev =>
            prev.map(g =>
                g.id === gameId ? { ...g, enabled: !currentEnabled } : g
            )
        );

        // Send update to server
        setSaving(gameId);
        router.put(`/admin/games/${gameId}`, { enabled: !currentEnabled }, {
            preserveScroll: true,
            onError: () => {
                // Revert on error
                setLocalGames(prev =>
                    prev.map(g =>
                        g.id === gameId ? { ...g, enabled: currentEnabled } : g
                    )
                );
                alert('Failed to update game status.');
            },
            onFinish: () => setSaving(null),
        });
    };

    return (
        <>
            <Head title="Manage Games" />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Manage Games</h1>
                        <Button variant="outline" onClick={() => router.reload()}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {localGames.map((game) => (
                            <Card key={game.id}>
                                <CardHeader className="pb-2">
                                    <CardTitle>{game.name}</CardTitle>
                                    <CardDescription>{game.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Status: {game.enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <Switch
                                                checked={game.enabled}
                                                onCheckedChange={() => handleToggle(game.id, game.enabled)}
                                                disabled={saving === game.id}
                                            />
                                            {saving === game.id && (
                                                <Save className="h-4 w-4 animate-pulse text-muted-foreground" />
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
