"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, FileSpreadsheet, FileText, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

// Define interfaces
interface Transaction {
  id: string;
  pharmacyName: string;
  patientName: string;
  amount: string;
  date: string;
  status: 'Successful' | 'Failed' | 'Refunded';
}

// Mock data - all transactions have the same ID as shown in the image
const generateTransactions = (): Transaction[] => {
  const statuses: Transaction['status'][] = ['Successful', 'Failed', 'Refunded'];
  const transactions: Transaction[] = [];

  for (let i = 0; i < 24; i++) {
    const statusIndex = i % 9;
    let status: Transaction['status'];
    if (statusIndex === 1 || statusIndex === 6) {
      status = 'Failed';
    } else if (statusIndex === 3 || statusIndex === 8) {
      status = 'Refunded';
    } else {
      status = 'Successful';
    }

    transactions.push({
      id: '#78578',
      pharmacyName: 'CVS Pharmacy',
      patientName: 'Jane Cooper',
      amount: '$50.00',
      date: '15/01/2025',
      status: status
    });
  }

  return transactions;
};

const ITEMS_PER_PAGE = 10;

export default function TransactionsList() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allTransactions = useMemo(() => generateTransactions(), []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      const matchesSearch = searchQuery === '' ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.pharmacyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.patientName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        transaction.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [allTransactions, searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const getStatusStyles = (status: Transaction['status']): string => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'Failed':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'Refunded':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      default:
        return '';
    }
  };

  const renderPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Transactions list</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 bg-green-50 border-green-200 hover:bg-green-100">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 bg-green-50 border-green-200 hover:bg-green-100">
                <FileText className="h-5 w-5 text-green-600" />
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10 bg-red-50 border-red-200 hover:bg-red-100">
                <Download className="h-5 w-5 text-red-600" />
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
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pharmacy Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.pharmacyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.patientName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <Badge className={`${getStatusStyles(transaction.status)} font-medium`}>
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} entries
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-gray-600"
            >
              Prev
            </Button>

            {renderPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={index} className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <Button
                  key={index}
                  variant={currentPage === page ? "default" : "ghost"}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={currentPage === page ? "bg-purple-600 hover:bg-purple-700 text-white" : "text-gray-600"}
                >
                  {typeof page === 'number' && page < 10 ? `0${page}` : page}
                </Button>
              )
            ))}

            <Button
              variant="ghost"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-gray-600"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}