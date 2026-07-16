"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useStore } from "@/lib/store";

export default function SettingsPage() {
  const { user, setUser } = useStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profile */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Button className="mt-4" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
            {saved ? "✅ Saved!" : "Save Changes"}
          </Button>
        </Card>

        {/* Change Password */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
          <div className="space-y-4">
            <Input label="Current Password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <Input label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Button>Update Password</Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-800">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </div>
  );
}
