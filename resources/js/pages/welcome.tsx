import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Video, Cloud } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-8">
                {/* Header Navigation */}
                <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
                    <div className="container mx-auto flex h-16 items-center justify-end px-4">
                        <div className="flex gap-3">
                            {auth.user ? (
                                <Button asChild variant="default">
                                    <Link href={dashboard()}>Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost">
                                        <Link href={login()}>Log in</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href={register()}>Register</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="container mx-auto mt-20 flex flex-col items-center gap-12 px-4 py-12 text-center md:mt-24 lg:flex-row lg:text-left">
                    {/* Left content */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
                            TaskManager
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                {' '}
                                for Teams
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground lg:text-xl">
                            Organize, track, and collaborate on tasks with ease. Built with
                            Laravel 13, React, Inertia, and shadcn/ui.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                            <Button asChild size="lg">
                                <Link href={register()}>Get Started</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="https://laravel.com/docs" target="_blank" rel="noopener noreferrer">
                                    Documentation
                                </a>
                            </Button>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground lg:justify-start">
                            <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                Role‑based access
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                Real‑time updates
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-purple-500" />
                                Shadcn UI
                            </div>
                        </div>
                    </div>

                    {/* Right decorative graphic (simplified from original) */}
                    <div className="flex-1">
                        <Card className="overflow-hidden border shadow-xl">
                            <CardHeader className="bg-muted/50">
                                <CardTitle>Ready to boost productivity?</CardTitle>
                                <CardDescription>Manage your tasks like a pro.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid gap-3">
                                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                                        <span className="text-sm">Admin & User roles</span>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">📋</div>
                                        <span className="text-sm">Full CRUD operations</span>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">🎨</div>
                                        <span className="text-sm">shadcn/ui components</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Features Section */}
                <div className="container mx-auto mt-16 border-t py-16">
                    <h2 className="mb-8 text-center text-3xl font-semibold">Everything you need</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Documentation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Comprehensive guides and API references for Laravel 13 and Inertia.
                                </p>
                                <Button asChild variant="link" className="mt-3 p-0">
                                    <a href="https://laravel.com/docs" target="_blank" rel="noopener noreferrer">
                                        Read docs <ArrowRight className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="h-5 w-5" />
                                    Video Tutorials
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Learn Laravel from experts at Laracasts – step by step.
                                </p>
                                <Button asChild variant="link" className="mt-3 p-0">
                                    <a href="https://laracasts.com" target="_blank" rel="noopener noreferrer">
                                        Watch now <ArrowRight className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cloud className="h-5 w-5" />
                                    Deploy instantly
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Deploy your Laravel application on Laravel Cloud with one click.
                                </p>
                                <Button asChild variant="link" className="mt-3 p-0">
                                    <a href="https://cloud.laravel.com" target="_blank" rel="noopener noreferrer">
                                        Deploy now <ArrowRight className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <footer className="container mx-auto border-t py-6 text-center text-sm text-muted-foreground">
                    <p>Built with Laravel 13, React, Inertia, and shadcn/ui.</p>
                </footer>
            </div>
        </>
    );
}
