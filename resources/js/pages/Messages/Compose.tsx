import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { User } from '@/types';

interface ComposeProps {
    users: User[];
}

export default function Compose({ users }: ComposeProps) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        receiver_id: '',
        subject: '',
        body: '',
        parent_id: null as number | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/messages');
    };

    return (
        <>
            <Head title="Compose Message" />
            <div className="py-6">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-2xl font-semibold">New Message</h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Compose</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="receiver_id">To</Label>
                                    <Select
                                        value={data.receiver_id}
                                        onValueChange={(val) => setData('receiver_id', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recipient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users
                                                .filter(u => u.id !== auth.user?.id)
                                                .map((user) => (
                                                    <SelectItem key={user.id} value={String(user.id)}>
                                                        {user.name} (@{user.username})
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.receiver_id && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{errors.receiver_id}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                    />
                                    {errors.subject && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{errors.subject}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="body">Message</Label>
                                    <Textarea
                                        id="body"
                                        rows={8}
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        required
                                    />
                                    {errors.body && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{errors.body}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" type="button" onClick={() => window.history.back()}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Send Message
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
