"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Define interfaces
interface Notification {
  id: string;
  recipient: string;
  role: string;
  title: string;
  dateTime: string;
  status: 'Sent' | 'Pending' | 'Failed';
}

const NotificationSystem = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form state
  const [audience, setAudience] = useState<string>('patients');
  const [notificationType, setNotificationType] = useState<string>('request-update');
  const [emailSearch, setEmailSearch] = useState<string>('');
  const [messageTitle, setMessageTitle] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Sample notification data
  const notifications: Notification[] = [
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Sent' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Pending' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Failed' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Sent' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Pending' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Sent' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Failed' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Sent' },
    { id: '#78578', recipient: 'Driver: Alex', role: 'Driver', title: 'New Order Assigned', dateTime: '2025-07-12 10:00 AM', status: 'Pending' },
  ];

  const getStatusColor = (status: Notification['status']): string => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Failed':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendNotification = (): void => {
    console.log({
      audience,
      notificationType,
      emailSearch,
      messageTitle,
      messageContent,
      date: date ? format(date, 'MM/dd/yyyy') : ''
    });
    setIsDialogOpen(false);
    // Reset form
    setAudience('patients');
    setNotificationType('request-update');
    setEmailSearch('');
    setMessageTitle('');
    setMessageContent('');
    setDate(undefined);
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}


        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-5">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Notification History</h1>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className=" text-white"
            >
              <Image src="/icons/overview/assign.png" alt="view details" width={20} height={20} /> Send New Notification
            </Button>
          </div>
          <div className="flex gap-4 pt-5">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Type Something"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto pt-5">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Notif. ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notif, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{notif.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{notif.recipient}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{notif.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{notif.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{notif.dateTime}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(notif.status)}`}>
                        {notif.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing 1 to 10 of 24 entries
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
                Prev
              </Button>
              <Button className=" text-white" size="sm">01</Button>
              <Button variant="outline" size="sm">02</Button>
              <Button variant="outline" size="sm">03</Button>
              <Button variant="outline" size="sm">04</Button>
              <Button variant="outline" size="sm">05</Button>
              <span className="px-2">...</span>
              <Button variant="outline" size="sm">24</Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Send Notification Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Send Notification</DialogTitle>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            </DialogHeader>

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className='w-full'>
                  <label className="text-sm font-medium mb-2 block">Audience</label>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patients">Patients</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='w-full'>
                  <label className="text-sm font-medium mb-2 block">Notification Type</label>
                  <Select value={notificationType} onValueChange={setNotificationType}>
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="request-update">Request Update</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by name or ID"
                    value={emailSearch}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message Title</label>
                <Input
                  type="text"
                  placeholder="e.g Important Update on Your Delivery"
                  value={messageTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message Content</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageContent(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {date ? format(date, "MM/dd/yyyy") : <span className="text-gray-500">MM/DD/YYYY</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendNotification}
                  className=" text-white"
                >
                  Send now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NotificationSystem;