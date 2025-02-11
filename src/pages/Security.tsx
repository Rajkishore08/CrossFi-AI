import React from 'react';
import { Shield, Key, Smartphone, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const securityItems = [
  {
    title: '2-Factor Authentication',
    status: 'Enabled',
    icon: Smartphone,
    description: 'Additional security layer using authenticator app',
  },
  {
    title: 'Hardware Wallet',
    status: 'Connected',
    icon: Key,
    description: 'Ledger Nano X',
  },
  {
    title: 'Transaction Signing',
    status: 'Required',
    icon: Shield,
    description: 'All transactions require explicit approval',
  },
];

const recentActivity = [
  {
    action: 'Login Attempt',
    status: 'Success',
    timestamp: '2024-03-15 14:30',
    location: 'New York, US',
    ip: '192.168.1.1',
  },
  {
    action: 'Password Change',
    status: 'Success',
    timestamp: '2024-03-14 09:15',
    location: 'New York, US',
    ip: '192.168.1.1',
  },
  {
    action: 'Login Attempt',
    status: 'Failed',
    timestamp: '2024-03-13 16:45',
    location: 'London, UK',
    ip: '10.0.0.1',
  },
];

function Security() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Security Settings</h1>

      {/* Security Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {securityItems.map((item) => (
          <div key={item.title} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <item.icon className="text-blue-400" size={24} />
              </div>
              <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm">
                {item.status}
              </span>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Security Actions */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Security Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 text-white font-medium">
            Change Password
          </button>
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 text-white font-medium">
            Setup 2FA
          </button>
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-200 text-white font-medium">
            Connect Hardware Wallet
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                {activity.status === 'Success' ? (
                  <CheckCircle2 className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-red-400" size={20} />
                )}
                <div>
                  <h3 className="font-medium text-white">{activity.action}</h3>
                  <p className="text-sm text-gray-400">
                    {activity.timestamp} • {activity.location}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-400">{activity.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Security;