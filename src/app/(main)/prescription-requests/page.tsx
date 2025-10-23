"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { format } from 'date-fns';
import { CalendarIcon, Eye, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface PrescriptionRequest {
  id: string;
  patientName: string;
  pharmacyName: string;
  dateTime: string;
}

const PrescriptionRequestsTable = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pharmacyFilter, setPharmacyFilter] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  // Sample data - all entries are the same as in the image
  const requests: PrescriptionRequest[] = Array(10).fill({
    id: '#78578',
    patientName: 'Jane Cooper',
    pharmacyName: 'CVS Pharmacy',
    dateTime: '2025-07-26 10:00 pm'
  });

  const totalPages = 24;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 5) {
        pages.push('...');
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        if (i > 0) pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="">
      <div className="">

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            All Prescription Requests
          </h1>

          <div className="pb-4">
            <div className="flex items-center justify-between gap-5">
              {/* Search Input */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Type Something"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>

              {/* Status Filter */}
              <div className='w-full'>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white w-full border-gray-300">
                    <SelectValue placeholder="Status: All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Status: All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Picker with shadcn */}
              <div className='w-full'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-white"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      {date ? format(date, "MM/dd/yy") : <span className="text-gray-500">mm/dd/yy</span>}
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

              {/* Pharmacy Filter */}
              <div className='w-full'>
                <Select value={pharmacyFilter} onValueChange={setPharmacyFilter}>
                  <SelectTrigger className="bg-white w-full border-gray-300">
                    <SelectValue placeholder="Pharmacy: All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Pharmacy: All</SelectItem>
                    <SelectItem value="cvs">CVS Pharmacy</SelectItem>
                    <SelectItem value="walgreens">Walgreens</SelectItem>
                    <SelectItem value="walmart">Walmart Pharmacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Pharmacy Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Date/Time
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.patientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.pharmacyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.dateTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Plus className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to 10 of 10 entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-gray-600 hover:bg-gray-100"
              >
                Prev
              </Button>

              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-600">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "ghost"}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {String(page).padStart(2, '0')}
                    </Button>
                  )}
                </React.Fragment>
              ))}

              <Button
                variant="ghost"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-gray-600 hover:bg-gray-100"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRequestsTable;