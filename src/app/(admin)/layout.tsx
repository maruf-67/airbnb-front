"use client";

import { AdminLayout } from "@/components/layout";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We can keep the auth check logic here or move it to a higher level middleware/provider
    // For now, let's keep it simple and just reuse the layout structure
    // Ideally authentication should be handled by middleware or a dedicated AuthGuard component

    // Using the same Auth logic as before, but wrapped in the new Layout
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role.type !== 'admin')) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (!user || user.role.type !== 'admin') {
        return null;
    }

    return <AdminLayout>{children}</AdminLayout>;
}
