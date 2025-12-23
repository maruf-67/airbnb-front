"use client";

import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Permission } from "@/types";
import { DataTable, Badge, Button } from "@/components/ui";

interface PermissionListProps {
    permissions: Permission[];
    isLoading?: boolean;
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
    readOnly?: boolean;
}

function PermissionActions({
    permission,
    onEdit,
    onDelete,
}: {
    permission: Permission;
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8"
            >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full z-10 mt-1 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <button
                        onClick={() => {
                            onEdit(permission);
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Edit className="h-4 w-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            onDelete(permission);
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export function PermissionList({
    permissions,
    isLoading,
    onEdit,
    onDelete,
    readOnly = false,
}: PermissionListProps) {
    const columns = [
        {
            key: "name" as const,
            header: "Permission",
            render: (permission: Permission) => (
                <div>
                    <p className="font-medium">{permission.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {permission.slug}
                    </p>
                </div>
            ),
        },
        {
            key: "module" as const,
            header: "Module",
            render: (permission: Permission) => (
                <Badge variant="secondary">{permission.module}</Badge>
            ),
        },
        {
            key: "description" as const,
            header: "Description",
            render: (permission: Permission) => (
                <span className="text-gray-600 dark:text-gray-400">
                    {permission.description || "-"}
                </span>
            ),
        },
        ...(readOnly ? [] : [{
            key: "actions" as string,
            header: "",
            render: (permission: Permission) => (
                <PermissionActions
                    permission={permission}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
            className: "w-12",
        }]),
    ];

    return (
        <DataTable
            data={permissions}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No permissions found"
        />
    );
}
