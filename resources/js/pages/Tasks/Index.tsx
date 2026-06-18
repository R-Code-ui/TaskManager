// resources/js/Pages/Tasks/Index.tsx
import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageProps, Task } from '@/types';

interface IndexProps extends PageProps {
    tasks: {
        data: Task[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    canCreate: boolean;
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

export default function Index({ tasks, canCreate }: IndexProps) {
    const { auth } = usePage<PageProps>().props;
    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

    const user = auth.user;
    const isAdmin = user?.roles?.includes('admin') ?? false;
    const userPermissions = user?.permissions ?? [];

    const canEditTask = (task: Task) => {
        return userPermissions.includes('edit tasks') && (isAdmin || task.user_id === user?.id);
    };

    const canDeleteTask = (task: Task) => {
        return userPermissions.includes('delete tasks') && (isAdmin || task.user_id === user?.id);
    };

    const handleDelete = (taskId: number, taskTitle: string) => {
        if (confirm(`Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`)) {
            router.delete(route('tasks.destroy', taskId));
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold">Tasks</h1>
                        {canCreate && (
                            <Link href={route('tasks.create')}>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" /> New Task
                                </Button>
                            </Link>
                        )}
                    </div>

                    <div className="grid gap-4">
                        {tasks.data.length === 0 ? (
                            <Card>
                                <CardContent className="py-8 text-center text-muted-foreground">
                                    No tasks yet. Click "New Task" to create one.
                                </CardContent>
                            </Card>
                        ) : (
                            tasks.data.map((task) => (
                                <Card key={task.id}>
                                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl">
                                                <Link
                                                    href={route('tasks.show', task.id)}
                                                    className="hover:underline"
                                                >
                                                    {task.title}
                                                </Link>
                                            </CardTitle>
                                            <div className="flex gap-2 text-sm text-muted-foreground">
                                                <span>Due: {task.due_date || 'No due date'}</span>
                                                <Badge className={statusColorMap[task.status]}>
                                                    {statusLabelMap[task.status]}
                                                </Badge>
                                                {isAdmin && task.user && (
                                                    <span>User: {task.user.name}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <Link href={route('tasks.show', task.id)}>
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            {canEditTask(task) && (
                                                <Link href={route('tasks.edit', task.id)}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            {canDeleteTask(task) && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(task.id, task.title)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">{task.description || 'No description'}</p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {tasks.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: tasks.last_page }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === tasks.current_page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => router.get(route('tasks.index'), { page })}
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
