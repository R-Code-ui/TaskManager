import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import MessageCard from '@/components/MessageCard';
import { Send } from 'lucide-react';

interface SentProps {
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
    };
}

export default function Sent({ messages }: SentProps) {
    return (
        <>
            <Head title="Sent" />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center gap-2">
                        <Send className="h-6 w-6 text-muted-foreground" />
                        <h1 className="text-2xl font-semibold">Sent Messages</h1>
                    </div>

                    <div className="space-y-4">
                        {messages.data.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No sent messages yet.
                            </div>
                        ) : (
                            messages.data.map((message) => (
                                <MessageCard key={message.id} message={message} type="sent" />
                            ))
                        )}
                    </div>

                    {messages.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: messages.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === messages.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get('/messages/sent', { page })}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
