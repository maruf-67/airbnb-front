"use client";

import { useState } from "react";
import {
    Bell,
    Check,
    CheckCheck,
    Trash2,
    Filter,
    User,
    Shield,
    CreditCard,
    AlertTriangle,
    Info,
    CheckCircle,
    Settings,
    RefreshCw,
} from "lucide-react";
import { Button, Card, CardHeader, CardTitle, CardContent, Badge, Select } from "@/components/ui";

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    category: "user" | "security" | "payment" | "system";
    read: boolean;
    timestamp: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
    {
        id: "1",
        title: "New User Registration",
        message: "John Doe has registered as a new patient. Review their profile to verify their account.",
        type: "info",
        category: "user",
        read: false,
        timestamp: "2024-01-15T10:30:00Z",
    },
    {
        id: "2",
        title: "Security Alert",
        message: "Unusual login activity detected from New York, NY. Please verify if this was you.",
        type: "warning",
        category: "security",
        read: false,
        timestamp: "2024-01-15T09:15:00Z",
    },
    {
        id: "3",
        title: "Payment Received",
        message: "Payment of $29.99 received from Dr. Emily Chen for Professional plan subscription.",
        type: "success",
        category: "payment",
        read: false,
        timestamp: "2024-01-14T18:45:00Z",
    },
    {
        id: "4",
        title: "System Update",
        message: "System maintenance scheduled for January 20th, 2024 from 2:00 AM to 4:00 AM UTC.",
        type: "info",
        category: "system",
        read: true,
        timestamp: "2024-01-14T14:20:00Z",
    },
    {
        id: "5",
        title: "Subscription Expiring",
        message: "5 user subscriptions are expiring in the next 7 days. Send renewal reminders?",
        type: "warning",
        category: "payment",
        read: true,
        timestamp: "2024-01-13T11:00:00Z",
    },
    {
        id: "6",
        title: "Doctor Verified",
        message: "Dr. Michael Brown's medical license has been verified. Account is now fully active.",
        type: "success",
        category: "user",
        read: true,
        timestamp: "2024-01-13T09:30:00Z",
    },
    {
        id: "7",
        title: "Failed Payment",
        message: "Payment failed for Alice Thompson. Card declined. Please contact the user.",
        type: "error",
        category: "payment",
        read: false,
        timestamp: "2024-01-12T16:45:00Z",
    },
    {
        id: "8",
        title: "New Role Created",
        message: "A new role 'Content Manager' has been created with 12 permissions assigned.",
        type: "info",
        category: "security",
        read: true,
        timestamp: "2024-01-12T10:15:00Z",
    },
    {
        id: "9",
        title: "Backup Completed",
        message: "Daily database backup completed successfully. 2.4GB stored in cloud storage.",
        type: "success",
        category: "system",
        read: true,
        timestamp: "2024-01-11T03:00:00Z",
    },
    {
        id: "10",
        title: "Patient Data Export",
        message: "Dr. James Wilson requested patient data export. Pending admin approval.",
        type: "warning",
        category: "security",
        read: false,
        timestamp: "2024-01-11T14:30:00Z",
    },
];

const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
        case "info":
            return Info;
        case "success":
            return CheckCircle;
        case "warning":
            return AlertTriangle;
        case "error":
            return AlertTriangle;
        default:
            return Info;
    }
};

const getCategoryIcon = (category: Notification["category"]) => {
    switch (category) {
        case "user":
            return User;
        case "security":
            return Shield;
        case "payment":
            return CreditCard;
        case "system":
            return Settings;
        default:
            return Bell;
    }
};

const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
        case "info":
            return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
        case "success":
            return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
        case "warning":
            return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
        case "error":
            return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
        default:
            return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400";
    }
};

const getTypeBadge = (type: Notification["type"]) => {
    switch (type) {
        case "info":
            return <Badge variant="default" size="sm">Info</Badge>;
        case "success":
            return <Badge variant="success" size="sm">Success</Badge>;
        case "warning":
            return <Badge variant="warning" size="sm">Warning</Badge>;
        case "error":
            return <Badge variant="error" size="sm">Error</Badge>;
        default:
            return null;
    }
};

const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [isLoading, setIsLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [readFilter, setReadFilter] = useState<string>("all");

    const handleMarkAsRead = (id: string) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllAsRead = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        setIsLoading(false);
    };

    const handleDelete = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    const handleDeleteAllRead = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setNotifications(notifications.filter((n) => !n.read));
        setIsLoading(false);
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false);
    };

    const filteredNotifications = notifications.filter((n) => {
        if (typeFilter !== "all" && n.type !== typeFilter) return false;
        if (categoryFilter !== "all" && n.category !== categoryFilter) return false;
        if (readFilter === "unread" && n.read) return false;
        if (readFilter === "read" && !n.read) return false;
        return true;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                        {unreadCount > 0 && (
                            <Badge variant="error" size="sm">{unreadCount} unread</Badge>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Stay updated with system alerts and messages
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                    <Button variant="outline" onClick={handleMarkAllAsRead} disabled={isLoading || unreadCount === 0}>
                        <CheckCheck className="h-4 w-4" />
                        Mark All Read
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleDeleteAllRead}
                        disabled={isLoading || !notifications.some((n) => n.read)}
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="h-4 w-4" />
                        Clear Read
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {notifications.length}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Unread</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {notifications.filter((n) => n.type === "warning" || n.type === "error").length}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Alerts</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {notifications.filter((n) => n.read).length}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Read</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Filters:</span>
                </div>
                <Select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    options={[
                        { value: "all", label: "All Types" },
                        { value: "info", label: "Info" },
                        { value: "success", label: "Success" },
                        { value: "warning", label: "Warning" },
                        { value: "error", label: "Error" },
                    ]}
                    className="w-32"
                />
                <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    options={[
                        { value: "all", label: "All Categories" },
                        { value: "user", label: "User" },
                        { value: "security", label: "Security" },
                        { value: "payment", label: "Payment" },
                        { value: "system", label: "System" },
                    ]}
                    className="w-40"
                />
                <Select
                    value={readFilter}
                    onChange={(e) => setReadFilter(e.target.value)}
                    options={[
                        { value: "all", label: "All" },
                        { value: "unread", label: "Unread" },
                        { value: "read", label: "Read" },
                    ]}
                    className="w-28"
                />
            </div>

            {/* Notifications List */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        {filteredNotifications.length} Notification{filteredNotifications.length !== 1 ? "s" : ""}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredNotifications.map((notification) => {
                            const TypeIcon = getTypeIcon(notification.type);
                            const CategoryIcon = getCategoryIcon(notification.category);
                            return (
                                <div
                                    key={notification.id}
                                    className={`flex gap-4 p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                                        }`}
                                >
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getTypeColor(notification.type)}`}>
                                        <TypeIcon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className={`font-medium ${!notification.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                                                        {notification.title}
                                                    </p>
                                                    {getTypeBadge(notification.type)}
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <CategoryIcon className="h-3 w-3" />
                                                        <span className="capitalize">{notification.category}</span>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {notification.message}
                                                </p>
                                                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                                    {formatTimestamp(notification.timestamp)}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-1">
                                                {!notification.read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="h-8 w-8"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredNotifications.length === 0 && (
                            <div className="py-12 text-center">
                                <Bell className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                                <p className="mt-4 text-gray-500 dark:text-gray-400">No notifications found</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
