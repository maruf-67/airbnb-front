import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

function CardHeader({ className, children, ...props }: CardHeaderProps) {
    return (
        <div
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

function CardTitle({ className, children, ...props }: CardTitleProps) {
    return (
        <h3
            className={cn(
                "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}

function CardDescription({ className, children, ...props }: CardDescriptionProps) {
    return (
        <p
            className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
            {...props}
        >
            {children}
        </p>
    );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

function CardContent({ className, children, ...props }: CardContentProps) {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

function CardFooter({ className, children, ...props }: CardFooterProps) {
    return (
        <div
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        >
            {children}
        </div>
    );
}

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    className,
}: StatsCardProps) {
    return (
        <Card className={className}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {title}
                        </p>
                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {value}
                        </p>
                        {description && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {description}
                            </p>
                        )}
                        {trend && (
                            <div className="mt-2 flex items-center">
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        trend.isPositive
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    )}
                                >
                                    {trend.isPositive ? "+" : "-"}
                                    {Math.abs(trend.value)}%
                                </span>
                                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                                    from last month
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="rounded-lg bg-primary-100 p-3 dark:bg-primary-900/30">
                        <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, StatsCard };
