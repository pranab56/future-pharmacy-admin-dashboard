"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Contact,
  Search
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

// Sample data
const generateData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      id: i + 1,
      no: '01',
      patientName: 'Jane Cooper',
      transferFrom: 'Medplus',
      transferTo: 'CityCare',
      rxId: 'RX1023',
      date: '15/01/2025'
    });
  }
  return data;
};

export default function PrescriptionTransferRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allData = generateData();
  const totalRequests = 35;
  const pendingRequests = 10;
  const completedRequests = 20;

  // Filter data
  const filteredData = allData.filter(item => {
    return searchQuery === '' ||
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
  });

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
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

  return (
    <div className="">
      <div className="">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-cyan-100 border-0 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white rounded-lg p-3">
                <Contact className="h-6 w-6 text-cyan-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{totalRequests}</span>
            </div>
            <h3 className="text-cyan-600 font-medium">Total Transfer Requests</h3>
          </Card>

          <Card className="bg-orange-50 border-0 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white rounded-lg p-3">
                <Contact className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{pendingRequests}</span>
            </div>
            <h3 className="text-orange-400 font-medium">Total Transfer Requests Pending</h3>
          </Card>

          <Card className="bg-green-100 border-0 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-white rounded-lg p-3">
                <Contact className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{completedRequests}</span>
            </div>
            <h3 className="text-green-600 font-medium">Total Transfer Requests Completed</h3>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-gray-900">
                Prescription Transfer Requests
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

            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Type Something"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">No</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Transfer From</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Transfer To</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">RX ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.no}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.patientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.transferFrom}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.transferTo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.rxId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.date}</td>
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
    </div>
  );
}