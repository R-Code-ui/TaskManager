import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ScoreFeedback from '@/components/games/ScoreFeedback';
import { GameSetting } from '@/types';

interface Props {
    game: GameSetting;
}

const words = [
    { word: "Enormous", options: ["Small", "Huge", "Slow"], correct: "Huge" },
    { word: "Benevolent", options: ["Kind", "Cruel", "Sad"], correct: "Kind" },
    { word: "Fragile", options: ["Strong", "Breakable", "Heavy"], correct: "Breakable" },
    { word: "Ancient", options: ["Modern", "Old", "New"], correct: "Old" },
    { word: "Swift", options: ["Slow", "Fast", "Quiet"], correct: "Fast" },
];

export default function VocabularyQuest({ game }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState('');

    const current = words[currentIndex];
    const isLast = currentIndex === words.length - 1;

    const checkAnswer = () => {
        if (selected === current.correct) {
            setScore(score + 1);
            setFeedback('✅ Correct!');
        } else {
            setFeedback(`❌ Wrong. The correct meaning is "${current.correct}".`);
        }
        setTimeout(() => {
            if (isLast) {
                setShowResult(true);
            } else {
                setCurrentIndex(currentIndex + 1);
                setSelected('');
                setFeedback('');
            }
        }, 1500);
    };

    if (showResult) {
        return <ScoreFeedback score={score} total={words.length} onRestart={() => window.location.reload()} />;
    }

    return (
        <>
            <Head title={game.name} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>Select the correct meaning of the word</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-sm text-muted-foreground">Question {currentIndex + 1} of {words.length}</div>
                                <div className="text-xl font-semibold">What does "{current.word}" mean?</div>
                            </div>
                            <RadioGroup value={selected} onValueChange={setSelected}>
                                <div className="space-y-2">
                                    {current.options.map((opt) => (
                                        <div key={opt} className="flex items-center space-x-2">
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                            {feedback && <div className="text-center text-sm">{feedback}</div>}
                            <Button onClick={checkAnswer} className="w-full" disabled={!selected}>Submit</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
