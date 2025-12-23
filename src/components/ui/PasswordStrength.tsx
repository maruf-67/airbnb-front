"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
    password: string;
    className?: string;
}

type StrengthLevel = "weak" | "fair" | "good" | "strong";

interface StrengthResult {
    level: StrengthLevel;
    score: number;
    label: string;
    color: string;
}

function calculatePasswordStrength(password: string): StrengthResult {
    if (!password) {
        return { level: "weak", score: 0, label: "Too short", color: "bg-gray-300" };
    }

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // special characters

    // Common patterns (reduce score)
    const commonPatterns = [
        /^123/,
        /password/i,
        /qwerty/i,
        /abc/i,
        /111/,
        /000/,
    ];
    if (commonPatterns.some((pattern) => pattern.test(password))) {
        score = Math.max(0, score - 2);
    }

    // Determine strength level
    if (score <= 2) {
        return { level: "weak", score, label: "Weak", color: "bg-red-500" };
    } else if (score <= 4) {
        return { level: "fair", score, label: "Fair", color: "bg-yellow-500" };
    } else if (score <= 6) {
        return { level: "good", score, label: "Good", color: "bg-blue-500" };
    } else {
        return { level: "strong", score, label: "Strong", color: "bg-green-500" };
    }
}

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
    const strength = useMemo(() => calculatePasswordStrength(password), [password]);

    if (!password) {
        return null;
    }

    const widthPercentage = Math.min((strength.score / 7) * 100, 100);

    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Password strength:
                </span>
                <span
                    className={cn(
                        "text-xs font-medium",
                        strength.level === "weak" && "text-red-600 dark:text-red-400",
                        strength.level === "fair" && "text-yellow-600 dark:text-yellow-400",
                        strength.level === "good" && "text-blue-600 dark:text-blue-400",
                        strength.level === "strong" && "text-green-600 dark:text-green-400"
                    )}
                >
                    {strength.label}
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className={cn(
                        "h-full transition-all duration-300",
                        strength.color
                    )}
                    style={{ width: `${widthPercentage}%` }}
                />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>Tips for a strong password:</p>
                <ul className="ml-4 mt-1 list-disc space-y-0.5">
                    <li className={password.length >= 12 ? "text-green-600 dark:text-green-400" : ""}>
                        At least 12 characters
                    </li>
                    <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                        Mix of uppercase and lowercase
                    </li>
                    <li className={/[0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                        Include numbers
                    </li>
                    <li className={/[^a-zA-Z0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                        Include special characters (!@#$%^&*)
                    </li>
                </ul>
            </div>
        </div>
    );
}
