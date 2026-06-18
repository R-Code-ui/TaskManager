import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ScoreFeedbackProps {
    score: number;
    total: number;
    onRestart: () => void;
    showRetry?: boolean;
}

export default function ScoreFeedback({ score, total, onRestart, showRetry = true }: ScoreFeedbackProps) {
    const percentage = (score / total) * 100;
    const passed = percentage >= 70;

    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle className="flex justify-center">
                    {passed ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                        <XCircle className="h-8 w-8 text-red-500" />
                    )}
                </CardTitle>
                <CardDescription>Your Score</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">
                    {score} / {total}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                    {percentage}% – {passed ? 'Great job!' : 'Keep practicing!'}
                </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
                {showRetry && (
                    <Button variant="outline" onClick={onRestart}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                )}
                <Link href="/games">
                    <Button variant="default">
                        <Home className="mr-2 h-4 w-4" /> More Games
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
