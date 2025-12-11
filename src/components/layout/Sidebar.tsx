"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Home,
    Menu,
    PanelLeftClose,
    ChevronDown,
    Settings,
    Bell,
    User,
    LogOut,
    DollarSign,
    UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useState } from "react";
import { deleteCookie } from "cookies-next";

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

interface NavItem {
    name: string;
    href?: string;
    icon: React.ElementType;
    children?: { name: string; href: string }[];
}

const navigation: NavItem[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    {
        name: "Users",
        icon: Users,
        children: [
            { name: "All Users", href: "/admin/users" },
            { name: "Admins", href: "/admin/admins" },
        ],
    },
    {
        name: "Roles & Permissions",
        icon: User, // Using User icon as placeholder/fallback, could use Shield
        children: [
            { name: "Roles", href: "/admin/roles" },
            { name: "Permissions", href: "/admin/permissions" },
        ],
    },
    { name: "Listings", href: "/admin/listings", icon: Home },
    { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({
    isCollapsed,
    onToggle,
    isMobileOpen,
    onMobileClose,
}: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpand = (name: string) => {
        setExpandedItems((prev) =>
            prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
        );
    };

    const isActive = (href: string) => pathname === href;
    const isParentActive = (item: NavItem) =>
        item.children?.some((child) => pathname === child.href);

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("user");
        router.push("/login");
    };

    return (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900",
                    isCollapsed ? "w-16" : "w-64",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:translate-x-0"
                )}
            >
                {/* Logo and Toggle */}
                <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
                    {!isCollapsed && (
                        <>
                            <Link href="/admin" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white dark:bg-rose-500">
                                    <span className="text-lg font-bold">A</span>
                                </div>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                    Airbnb Admin
                                </span>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onToggle}
                                className="hidden lg:flex h-8 w-8 ml-auto"
                            >
                                <PanelLeftClose className="h-4 w-4" />
                                <span className="sr-only">Collapse sidebar</span>
                            </Button>
                        </>
                    )}
                    {isCollapsed && (
                        <Link
                            href="/admin"
                            className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white dark:bg-rose-500"
                        >
                            <span className="text-lg font-bold">A</span>
                        </Link>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                    <ul className="space-y-1">
                        {navigation.map((item) => {
                            if (item.children) {
                                const isExpanded = expandedItems.includes(item.name);
                                const isChildActive = isParentActive(item);

                                return (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => !isCollapsed && toggleExpand(item.name)}
                                            className={cn(
                                                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                isChildActive
                                                    ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                                                isCollapsed && "justify-center"
                                            )}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            <item.icon className="h-5 w-5 shrink-0" />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1 text-left">{item.name}</span>
                                                    <ChevronDown
                                                        className={cn(
                                                            "h-4 w-4 transition-transform",
                                                            isExpanded && "rotate-180"
                                                        )}
                                                    />
                                                </>
                                            )}
                                        </button>
                                        {!isCollapsed && isExpanded && (
                                            <ul className="ml-9 mt-1 space-y-1">
                                                {item.children.map((child) => (
                                                    <li key={child.name}>
                                                        <Link
                                                            href={child.href}
                                                            onClick={onMobileClose}
                                                            className={cn(
                                                                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                                isActive(child.href)
                                                                    ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                                            )}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }

                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href!}
                                        onClick={onMobileClose}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive(item.href!)
                                                ? "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                                            isCollapsed && "justify-center"
                                        )}
                                        title={isCollapsed ? item.name : undefined}
                                    >
                                        <item.icon className="h-5 w-5 shrink-0" />
                                        {!isCollapsed && <span>{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors dark:text-gray-300 dark:hover:bg-red-900/20 dark:hover:text-red-400",
                            isCollapsed && "justify-center"
                        )}
                        title={isCollapsed ? "Logout" : undefined}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                    {/* collapse button removed from here */}
                </div>
            </aside>
        </>
    );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="lg:hidden"
        >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
        </Button>
    );
}
