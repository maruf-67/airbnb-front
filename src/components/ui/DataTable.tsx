"use client";

import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    ChevronDown,
    ChevronUp,
    Search,
    Eye,
    Edit,
    Trash2,
    MoreHorizontal,
} from "lucide-react";
import { Button } from "./Button";
import { Select } from "./Select";
import { ChevronsUpDown } from "lucide-react";

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
    headerClassName?: string;
}

export interface DataTableAction<T> {
    label: string;
    icon?: React.ReactNode;
    onClick: (item: T) => void;
    variant?: "default" | "danger";
    show?: (item: T) => boolean;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    isLoading?: boolean;
    emptyMessage?: string;
    searchPlaceholder?: string;
    searchKeys?: (keyof T)[];
    actions?: DataTableAction<T>[];
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    showSearch?: boolean;
    showPagination?: boolean;
    showPerPageSelector?: boolean;
    defaultPerPage?: number;
    perPageOptions?: number[];
    className?: string;
    // Server-side pagination props
    manualPagination?: boolean;
    blockPagination?: boolean; // if true, hide internal pagination
    rowCount?: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
    onSearchChange?: (value: string) => void;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    isLoading = false,
    emptyMessage = "No data available",
    searchPlaceholder = "Search...",
    searchKeys = [],
    actions,
    onView,
    onEdit,
    onDelete,
    showSearch = true,
    showPagination = true,
    showPerPageSelector = true,
    defaultPerPage = 10,
    perPageOptions = [10, 20, 50, 100],
    className,
    manualPagination = false,
    blockPagination = false,
    rowCount = 0,
    onPageChange,
    onPerPageChange,
    onSearchChange,
}: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(defaultPerPage);
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    // Filter data based on search (Client-side only)
    const filteredData = useMemo(() => {
        if (manualPagination) return data;
        if (!search.trim() || searchKeys.length === 0) return data;

        const searchLower = search.toLowerCase();
        return data.filter((item) =>
            searchKeys.some((key) => {
                const value = item[key];
                if (typeof value === "string") {
                    return value.toLowerCase().includes(searchLower);
                }
                if (typeof value === "number") {
                    return value.toString().includes(searchLower);
                }
                return false;
            })
        );
    }, [data, search, searchKeys, manualPagination]);

    // Sort data (Client-side only)
    const sortedData = useMemo(() => {
        if (manualPagination) return filteredData;
        if (!sortKey || !sortDirection) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = getNestedValue(a, sortKey);
            const bValue = getNestedValue(b, sortKey);

            if (aValue === bValue) return 0;
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            const comparison = aValue < bValue ? -1 : 1;
            return sortDirection === "asc" ? comparison : -comparison;
        });
    }, [filteredData, sortKey, sortDirection, manualPagination]);

    // Paginate data
    const paginatedData = useMemo(() => {
        if (manualPagination) return sortedData;
        const start = (currentPage - 1) * perPage;
        return sortedData.slice(start, start + perPage);
    }, [sortedData, currentPage, perPage, manualPagination]);

    const totalPages = manualPagination
        ? Math.ceil(rowCount / perPage)
        : Math.ceil(sortedData.length / perPage);
    const totalItems = manualPagination ? rowCount : sortedData.length;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    // Handle sort
    const handleSort = useCallback((key: string) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDirection("asc");
        } else {
            if (sortDirection === "asc") {
                setSortDirection("desc");
            } else if (sortDirection === "desc") {
                setSortKey(null);
                setSortDirection(null);
            } else {
                setSortDirection("asc");
            }
        }
        // Note: Server-side sorting not fully implemented in this UI unless we add onSortChange
        if (!manualPagination) {
            setCurrentPage(1);
        }
    }, [sortKey, sortDirection, manualPagination]);

    // Handle page change
    const handlePageChange = useCallback((page: number) => {
        const freshPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(freshPage);
        if (manualPagination && onPageChange) {
            onPageChange(freshPage);
        }
    }, [totalPages, manualPagination, onPageChange]);

    // Handle per page change
    const handlePerPageChange = useCallback((value: string) => {
        const newPerPage = Number(value);
        setPerPage(newPerPage);
        setCurrentPage(1);
        if (manualPagination && onPerPageChange) {
            onPerPageChange(newPerPage);
            // Reset to page 1 is usually expected
            if (onPageChange) onPageChange(1);
        }
    }, [manualPagination, onPerPageChange, onPageChange]);

    // Handle search change
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (!manualPagination) {
            setCurrentPage(1);
        }
        if (onSearchChange) {
            onSearchChange(value);
        }
    }, [manualPagination, onSearchChange]);

    const getCellValue = (item: T, column: Column<T>) => {
        if (column.render) {
            return column.render(item);
        }
        return getNestedValue(item, column.key as string) as React.ReactNode;
    };

    const hasActions = onView || onEdit || onDelete || (actions && actions.length > 0);

    return (
        <div className={cn("overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700", className)}>
            {/* Search and Controls */}
            {showSearch && (
                <div className="flex flex-col gap-4 border-b border-gray-200 p-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder={searchPlaceholder}
                            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
                        />
                    </div>
                    {showPerPageSelector && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Show</span>
                            <Select
                                value={perPage.toString()}
                                onChange={(e) => handlePerPageChange(e.target.value)}
                                options={perPageOptions.map((n) => ({ value: n.toString(), label: n.toString() }))}
                                className="w-20"
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">entries</span>
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    scope="col"
                                    className={cn(
                                        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400",
                                        column.sortable && "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700",
                                        column.headerClassName
                                    )}
                                    onClick={column.sortable ? () => handleSort(column.key as string) : undefined}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.header}
                                        {column.sortable && (
                                            <span className="ml-1">
                                                {sortKey === column.key ? (
                                                    sortDirection === "asc" ? (
                                                        <ChevronUp className="h-4 w-4" />
                                                    ) : sortDirection === "desc" ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronsUpDown className="h-4 w-4 opacity-30" />
                                                    )
                                                ) : (
                                                    <ChevronsUpDown className="h-4 w-4 opacity-30" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {hasActions && (
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                                >
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length + (hasActions ? 1 : 0)} className="px-4 py-10 text-center">
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (hasActions ? 1 : 0)}
                                    className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item) => (
                                <tr key={item.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                                    {columns.map((column) => (
                                        <td
                                            key={`${item.id}-${column.key as string}`}
                                            className={cn(
                                                "whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-100",
                                                column.className
                                            )}
                                        >
                                            {getCellValue(item, column)}
                                        </td>
                                    ))}
                                    {hasActions && (
                                        <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                                            <DataTableActions
                                                item={item}
                                                onView={onView}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                actions={actions}
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {showPagination && !blockPagination && totalPages > 0 && (
                <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 p-4 dark:border-gray-700 sm:flex-row">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-medium">{startItem}</span> to{" "}
                        <span className="font-medium">{endItem}</span> of{" "}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="rounded-r-none"
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-none"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {getPageNumbers(currentPage, totalPages).map((page, index) =>
                            page === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 dark:border-gray-600 dark:bg-gray-800"
                                >
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(page as number)}
                                    className="rounded-none"
                                >
                                    {page}
                                </Button>
                            )
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-none"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="rounded-l-none"
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </nav>
                </div>
            )}
        </div>
    );
}

// Actions dropdown component
function DataTableActions<T extends { id: string | number }>({
    item,
    onView,
    onEdit,
    onDelete,
    actions,
}: {
    item: T;
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    actions?: DataTableAction<T>[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    const visibleActions = actions?.filter((action) => !action.show || action.show(item)) || [];
    const hasDefaultActions = onView || onEdit || onDelete;
    const hasCustomActions = visibleActions.length > 0;

    if (!hasDefaultActions && !hasCustomActions) return null;

    return (
        <div className="relative inline-block text-left">
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
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        {onView && (
                            <button
                                onClick={() => {
                                    onView(item);
                                    setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Eye className="h-4 w-4" />
                                View
                            </button>
                        )}
                        {onEdit && (
                            <button
                                onClick={() => {
                                    onEdit(item);
                                    setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </button>
                        )}
                        {visibleActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    action.onClick(item);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                                    action.variant === "danger"
                                        ? "text-red-600 dark:text-red-400"
                                        : "text-gray-700 dark:text-gray-300"
                                )}
                            >
                                {action.icon}
                                {action.label}
                            </button>
                        ))}
                        {onDelete && (
                            <button
                                onClick={() => {
                                    onDelete(item);
                                    setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// Helper function to get nested object values
function getNestedValue(obj: unknown, key: string): unknown {
    const keys = key.split(".");
    let value: unknown = obj;
    for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
    }
    return value;
}

// Helper function to generate page numbers with ellipsis
function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        if (currentPage > 3) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return pages;
}
