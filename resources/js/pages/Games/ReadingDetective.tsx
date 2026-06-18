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

const passages = [
    {
        text: "Sarah loved to read. Every evening, she would sit by the window with a book and a cup of tea. Her favorite stories were about faraway lands and magical creatures.",
        questions: [
            { question: "What did Sarah drink while reading?", options: ["Coffee", "Tea", "Juice"], correct: "Tea" },
            { question: "Where did she sit?", options: ["On the couch", "By the window", "In the garden"], correct: "By the window" },
        ]
    },
    {
        text: "Tom and Jerry were best friends. They played soccer every Saturday. Tom was a fast runner, while Jerry was good at scoring goals.",
        questions: [
            { question: "What sport did they play?", options: ["Basketball", "Soccer", "Tennis"], correct: "Soccer" },
            { question: "Who was good at scoring goals?", options: ["Tom", "Jerry", "Both"], correct: "Jerry" },
        ]
    },
];

export default function ReadingDetective({ game }: Props) {
    const [passageIndex, setPassageIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const currentPassage = passages[passageIndex];
    const totalQuestions = passages.reduce((acc, p) => acc + p.questions.length, 0);

    const handleAnswer = (qIdx: number, value: string) => {
        setAnswers({ ...answers, [qIdx]: value });
    };

    const submitPassage = () => {
        let newScore = score;
        for (let i = 0; i < currentPassage.questions.length; i++) {
            const userAns = answers[i];
            if (userAns && userAns === currentPassage.questions[i].correct) {
                newScore++;
            }
        }
        setScore(newScore);
        if (passageIndex === passages.length - 1) {
            setShowResult(true);
        } else {
            setPassageIndex(passageIndex + 1);
            setAnswers({});
        }
    };

    if (showResult) {
        return <ScoreFeedback score={score} total={totalQuestions} onRestart={() => window.location.reload()} />;
    }

    return (
        <>
            <Head title={game.name} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>Read the passage and answer the questions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="rounded-md bg-muted p-4">
                                <p className="text-sm leading-relaxed">{currentPassage.text}</p>
                            </div>
                            {currentPassage.questions.map((q, idx) => (
                                <div key={idx} className="space-y-2">
                                    <Label>{q.question}</Label>
                                    <RadioGroup
                                        value={answers[idx] || ''}
                                        onValueChange={(val) => handleAnswer(idx, val)}
                                    >
                                        <div className="space-y-1">
                                            {q.options.map((opt) => (
                                                <div key={opt} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={opt} id={`q${idx}_${opt}`} />
                                                    <Label htmlFor={`q${idx}_${opt}`}>{opt}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                            ))}
                            <Button onClick={submitPassage} className="w-full">
                                {passageIndex === passages.length - 1 ? 'Finish' : 'Next Passage'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
