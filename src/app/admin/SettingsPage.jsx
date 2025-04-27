'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to update settings
      // await fetch('/api/admin/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings),
      // });
      toast.success('Settings updated successfully!', {
        duration: 3000,
        className: 'bg-green-500 text-white border border-green-700 rounded-xl shadow-md',
      });
    } catch (error) {
      toast.error('Failed to update settings.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleChange}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Email Notifications</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="smsNotifications"
            checked={settings.smsNotifications}
            onChange={handleChange}
            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">SMS Notifications</label>
        </div>
        <Button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Save Settings
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;