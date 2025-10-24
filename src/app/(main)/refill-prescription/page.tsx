"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// Define interfaces
interface PrescriptionRequest {
  id: number;
  refId: string;
  patientName: string;
  prescription: string;
  pharmacyName: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

// Sample data
const generateData = (): PrescriptionRequest[] => {
  const data: PrescriptionRequest[] = [];

  for (let i = 0; i < 24; i++) {
    let status: PrescriptionRequest['status'];
    if (i % 3 === 0) status = 'Approved';
    else if (i % 3 === 1) status = 'Pending';
    else status = 'Rejected';

    data.push({
      id: i + 1,
      refId: 'REF-1024',
      patientName: 'Jane Cooper',
      prescription: 'Lisinopril',
      pharmacyName: 'CVS Pharmacy',
      date: '15/01/2025',
      status: status
    });
  }
  return data;
};

export default function RefillPrescriptionRequests() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const allData = generateData();

  // Filter data
  const filteredData = allData.filter(item => {
    const matchesSearch = searchQuery === '' ||
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus = statusFilter === 'all' ||
      item.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const getStatusBadgeClass = (status: PrescriptionRequest['status']): string => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'Rejected':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Refill Prescription Requests
            </h1>
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

          {/* Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Type Something"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
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
              <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ref ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Prescription</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Pharmacy Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.refId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.prescription}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.pharmacyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeClass(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Image src="/icons/users/success.png" alt="view details" width={20} height={20} />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Image src="/icons/users/block.png" alt="view details" width={20} height={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-gray-600 hover:bg-gray-100"
            >
              Prev
            </Button>

            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-1 text-gray-400">...</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  >
                    {String(page).padStart(2, '0')}
                  </Button>
                )}
              </React.Fragment>
            ))}

            <Button
              variant="ghost"
              size="sm"
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
  );
}