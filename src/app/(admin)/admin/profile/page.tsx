"use client";

import { useState, useRef, useEffect } from "react";
import { Save, User, Camera, Lock, X } from "lucide-react";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, Avatar, Textarea, PasswordStrength } from "@/components/ui";
import { useUser } from "@/hooks/useUser";
import { api } from "@/lib/api";
import { getAvatarUrl } from "@/lib/utils";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

// Email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone validation (international format)
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

interface ProfileFormData {
    name: string;
    email: string;
    phone?: string;
    bio?: string;
}

interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ProfilePage() {
    const { user, loading: userLoading } = useUser();
    const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Profile form state
    const [profileData, setProfileData] = useState<ProfileFormData>({
        name: "",
        email: "",
        phone: "",
        bio: "",
    });
    const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});

    // Image upload state
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Password form state
    const [passwordData, setPasswordData] = useState<PasswordFormData>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordErrors, setPasswordErrors] = useState<Partial<Record<keyof PasswordFormData, string>>>({});

    // Initialize profile data from user
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phone: "",
                bio: "",
            });
            setImagePreview(getAvatarUrl(user.avatar));
        }
    }, [user]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImageError(null);

        if (!file) return;

        // Validate file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setImageError("Please upload a valid image file (JPEG, PNG, GIF, or WebP)");
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setImageError("Image size must be less than 2MB");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            setImageFile(file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateProfileForm = (): boolean => {
        const errors: Partial<Record<keyof ProfileFormData, string>> = {};

        if (!profileData.name.trim()) {
            errors.name = "Name is required";
        }

        if (!profileData.email.trim()) {
            errors.email = "Email is required";
        } else if (!EMAIL_REGEX.test(profileData.email)) {
            errors.email = "Please enter a valid email address";
        }

        if (profileData.phone && !PHONE_REGEX.test(profileData.phone)) {
            errors.phone = "Please enter a valid phone number";
        }

        setProfileErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveProfile = async () => {
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!validateProfileForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Update profile data
            await api.patch("/auth/profile", profileData);

            // Upload avatar if changed
            if (imageFile) {
                const formData = new FormData();
                formData.append("avatar", imageFile);
                await api.post("/auth/avatar", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            setSuccessMessage("Profile updated successfully");
            // Optionally refresh user data
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const validatePasswordForm = (): boolean => {
        const errors: Partial<Record<keyof PasswordFormData, string>> = {};

        if (!passwordData.currentPassword) {
            errors.currentPassword = "Current password is required";
        }

        if (!passwordData.newPassword) {
            errors.newPassword = "New password is required";
        } else if (passwordData.newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters";
        }

        if (!passwordData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (passwordData.newPassword !== passwordData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePassword = async () => {
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!validatePasswordForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await api.post("/auth/change-password", {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setSuccessMessage("Password changed successfully");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Failed to change password");
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Lock },
    ];

    if (userLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage your account settings and preferences
                    </p>
                </div>
            </div>

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                    <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
                </div>
            )}
            {errorMessage && (
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                    <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
                </div>
            )}

            {/* Profile Header Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-6 sm:flex-row">
                        <div className="relative">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-800">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt={profileData.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Avatar name={profileData.name} size="xl" className="h-full w-full object-cover" />
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors"
                                title="Upload photo"
                            >
                                <Camera className="h-4 w-4" />
                            </button>
                            {imagePreview && (
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
                                    title="Remove photo"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            )}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{profileData.email}</p>
                            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                            </p>
                            {imageError && (
                                <p className="mt-2 text-sm text-red-500">{imageError}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                Max 2MB (JPEG, PNG, GIF, WebP)
                            </p>
                        </div>
                        <div className="ml-auto">
                            <Button onClick={handleSaveProfile} isLoading={isLoading}>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? "border-primary-500 text-primary-600 dark:border-primary-400 dark:text-primary-400"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    }`}
                            >
                                <Icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
                <div className="grid gap-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
                                    <User className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="Full Name"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    error={profileErrors.name}
                                />
                                <Input
                                    label="Email"
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    error={profileErrors.email}
                                />
                                <Input
                                    label="Phone"
                                    type="tel"
                                    value={profileData.phone || ""}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    placeholder="Enter your phone number (e.g., +1234567890)"
                                    error={profileErrors.phone}
                                />
                                <Textarea
                                    label="Bio"
                                    value={profileData.bio || ""}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfileData({ ...profileData, bio: e.target.value })}
                                    placeholder="Tell us about yourself"
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                                    <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <CardTitle>Change Password</CardTitle>
                                    <CardDescription>Update your password for better security</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    placeholder="Enter current password"
                                    error={passwordErrors.currentPassword}
                                />
                                <div>
                                    <Input
                                        label="New Password"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        placeholder="Enter new password"
                                        error={passwordErrors.newPassword}
                                    />
                                    {passwordData.newPassword && (
                                        <div className="mt-3">
                                            <PasswordStrength password={passwordData.newPassword} />
                                        </div>
                                    )}
                                </div>
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    placeholder="Confirm new password"
                                    error={passwordErrors.confirmPassword}
                                />
                                <Button onClick={handleChangePassword} isLoading={isLoading}>
                                    Update Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
