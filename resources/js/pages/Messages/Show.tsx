import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Reply, Trash2 } from 'lucide-react';
import { Message, User } from '@/types';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ShowProps {
    message: Message;
}

export default function Show({ message }: ShowProps) {
    const { auth } = usePage().props;
    const user = auth.user as User;
    const [showReply, setShowReply] = useState(false);
    const [replyBody, setReplyBody] = useState('');
    const [sending, setSending] = useState(false);

    const handleReply = () => {
        if (!replyBody.trim()) {
            alert('Please enter a message.');
            return;
        }

        setSending(true);

        const payload = {
            receiver_id: message.sender_id,
            subject: `Re: ${message.subject}`,
            body: replyBody,
            parent_id: message.id,
        };

        console.log('Sending reply payload:', payload); // Debug: check console

        router.post('/messages', payload, {
            preserveScroll: true,
            onSuccess: () => {
                // Force a full page reload to show the new reply
                window.location.href = `/messages/${message.id}`;
            },
            onError: (errors) => {
                console.error('Reply failed:', errors);
                alert('Failed to send reply. Check console for details.');
                setSending(false);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Delete this message?')) {
            router.delete(`/messages/${message.id}`);
        }
    };

    const isReceived = message.receiver_id === user.id;
    const otherUser = isReceived ? message.sender : message.receiver;
    const replies = message.replies || [];

    return (
        <>
            <Head title={message.subject} />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4 flex items-center justify-between">
                        <Link href="/messages">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inbox
                            </Button>
                        </Link>
                        <div className="flex gap-2">
                            {!showReply && isReceived && (
                                <Button variant="outline" size="sm" onClick={() => setShowReply(true)}>
                                    <Reply className="mr-1 h-4 w-4" /> Reply
                                </Button>
                            )}
                            <Button variant="destructive" size="sm" onClick={handleDelete}>
                                <Trash2 className="mr-1 h-4 w-4" /> Delete
                            </Button>
                        </div>
                    </div>

                    {/* Original Message */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-xl">{message.subject}</CardTitle>
                                    <div className="mt-1 flex gap-2 text-sm text-muted-foreground">
                                        <span>
                                            {isReceived ? 'From:' : 'To:'} {otherUser?.name} (@{otherUser?.username})
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(message.created_at).toLocaleString()}</span>
                                        {!message.is_read && isReceived && (
                                            <Badge variant="default">Unread</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="whitespace-pre-wrap">{message.body}</div>
                        </CardContent>
                    </Card>

                    {/* Replies Section */}
                    {replies.length > 0 && (
                        <div className="mt-6">
                            <h3 className="mb-3 text-lg font-semibold">Replies</h3>
                            <div className="space-y-4">
                                {replies.map((reply) => (
                                    <Card key={reply.id} className="ml-6 border-l-4 border-l-muted">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-base">{reply.subject}</CardTitle>
                                                    <div className="mt-1 flex gap-2 text-xs text-muted-foreground">
                                                        <span>
                                                            From: {reply.sender?.name} (@{reply.sender?.username})
                                                        </span>
                                                        <span>•</span>
                                                        <span>{new Date(reply.created_at).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="whitespace-pre-wrap text-sm">{reply.body}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reply Form */}
                    {showReply && isReceived && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="text-lg">Reply to {otherUser?.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reply">Your message</Label>
                                        <Textarea
                                            id="reply"
                                            rows={5}
                                            value={replyBody}
                                            onChange={(e) => setReplyBody(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setShowReply(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleReply} disabled={sending}>
                                            Send Reply
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
