// resources/js/Pages/Tasks/Show.tsx
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { Task, PageProps } from '@/types';

interface ShowProps {
    task: Task;
}

const statusColorMap: Record<Task['status'], string> = {
    pending: 'bg-yellow-500',
    in_progress: 'bg-blue-500',
    completed: 'bg-green-500',
};

const statusLabelMap: Record<Task['status'], string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
};

export default function Show({ task }: ShowProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const isAdmin = user?.roles?.includes('admin') ?? false;
    const userPermissions = user?.permissions ?? [];

    const canEdit = userPermissions.includes('edit tasks') && (isAdmin || task.user_id === user?.id);
    const canDelete = userPermissions.includes('delete tasks') && (isAdmin || task.user_id === user?.id);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', task.id));
        }
    };

    return (
        <>
            <Head title={task.title} />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <Link href={route('tasks.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="text-2xl">{task.title}</CardTitle>
                                <div className="mt-2 flex gap-2">
                                    <Badge className={statusColorMap[task.status]}>
                                        {statusLabelMap[task.status]}
                                    </Badge>
                                    {isAdmin && task.user && (
                                        <span className="text-sm text-muted-foreground">
                                            Created by: {task.user.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {canEdit && (
                                    <Link href={route('tasks.edit', task.id)}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="mr-1 h-4 w-4" /> Edit
                                        </Button>
                                    </Link>
                                )}
                                {canDelete && (
                                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-medium">Description</h3>
                                <p className="text-muted-foreground">{task.description || 'No description provided.'}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Due Date</h3>
                                <p className="text-muted-foreground">{task.due_date || 'No due date set'}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Created At</h3>
                                <p className="text-muted-foreground">{new Date(task.created_at).toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="font-medium">Last Updated</h3>
                                <p className="text-muted-foreground">{new Date(task.updated_at).toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
