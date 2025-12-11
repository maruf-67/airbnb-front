"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
    children: React.ReactNode;
}

function getInitialCollapsedState(): boolean {
    if (typeof window === "undefined") {
        return false;
    }
    return localStorage.getItem("sidebar-collapsed") === "true";
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        setIsCollapsed(getInitialCollapsedState());
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleCollapse = () => {
        const newValue = !isCollapsed;
        setIsCollapsed(newValue);
        localStorage.setItem("sidebar-collapsed", String(newValue));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggle={handleToggleCollapse}
                isMobileOpen={isMobileOpen}
                onMobileClose={() => setIsMobileOpen(false)}
            />
            <div
                className={cn(
                    "flex min-h-screen flex-col transition-all duration-300",
                    isCollapsed ? "lg:pl-16" : "lg:pl-64"
                )}
            >
                <Header
                    onMobileMenuClick={() => setIsMobileOpen(true)}
                    isCollapsed={isCollapsed}
                    onToggleSidebar={handleToggleCollapse}
                />
                <main className="flex-1 p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
