"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "trips", label: "Trips", icon: "✈️" },
    { id: "blogs", label: "Blogs", icon: "📝" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  const stats = [
    { label: "Total Users", value: "12,847", change: "+12%" },
    { label: "Trips Created", value: "52,314", change: "+24%" },
    { label: "Active Premium", value: "3,421", change: "+8%" },
    { label: "Revenue", value: "$48,290", change: "+18%" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >{tab.icon} {tab.label}</button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => (
                <Card key={s.label}>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</span>
                    <span className="text-xs text-green-600">{s.change}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                {["New user registered", "Trip completed", "Premium subscription", "Blog published"].map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{a}</span>
                    <span className="ml-auto text-xs text-gray-400">{`${i + 1}h ago`}</span>
                  </div>
                ))}
              </Card>
              <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {["Manage Users", "Moderate Content", "View Reports", "System Settings"].map((action, i) => (
                    <Button key={i} variant="outline" className="w-full justify-start">{action}</Button>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-3">User</th><th className="pb-3">Email</th><th className="pb-3">Status</th><th className="pb-3">Joined</th><th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Sarah Johnson", email: "sarah@example.com", status: "Active", date: "Jan 15, 2025" },
                    { name: "Mike Chen", email: "mike@example.com", status: "Premium", date: "Mar 3, 2025" },
                    { name: "Emma Davis", email: "emma@example.com", status: "Active", date: "Apr 22, 2025" },
                  ].map((u) => (
                    <tr key={u.email} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">{u.name}</td>
                      <td className="py-3 text-gray-500">{u.email}</td>
                      <td className="py-3"><Badge variant={u.status === "Premium" ? "success" : "info"}>{u.status}</Badge></td>
                      <td className="py-3 text-gray-500">{u.date}</td>
                      <td className="py-3">
                        <Button size="sm" variant="ghost">Edit</Button>
                        <Button size="sm" variant="danger">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab !== "dashboard" && activeTab !== "users" && (
          <Card className="text-center py-12">
            <span className="text-5xl block mb-4">🔧</span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{activeTab} Management</h3>
            <p className="text-sm text-gray-500">This section is available in the full admin panel.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
