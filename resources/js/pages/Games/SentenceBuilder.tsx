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

const sentences = [
    { words: "school / I / to / walk", answer: "I walk to school." },
    { words: "playing / like / they / football", answer: "They like playing football." },
    { words: "is / beautiful / the / day", answer: "The day is beautiful." },
    { words: "read / every / I / night / a book", answer: "I read a book every night." },
    { words: "my / is / sister / kind", answer: "My sister is kind." },
];

export default function SentenceBuilder({ game }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState('');

    const current = sentences[currentIndex];
    const isLast = currentIndex === sentences.length - 1;

    const checkAnswer = () => {
        const normalizedUser = userAnswer.trim().toLowerCase().replace(/\.$/, '');
        const normalizedCorrect = current.answer.toLowerCase().replace(/\.$/, '');
        if (normalizedUser === normalizedCorrect) {
            setScore(score + 1);
            setFeedback('✅ Correct!');
        } else {
            setFeedback(`❌ Wrong. The correct sentence is: "${current.answer}"`);
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
        return <ScoreFeedback score={score} total={sentences.length} onRestart={() => window.location.reload()} />;
    }

    return (
        <>
            <Head title={game.name} />
            <div className="py-6">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{game.name}</CardTitle>
                            <CardDescription>Arrange the words into a correct sentence</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-center">
                                <div className="mb-2 text-sm text-muted-foreground">Question {currentIndex + 1} of {sentences.length}</div>
                                <div className="rounded-md bg-muted p-3 font-mono">{current.words}</div>
                            </div>
                            <Input
                                placeholder="Type the correct sentence"
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
