import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Message } from '@/types';
import MessageCard from '@/components/MessageCard';
import { Mail, Plus } from 'lucide-react';

interface InboxProps {
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
    };
}

export default function Inbox({ messages }: InboxProps) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <>
            <Head title="Inbox" />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Mail className="h-6 w-6 text-muted-foreground" />
                            <h1 className="text-2xl font-semibold">Inbox</h1>
                        </div>
                        <Button asChild>
                            <a href="/messages/create">
                                <Plus className="mr-2 h-4 w-4" /> Compose
                            </a>
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {messages.data.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                Your inbox is empty.
                            </div>
                        ) : (
                            messages.data.map((message) => (
                                <MessageCard key={message.id} message={message} type="inbox" />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {messages.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: messages.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === messages.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get('/messages', { page })}
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
