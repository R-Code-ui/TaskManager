import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ScoreFeedback from '@/components/games/ScoreFeedback';
import { GameSetting } from '@/types';

interface Props {
    game: GameSetting;
}

const questions = [
    { text: "1/2 + 1/4 = ?", answer: "3/4" },
    { text: "2/3 - 1/6 = ?", answer: "1/2" },
    { text: "3/4 × 2/5 = ?", answer: "3/10" },
    { text: "5/6 ÷ 1/3 = ?", answer: "5/2" },
    { text: "1/2 + 2/3 = ?", answer: "7/6" },
];

export default function FractionChallenge({ game }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState('');

    const current = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const normalizeFraction = (frac: string) => {
        // Remove spaces and convert to simplest form
        return frac.replace(/\s/g, '').toLowerCase();
    };

    const checkAnswer = () => {
        const normalizedUser = normalizeFraction(userAnswer);
        const normalizedCorrect = normalizeFraction(current.answer);
        if (normalizedUser === normalizedCorrect) {
            setScore(score + 1);
            setFeedback('✅ Correct!');
        } else {
            setFeedback(`❌ Wrong. The correct answer is ${current.answer}.`);
        }
        setTimeout(() => {
            if (isLast) {
                setShowResult(true);
            } else {
                setCurrentIndex(currentIndex + 1);
                setUserAnswer('');
                setFeedback('');
            }
        }, 1500);
    };

    if (showResult) {
        return <ScoreFeedback score={score} total={questions.length} onRestart={() => window.location.reload()} />;
    }

    return (
        <>
            <Head title={game.name} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>Solve fraction problems (enter answer as fraction like 3/4)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</div>
                                <div className="text-xl font-bold">{current.text}</div>
                            </div>
                            <Input
                                placeholder="Your answer (e.g., 3/4)"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            />
                            {feedback && <div className="text-center text-sm">{feedback}</div>}
                            <Button onClick={checkAnswer} className="w-full">Submit</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
