import { Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameSetting } from '@/types';
import { Play, Lock } from 'lucide-react';

interface GameCardProps {
    game: GameSetting;
    isAdmin: boolean;
}

export default function GameCard({ game, isAdmin }: GameCardProps) {
    const isEnabled = game.enabled;

    return (
        <Card className="flex flex-col transition-all hover:shadow-md">
            <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex items-center gap-2">
                    {!isEnabled && !isAdmin && (
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Lock className="h-3 w-3" /> Disabled by admin
                        </span>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                {isEnabled || isAdmin ? (
                    <Link href={`/games/${game.game_key}`} className="w-full">
                        <Button className="w-full" variant={isEnabled ? "default" : "outline"}>
                            <Play className="mr-2 h-4 w-4" /> Play
                        </Button>
                    </Link>
                ) : (
                    <Button disabled className="w-full" variant="outline">
                        <Lock className="mr-2 h-4 w-4" /> Unavailable
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
