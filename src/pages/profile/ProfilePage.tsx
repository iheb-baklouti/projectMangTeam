import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Phone, Camera } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useUser } from '../../contexts/UserContext';

const ProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data
  const profileData = {
    phone: '+1 234 567 890',
    address: '123 Sports Street, Athletic City, AC 12345',
    birthDate: '1990-05-15',
    emergencyContact: 'Jane Doe (+1 234 567 891)',
    joinDate: '2022-01-15',
    nationality: 'United States',
    languages: ['English', 'Spanish'],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your personal information
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <Card.Content className="p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={user?.name}
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-neutral-200 hover:bg-neutral-50">
                <Camera className="h-4 w-4 text-neutral-600" />
              </button>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-semibold text-neutral-900">{user?.name}</h2>
              <p className="text-neutral-500">{user?.email}</p>
              <p className="mt-1 text-sm text-neutral-500 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Personal Information */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <Card.Title>Personal Information</Card.Title>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={user?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={user?.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Phone</label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={profileData.phone}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Address</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={profileData.address}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Birth Date</label>
                <input
                  type="date"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={profileData.birthDate}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Emergency Contact</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm disabled:bg-neutral-50"
                  defaultValue={profileData.emergencyContact}
                />
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Club Information</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <div className="ml-3">
                  <p className="text-sm text-neutral-500">Joined Date</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {new Date(profileData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-neutral-400" />
                <div className="ml-3">
                  <p className="text-sm text-neutral-500">Role</p>
                  <p className="text-sm font-medium text-neutral-900 capitalize">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </div>
              {user?.role === 'player' && (
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-neutral-400" />
                  <div className="ml-3">
                    <p className="text-sm text-neutral-500">Position</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {user?.position || 'Forward'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Personal Details</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-neutral-400" />
                <div className="ml-3">
                  <p className="text-sm text-neutral-500">Nationality</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {profileData.nationality}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-neutral-400" />
                <div className="ml-3">
                  <p className="text-sm text-neutral-500">Languages</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {profileData.languages.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-neutral-400" />
                <div className="ml-3">
                  <p className="text-sm text-neutral-500">Contact</p>
                  <p className="text-sm font-medium text-neutral-900">
                    {profileData.phone}
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;