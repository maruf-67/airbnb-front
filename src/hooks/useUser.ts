"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { User } from "@/types";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.data.user);
            } catch (err: any) {
                // If 401, api interceptor might handle it, or we just set user null
                setUser(null);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return { user, loading, error };
}
