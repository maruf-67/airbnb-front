"use client";

import { Edit, Trash2, MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Role } from "@/types";
import { DataTable, Badge, Button } from "@/components/ui";

interface RoleListProps {
    roles: Role[];
    isLoading?: boolean;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
}

function RoleActions({
    role,
    onEdit,
    onDelete,
}: {
    role: Role;
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
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
                            onEdit(role);
                            setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <Edit className="h-4 w-4" />
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            onDelete(role);
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

export function RoleList({ roles, isLoading, onEdit, onDelete }: RoleListProps) {
    const columns = [
        {
            key: "title" as const,
            header: "Role Name",
            sortable: true,
            render: (role: Role) => (
                <div>
                    <p className="font-medium">{role.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {role.description}
                    </p>
                </div>
            ),
        },
        {
            key: "permissions" as const,
            header: "Permissions",
            render: (role: Role) => {
                const permCount = role.permissions?.length || role.permissionIds?.length || 0;
                return <Badge variant="info">{permCount} permissions</Badge>;
            },
        },
        {
            key: "createdAt" as const,
            header: "Created",
            sortable: true,
            render: (role: Role) => (
                <span className="text-gray-500 dark:text-gray-400">
                    {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : "-"}
                </span>
            ),
        },
        {
            key: "actions" as string,
            header: "",
            render: (role: Role) => (
                <RoleActions role={role} onEdit={onEdit} onDelete={onDelete} />
            ),
            className: "w-12",
        },
    ];

    return (
        <DataTable
            data={roles}
            columns={columns}
            isLoading={isLoading}
            emptyMessage="No roles found"
            searchKeys={["title", "description"]}
            searchPlaceholder="Search roles by name or description..."
        />
    );
}
