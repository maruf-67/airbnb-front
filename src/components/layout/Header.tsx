"use client";

import { Moon, Sun, Bell, User, LogOut, Settings, Monitor, Check, PanelLeftOpen } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/contexts";
import { Button, Avatar, Badge } from "@/components/ui";
import { MobileMenuButton } from "./Sidebar";
import { cn, getAvatarUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
    onMobileMenuClick: () => void;
    isCollapsed?: boolean;
    onToggleSidebar?: () => void;
}

const demoNotifications = [
    {
        id: "1",
        title: "New Booking Request",
        message: "John Doe requested a stay.",
        type: "info" as const,
        read: false,
        timestamp: "2 minutes ago",
    },
    {
        id: "2",
        title: "System Update",
        message: "Maintenance scheduled.",
        type: "warning" as const,
        read: true,
        timestamp: "2 hours ago",
    },
];

const getNotificationColor = (type: "info" | "warning" | "success" | "error") => {
    switch (type) {
        case "info":
            return "bg-blue-500";
        case "warning":
            return "bg-yellow-500";
        case "success":
            return "bg-green-500";
        case "error":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
};

export function Header({ onMobileMenuClick, isCollapsed, onToggleSidebar }: HeaderProps) {
    const router = useRouter();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const { user } = useUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState(demoNotifications);
    const profileRef = useRef<HTMLDivElement>(null);
    const themeRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
            if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
                setIsThemeOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleMarkAsRead = (id: string) => {
        setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("user");
        router.push("/login");
    };

    const themeOptions = [
        { value: "light" as const, label: "Light", icon: Sun },
        { value: "dark" as const, label: "Dark", icon: Moon },
        { value: "system" as const, label: "System", icon: Monitor },
    ];

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 lg:px-6">
            <div className="flex items-center gap-4">
                <MobileMenuButton onClick={onMobileMenuClick} />

                {/* Desktop Sidebar Toggle - Only visible when collapsed */}
                {isCollapsed && onToggleSidebar && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleSidebar}
                        className="hidden lg:flex -ml-7"
                        title="Expand Sidebar"
                    >
                        <PanelLeftOpen className="h-5 w-5" />
                        <span className="sr-only">Expand Sidebar</span>
                    </Button>
                )}

            </div>

            <div className="flex items-center gap-2">
                {/* Notifications */}
                <div ref={notificationsRef} className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                                {unreadCount}
                            </span>
                        )}
                        <span className="sr-only">Notifications</span>
                    </Button>

                    {isNotificationsOpen && (
                        <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900 dark:text-white">Notifications</span>
                                    {unreadCount > 0 && (
                                        <Badge variant="error" size="sm">{unreadCount}</Badge>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllAsRead}
                                        className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.slice(0, 5).map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "flex gap-3 border-b border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50",
                                            !notification.read && "bg-blue-50/50 dark:bg-blue-900/10"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "mt-1 h-2 w-2 shrink-0 rounded-full",
                                                getNotificationColor(notification.type)
                                            )}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm truncate",
                                                !notification.read ? "font-medium text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                                            )}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {notification.message}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                                {notification.timestamp}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <button
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                title="Mark as read"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 p-2 dark:border-gray-700">
                                <Link
                                    href="/admin/notifications"
                                    className="block w-full rounded-md px-4 py-2 text-center text-sm font-medium text-primary-600 hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-gray-700"
                                    onClick={() => setIsNotificationsOpen(false)}
                                >
                                    View all notifications
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <div ref={themeRef} className="relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsThemeOpen(!isThemeOpen)}
                    >
                        {resolvedTheme === "dark" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {isThemeOpen && (
                        <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            {themeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setTheme(option.value);
                                        setIsThemeOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                                        theme === option.value
                                            ? "text-rose-600 dark:text-rose-400"
                                            : "text-gray-700 dark:text-gray-300"
                                    )}
                                >
                                    <option.icon className="h-4 w-4" />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {user?.avatar ? (
                            <Image
                                src={getAvatarUrl(user.avatar) || ''}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full object-cover"
                                unoptimized
                            />
                        ) : (
                            <Avatar name={user?.name || "User"} size="sm" />
                        )}

                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-3 py-2 dark:border-gray-700">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email || ""}
                                </p>
                                {user?.role && (
                                    <p className="mt-1 text-xs font-medium text-primary-600 dark:text-primary-400">
                                        {user.role.title || user.role.name}
                                    </p>
                                )}
                            </div>
                            <Link
                                href="/admin/profile"
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
