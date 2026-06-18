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

const levels = [
    { scrambled: 'P P L E A', answer: 'APPLE', hint: 'A fruit that keeps the doctor away' },
    { scrambled: 'B N A A N A', answer: 'BANANA', hint: 'A yellow fruit' },
    { scrambled: 'C O P M U R E T', answer: 'COMPUTER', hint: 'Device you are using' },
    { scrambled: 'L B R A I R Y', answer: 'LIBRARY', hint: 'Place with many books' },
    { scrambled: 'T E C H A R E', answer: 'TEACHER', hint: 'Educator' },
];

export default function WordBuilder({ game }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState('');

    const current = levels[currentIndex];
    const isLast = currentIndex === levels.length - 1;

    const checkAnswer = () => {
        if (userAnswer.trim().toUpperCase() === current.answer) {
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
        return <ScoreFeedback score={score} total={levels.length} onRestart={() => window.location.reload()} />;
    }

    return (
        <>
            <Head title={game.name} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>Unscramble the letters to form a word</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-sm text-muted-foreground">Question {currentIndex + 1} of {levels.length}</div>
                                <div className="text-3xl font-mono tracking-wider">{current.scrambled}</div>
                                <div className="mt-2 text-sm text-muted-foreground">Hint: {current.hint}</div>
                            </div>
                            <Input
                                placeholder="Type your answer"
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
