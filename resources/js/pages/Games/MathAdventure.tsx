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
    { text: "6 × 7 = ?", answer: "42" },
    { text: "81 ÷ 9 = ?", answer: "9" },
    { text: "12 × 8 = ?", answer: "96" },
    { text: "56 ÷ 7 = ?", answer: "8" },
    { text: "9 × 9 = ?", answer: "81" },
];

export default function MathAdventure({ game }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState('');

    const current = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const checkAnswer = () => {
        if (userAnswer.trim() === current.answer) {
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
                            <CardDescription>Solve multiplication and division problems</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</div>
                                <div className="text-2xl font-bold">{current.text}</div>
                            </div>
                            <Input
                                type="number"
                                placeholder="Your answer"
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
