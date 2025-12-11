"use client";

import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

type DialogType = "danger" | "warning" | "info" | "success";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: DialogType;
    isLoading?: boolean;
}

const typeConfig = {
    danger: {
        icon: AlertTriangle,
        iconColor: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-100 dark:bg-red-900/30",
        buttonVariant: "destructive" as const,
    },
    warning: {
        icon: AlertTriangle,
        iconColor: "text-yellow-600 dark:text-yellow-400",
        iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
        buttonVariant: "default" as const,
    },
    info: {
        icon: Info,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        buttonVariant: "default" as const,
    },
    success: {
        icon: CheckCircle,
        iconColor: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-100 dark:bg-green-900/30",
        buttonVariant: "default" as const,
    },
};

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger",
    isLoading = false,
}: ConfirmDialogProps) {
    const config = typeConfig[type];
    const Icon = config.icon;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        config.iconBg
                    )}
                >
                    <Icon className={cn("h-5 w-5", config.iconColor)} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {message}
                    </p>
                </div>
            </div>
            <ModalFooter>
                <Button variant="outline" onClick={onClose} disabled={isLoading}>
                    {cancelText}
                </Button>
                <Button
                    variant={config.buttonVariant}
                    onClick={onConfirm}
                    isLoading={isLoading}
                >
                    {confirmText}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
