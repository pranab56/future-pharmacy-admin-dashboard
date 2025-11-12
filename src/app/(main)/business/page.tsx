"use client";

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { ReactElement, ReactNode, useState } from 'react';
import StatCard from '../../../components/common/StatCard';
import { Button } from '../../../components/ui/button';

// Tab Component Props
interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

interface TabsListProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

interface TabsTriggerProps {
  children: ReactNode;
  tabValue: string;
  value: string;
  onValueChange: (value: string) => void;
}

interface TabsContentProps {
  children: ReactNode;
  tabValue: string;
  value: string;
}

// Data Interfaces
interface PharmacyData {
  no: string;
  pharmacyName: string;
  licenseNumber: string;
  email: string;
  address: string;
  contactPerson: string;
}

interface DriverData {
  no: string;
  name: string;
  email: string;
  vehicleType: string;
  license: string;
}

interface InvestorData {
  no: string;
  investorName: string;
  companyName: string;
  email: string;
}

// Tabs Component
const Tabs = ({ value, onValueChange, children }: TabsProps) => {
  return (
    <div className="w-full">
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as ReactElement<TabsListProps | TabsTriggerProps | TabsContentProps>, { value, onValueChange })
          : child
      )}
    </div>
  );
};

const TabsList = ({ children, value, onValueChange }: TabsListProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as ReactElement<TabsTriggerProps>, { value, onValueChange })
          : child
      )}
    </div>
  );
};

const TabsTrigger = ({ children, tabValue, value, onValueChange }: TabsTriggerProps) => {
  const isActive = value === tabValue;
  return (
    <button
      onClick={() => onValueChange(tabValue)}
      className={`px-6 py-3 text-sm font-medium transition-colors relative ${isActive
        ? 'text-gray-900'
        : 'text-gray-500 hover:text-gray-700'
        }`}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
      )}
    </button>
  );
};

const TabsContent = ({ children, tabValue, value }: TabsContentProps) => {
  if (value !== tabValue) return null;
  return <div>{children}</div>;
};

// Pharmacy Component
const PharmacyTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  const pharmacyData: PharmacyData[] = Array(10).fill(null).map(() => ({
    no: '01',
    pharmacyName: 'Medplus Health',
    licenseNumber: '#123458957',
    email: 'info@example.com',
    address: 'New York, USA',
    contactPerson: 'Jane Cooper'
  }));



  return (
    <div className='flex flex-col gap-5'>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative w-6/12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Type Something"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className='w-3/12'>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='w-3/12'>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className=" rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pharmacy Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pharmacyData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.pharmacyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.licenseNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.contactPerson}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-green-600 cursor-pointer hover:text-green-700">
                      <Image src="/icons/users/success.png" alt="view details" width={20} height={20} />
                    </button>
                    <button className="p-1 text-red-600 cursor-pointer hover:text-red-700">
                      <Image src="/icons/users/block.png" alt="view details" width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 24 entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Prev</button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">01</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">02</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">03</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">04</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">05</button>
          <span className="px-3 py-1 text-sm text-gray-600">...</span>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">24</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Next</button>
        </div>
      </div>
    </div>
  );
};

// Driver Component
const DriverTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  const driverData: DriverData[] = Array(10).fill(null).map(() => ({
    no: '01',
    name: 'Jin Cooper',
    email: 'info@example.com',
    vehicleType: 'Pickup truck',
    license: '/api/placeholder/80/50'
  }));

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative w-6/12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Type Something"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className='w-3/12'>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='w-3/12'>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driving License</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {driverData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.vehicleType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-20 h-12 bg-blue-100 rounded flex items-center justify-center text-xs text-blue-600">
                    License
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-green-600 cursor-pointer hover:text-green-700">
                      <Image src="/icons/users/success.png" alt="view details" width={20} height={20} />
                    </button>
                    <button className="p-1 text-red-600 cursor-pointer hover:text-red-700">
                      <Image src="/icons/users/block.png" alt="view details" width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 24 entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Prev</button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">01</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">02</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">03</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">04</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">05</button>
          <span className="px-3 py-1 text-sm text-gray-600">...</span>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">24</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Next</button>
        </div>
      </div>
    </div>
  );
};

// Investor Component
const InvestorTab = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [status, setStatus] = useState<string>('all');

  const investorData: InvestorData[] = Array(10).fill(null).map(() => ({
    no: '01',
    investorName: 'Jane Cooper',
    companyName: 'Medplus Health',
    email: 'info@example.com'
  }));

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative w-6/12">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Type Something"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className='w-3/12'>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='w-3/12'>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investorData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.no}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.investorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button className="p-1 text-green-600 cursor-pointer hover:text-green-700">
                      <Image src="/icons/users/success.png" alt="view details" width={20} height={20} />
                    </button>
                    <button className="p-1 text-red-600 cursor-pointer hover:text-red-700">
                      <Image src="/icons/users/block.png" alt="view details" width={20} height={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 24 entries
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Prev</button>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">01</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">02</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">03</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">04</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">05</button>
          <span className="px-3 py-1 text-sm text-gray-600">...</span>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">24</button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">Next</button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState<string>('pharmacy');

  const stats = [
    {
      icon: "/icons/overview/incoming.png",
      value: 25,
      label: "Incoming Requests",
      bgColor: "bg-[#FFDEE7]",
      iconBgColor: "bg-white",
      iconColor: "text-pink-500",
      textColor: "text-pink-600",
    },
    {
      icon: "/icons/overview/driver.png",
      value: 15,
      label: "Active Drivers",
      bgColor: "bg-[#D6F2E4]",
      iconBgColor: "bg-white",
      iconColor: "text-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      icon: "/icons/overview/active-users.png",
      value: 152,
      label: "Active Users",
      bgColor: "bg-[#FFF0D9]",
      iconBgColor: "bg-white",
      iconColor: "text-amber-500",
      textColor: "text-amber-600",
    },
  ];


  return (
    <div className='flex flex-col gap-5'>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>


      <div className="p-6 shadow bg-white rounded-lg">
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList value={activeTab} onValueChange={setActiveTab}>
                  <TabsTrigger tabValue="pharmacy" value={activeTab} onValueChange={setActiveTab}>
                    Pharmacy
                  </TabsTrigger>
                  <TabsTrigger tabValue="driver" value={activeTab} onValueChange={setActiveTab}>
                    Driver
                  </TabsTrigger>
                  <TabsTrigger tabValue="investor" value={activeTab} onValueChange={setActiveTab}>
                    Investor
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-11 w-11 bg-gray-100 hover:bg-gray-100 border-gray-200">
                <Image src="/icons/refill-prescription/csv.png" alt="view details" width={28} height={28} />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 bg-gray-100 hover:bg-gray-100 border-gray-200">
                <Image src="/icons/refill-prescription/docs.png" alt="view details" width={28} height={28} />
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 bg-gray-100 hover:bg-gray-100 border-gray-200">
                <Image src="/icons/refill-prescription/pdf.png" alt="view details" width={28} height={28} className='w-8 h-8' />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent tabValue="pharmacy" value={activeTab}>
              <PharmacyTab />
            </TabsContent>
            <TabsContent tabValue="driver" value={activeTab}>
              <DriverTab />
            </TabsContent>
            <TabsContent tabValue="investor" value={activeTab}>
              <InvestorTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}