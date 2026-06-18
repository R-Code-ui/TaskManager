import { Link } from '@inertiajs/react';
import { Message } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MessageCardProps {
    message: Message;
    type: 'inbox' | 'sent';
}

export default function MessageCard({ message, type }: MessageCardProps) {
    const otherUser = type === 'inbox' ? message.sender : message.receiver;
    const isUnread = type === 'inbox' && !message.is_read;

    return (
        <Link href={`/messages/${message.id}`} className="block">
            <Card className={cn(
                "transition-all hover:shadow-md",
                isUnread && "border-l-4 border-l-blue-500 bg-muted/20"
            )}>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className={cn(
                                    "text-sm font-semibold truncate",
                                    isUnread && "text-blue-600 dark:text-blue-400"
                                )}>
                                    {message.subject}
                                </h3>
                                {isUnread && (
                                    <Badge variant="default" className="text-xs">New</Badge>
                                )}
                            </div>
                            <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                <span>
                                    {type === 'inbox' ? 'From:' : 'To:'} {otherUser?.name}
                                </span>
                                <span>•</span>
                                <span>{new Date(message.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {message.body}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
