import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {
    Users,
    CheckCircle,
    Clock,
    TrendingUp,
    ArrowRight,
} from 'lucide-react';

// Fake data for stats cards
const stats = [
    {
        title: 'Total Tasks',
        value: '24',
        change: '+12%',
        icon: CheckCircle,
        color: 'text-green-500',
    },
    {
        title: 'Pending Tasks',
        value: '8',
        change: '-2%',
        icon: Clock,
        color: 'text-yellow-500',
    },
    {
        title: 'Active Users',
        value: '142',
        change: '+5%',
        icon: Users,
        color: 'text-blue-500',
    },
    {
        title: 'Completion Rate',
        value: '67%',
        change: '+8%',
        icon: TrendingUp,
        color: 'text-purple-500',
    },
];

// Fake data for bar chart (weekly tasks)
const weeklyData = [
    { name: 'Mon', tasks: 4, completed: 3 },
    { name: 'Tue', tasks: 7, completed: 5 },
    { name: 'Wed', tasks: 5, completed: 4 },
    { name: 'Thu', tasks: 8, completed: 6 },
    { name: 'Fri', tasks: 6, completed: 5 },
    { name: 'Sat', tasks: 3, completed: 2 },
    { name: 'Sun', tasks: 2, completed: 1 },
];

// Fake data for line chart (monthly trend)
const monthlyTrend = [
    { name: 'Jan', tasks: 20 },
    { name: 'Feb', tasks: 28 },
    { name: 'Mar', tasks: 35 },
    { name: 'Apr', tasks: 42 },
    { name: 'May', tasks: 48 },
    { name: 'Jun', tasks: 55 },
];

// Fake data for pie chart (task distribution by status)
const statusData = [
    { name: 'Completed', value: 12, color: '#10b981' },
    { name: 'In Progress', value: 8, color: '#3b82f6' },
    { name: 'Pending', value: 4, color: '#f59e0b' },
];

// Fake recent tasks
const recentTasks = [
    { id: 1, title: 'Complete project documentation', status: 'completed', due: '2025-06-01' },
    { id: 2, title: 'Review pull requests', status: 'in_progress', due: '2025-06-03' },
    { id: 3, title: 'Update dependencies', status: 'pending', due: '2025-06-05' },
    { id: 4, title: 'Fix login bug', status: 'completed', due: '2025-05-28' },
    { id: 5, title: 'Write tests for TaskManager', status: 'pending', due: '2025-06-07' },
];

const statusBadgeMap = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Weekly Tasks Bar Chart */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Weekly Task Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ height: 320, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="tasks" fill="#3b82f6" name="Created" />
                                        <Bar dataKey="completed" fill="#10b981" name="Completed" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Monthly Trend Line Chart */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Monthly Task Creation Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ height: 320, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={monthlyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="tasks"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            name="Tasks Created"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Second Row: Pie Chart + Recent Tasks */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Task Distribution Pie Chart */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Task Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div style={{ height: 320, width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {statusData.map((entry, idx) => (
                                                <Cell key={`cell-${idx}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Tasks List */}
                    <Card className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Tasks</CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <a href="/tasks" className="flex items-center gap-1">
                                    View All <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recentTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {task.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Due: {task.due}
                                        </p>
                                    </div>
                                    <Badge className={statusBadgeMap[task.status]}>
                                        {task.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
