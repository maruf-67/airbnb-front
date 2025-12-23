export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Stats Cards */}
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Loading...</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Posts</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Loading...</dd>
                </div>
            </div>
        </div>
    );
}
