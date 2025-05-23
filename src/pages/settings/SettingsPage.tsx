import React, { useState, useEffect } from 'react';
import { Bell, Lock, Eye, EyeOff, Monitor, Moon, Sun } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { theme, setTheme } = useTheme();

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    matches: true,
    team: true,
    performance: true,
    system: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system';
    setTheme(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  };

  const handleNotificationChange = async (key: keyof typeof notifications) => {
    const updated = {
      ...notifications,
      [key]: !notifications[key],
    };
    setNotifications(updated);
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/me/settings/notifications`, updated);
    } catch {
      alert("Failed to update notification settings.");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      alert("New passwords do not match.");
      return;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        currentPassword: passwordForm.current,
        newPassword: passwordForm.new,
        confirmPassword: passwordForm.confirm,
      });
      alert("Password updated successfully.");
      setPasswordForm({ current: '', new: '', confirm: '' });
    } catch (err) {
      alert("Error updating password.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Settings</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Password Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-neutral-500 mr-2" />
            <Card.Title>Password Settings</Card.Title>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Current Password</label>
              <div className="mt-1 relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff className="h-5 w-5 text-neutral-400" /> : <Eye className="h-5 w-5 text-neutral-400" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">New Password</label>
              <div className="mt-1 relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff className="h-5 w-5 text-neutral-400" /> : <Eye className="h-5 w-5 text-neutral-400" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
              />
            </div>

            <div className="pt-4">
              <Button variant="primary" onClick={handlePasswordChange}>Update Password</Button>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-neutral-500 mr-2" />
            <Card.Title>Notification Settings</Card.Title>
          </div>
        </Card.Header>
        <Card.Content>
          {Object.entries(notifications).map(([key, value]) => (
            <div className="flex items-center justify-between py-2" key={key}>
              <div>
                <h4 className="text-sm font-medium text-neutral-900 dark:text-white capitalize">{key} Notifications</h4>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${value ? 'bg-primary-600' : 'bg-neutral-200'}`}
                onClick={() => handleNotificationChange(key as keyof typeof notifications)}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${value ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          ))}
        </Card.Content>
      </Card>

      {/* Theme Settings */}
      <Card>
        <Card.Header>
          <div className="flex items-center">
            <Monitor className="h-5 w-5 text-neutral-500 mr-2" />
            <Card.Title>Theme Settings</Card.Title>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-3 gap-4">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                className={`p-4 rounded-lg border ${theme === t ? 'border-primary-500 bg-primary-50 dark:bg-neutral-800' : 'border-neutral-200 hover:border-primary-200 dark:border-neutral-600 dark:hover:border-primary-400'}`}
                onClick={() => setTheme(t)}
              >
                {t === 'light' && <Sun className="h-6 w-6 mx-auto mb-2 text-neutral-600 dark:text-white" />}
                {t === 'dark' && <Moon className="h-6 w-6 mx-auto mb-2 text-neutral-600 dark:text-white" />}
                {t === 'system' && <Monitor className="h-6 w-6 mx-auto mb-2 text-neutral-600 dark:text-white" />}
                <p className="text-sm font-medium text-neutral-900 dark:text-white capitalize">{t}</p>
              </button>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SettingsPage;
