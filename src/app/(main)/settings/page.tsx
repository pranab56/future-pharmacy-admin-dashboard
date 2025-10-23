"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar, Shield, User } from 'lucide-react';
import { useState } from 'react';

export default function UserProfilePage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'demo@demogmail.com',
    phone: '706-455-5214',
    dob: '12/08/1988',
    gender: 'Male'
  });

  const [editFormData, setEditFormData] = useState({
    firstName: 'Jhon',
    lastName: 'Deo',
    email: 'example@demo.com',
    phone: '0128745686769',
    gender: 'Male',
    dob: '20/08/1988'
  });

  const activityLog = [
    {
      icon: User,
      title: 'Profile Updated',
      description: 'Changed Phone Number',
      time: '2 hours ago',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Calendar,
      title: 'Appointment Created',
      description: 'Scheduled Appointment with John Doe.',
      time: '2 hours ago',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Security Settings Updated',
      description: 'Enabled Two-Factor Authentication',
      time: '2 hours ago',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const handleSaveChanges = () => {
    setProfileData({
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      phone: editFormData.phone,
      dob: editFormData.dob,
      gender: editFormData.gender
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="">
      <div className="">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              {/* Profile Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info Grid */}
              <div className="grid grid-cols-3 gap-x-16 gap-y-6 flex-1">
                <div>
                  <div className="text-sm text-gray-500 mb-1">First Name</div>
                  <div className="text-base font-medium text-gray-900">{profileData.firstName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Last Name</div>
                  <div className="text-base font-medium text-gray-900">{profileData.lastName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Gender</div>
                  <div className="text-base font-medium text-gray-900">{profileData.gender}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email Address</div>
                  <div className="text-base font-medium text-gray-900">{profileData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Phone Number</div>
                  <div className="text-base font-medium text-gray-900">{profileData.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">DOB</div>
                  <div className="text-base font-medium text-gray-900">{profileData.dob}</div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              className=" text-white px-6"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-4">
              <div className="text-base font-semibold mb-3">Password</div>
              <Input
                type="password"
                placeholder="Enter your password here..."
                className="max-w-md"
              />
            </div>
            <Button className=" text-white px-6 mt-7">
              Change password
            </Button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-base font-semibold mb-4">Security</div>
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium text-gray-900 mb-1">Two-Factor Authentication (2FA)</div>
              <div className="text-sm text-gray-500">Enable 2FA for enhanced security</div>
            </div>
            <Switch
              checked={is2FAEnabled}
              onCheckedChange={setIs2FAEnabled}
              className="data-[state=checked]:bg-[#8E4585] cursor-pointer"
            />
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-base font-semibold mb-6">Activity Log</div>
          <div className="space-y-6">
            {activityLog.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 mb-1">{activity.title}</div>
                  <div className="text-sm text-gray-600 mb-1">{activity.description}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Edit info</DialogTitle>
          </DialogHeader>

          <div className="text-sm text-gray-600 mb-4">
            Lorem ipsum dolor sit amet consectetur. aliquet nullam vitae lorem sagittis.
          </div>

          <div className="space-y-4">
            {/* First Name and Last Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  value={editFormData.firstName}
                  onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  value={editFormData.lastName}
                  onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Phone, Gender, DOB Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className='w-full'>
                <Label htmlFor="gender" className="text-sm font-medium mb-2 block">
                  Gender
                </Label>
                <Select value={editFormData.gender} onValueChange={(value) => setEditFormData({ ...editFormData, gender: value })}>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dob" className="text-sm font-medium mb-2 block">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  value={editFormData.dob}
                  onChange={(e) => setEditFormData({ ...editFormData, dob: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Dialog Footer Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              className=" text-white px-6"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}