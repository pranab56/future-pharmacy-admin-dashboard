"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Ban, CalendarIcon, Search, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';



interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

interface InputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
}

interface LabelProps {
  children: ReactNode;
  className?: string;
}

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'active' | 'inactive';
}

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Active' | 'Unactive';
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  address: string;
}

// Dialog Components with Animation
const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
};

const DialogContent = ({ children, className = '' }: DialogContentProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 animate-in zoom-in-95 fade-in duration-200 ${className}`}>
      {children}
    </div>
  );
};

// Input Component
const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

// Label Component
const Label = ({ children, className = '' }: LabelProps) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
      {children}
    </label>
  );
};

// Badge Component
const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const variants = {
    active: 'bg-cyan-100 text-cyan-700',
    inactive: 'bg-gray-200 text-gray-700',
    default: 'bg-gray-200 text-gray-700',
  };

  return (
    <span className={`px-3 py-1 rounded-md text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Main Component
export default function PatientManagement() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    address: '',
  });

  // All patients data (expanded for pagination)
  const allPatients: Patient[] = [
    { id: '#R78578', name: 'Jane Cooper', phone: '(406) 555-0120', email: 'deanna.curtis@example.com', status: 'Active' },
    { id: '#R78579', name: 'John Doe', phone: '(406) 555-0121', email: 'john.doe@example.com', status: 'Unactive' },
    { id: '#R78580', name: 'Sarah Smith', phone: '(406) 555-0122', email: 'sarah.smith@example.com', status: 'Active' },
    { id: '#R78581', name: 'Mike Johnson', phone: '(406) 555-0123', email: 'mike.johnson@example.com', status: 'Active' },
    { id: '#R78582', name: 'Emily Davis', phone: '(406) 555-0124', email: 'emily.davis@example.com', status: 'Unactive' },
    { id: '#R78583', name: 'David Wilson', phone: '(406) 555-0125', email: 'david.wilson@example.com', status: 'Active' },
    { id: '#R78584', name: 'Lisa Brown', phone: '(406) 555-0126', email: 'lisa.brown@example.com', status: 'Active' },
    { id: '#R78585', name: 'Tom Anderson', phone: '(406) 555-0127', email: 'tom.anderson@example.com', status: 'Active' },
    { id: '#R78586', name: 'Amy Taylor', phone: '(406) 555-0128', email: 'amy.taylor@example.com', status: 'Unactive' },
    { id: '#R78587', name: 'Robert Martinez', phone: '(406) 555-0129', email: 'robert.martinez@example.com', status: 'Active' },
    { id: '#R78588', name: 'Jennifer Garcia', phone: '(406) 555-0130', email: 'jennifer.garcia@example.com', status: 'Active' },
    { id: '#R78589', name: 'William Rodriguez', phone: '(406) 555-0131', email: 'william.rodriguez@example.com', status: 'Unactive' },
    { id: '#R78590', name: 'Jessica Lee', phone: '(406) 555-0132', email: 'jessica.lee@example.com', status: 'Active' },
    { id: '#R78591', name: 'Michael White', phone: '(406) 555-0133', email: 'michael.white@example.com', status: 'Active' },
    { id: '#R78592', name: 'Ashley Harris', phone: '(406) 555-0134', email: 'ashley.harris@example.com', status: 'Unactive' },
    { id: '#R78593', name: 'Christopher Clark', phone: '(406) 555-0135', email: 'christopher.clark@example.com', status: 'Active' },
    { id: '#R78594', name: 'Amanda Lewis', phone: '(406) 555-0136', email: 'amanda.lewis@example.com', status: 'Active' },
    { id: '#R78595', name: 'Matthew Walker', phone: '(406) 555-0137', email: 'matthew.walker@example.com', status: 'Unactive' },
    { id: '#R78596', name: 'Stephanie Hall', phone: '(406) 555-0138', email: 'stephanie.hall@example.com', status: 'Active' },
    { id: '#R78597', name: 'Daniel Allen', phone: '(406) 555-0139', email: 'daniel.allen@example.com', status: 'Active' },
    { id: '#R78598', name: 'Michelle Young', phone: '(406) 555-0140', email: 'michelle.young@example.com', status: 'Unactive' },
    { id: '#R78599', name: 'Joshua King', phone: '(406) 555-0141', email: 'joshua.king@example.com', status: 'Active' },
    { id: '#R78600', name: 'Rebecca Wright', phone: '(406) 555-0142', email: 'rebecca.wright@example.com', status: 'Active' },
    { id: '#R78601', name: 'Andrew Scott', phone: '(406) 555-0143', email: 'andrew.scott@example.com', status: 'Active' },
    { id: '#R78602', name: 'Laura Green', phone: '(406) 555-0144', email: 'laura.green@example.com', status: 'Unactive' },
  ];

  // Filter patients based on search and status
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = (): (number | string)[] => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: date || null
    }));
  };

  const handleSaveUser = () => {
    console.log('Saving user:', formData);
    setShowAddModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: null,
      address: '',
    });
  };

  const handleReject = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    console.log('Rejecting patient:', selectedPatient);
    setShowRejectModal(false);
    setSelectedPatient(null);
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when filter or search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };


  const handlePatient = (patientId: string) => {
    console.log('Handling patient with ID:', patientId);
    router.push(`/users/${patientId}`);
  }

  return (
    <div className="">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">All Users</h1>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-[#8E4585] hover:bg-[#8E4585] cursor-pointer">
            <Image src="/icons/overview/assign.png" alt="Assign Driver" width={20} height={20} />
            Add New Patient
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Type Something"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[200px] h-[200px] py-5 cursor-pointer">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent className='cursor-pointer'>
              <SelectItem value="All">Status: All</SelectItem>
              <SelectItem value="Active">Status: Active</SelectItem>
              <SelectItem value="Unactive">Status: Unactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">User ID</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Patient Name</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Phone</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Email</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.email}</td>
                  <td className="py-4 px-4">
                    <Badge variant={patient.status === 'Active' ? 'active' : 'inactive'}>
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => handlePatient(patient.name)} className="p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors">
                        <Image src="/icons/users/view.png" alt="view details" width={20} height={20} />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
                        <Image src="/icons/users/success.png" alt="success icon" width={20} height={20} />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
                        onClick={() => handleReject(patient)}
                      >
                        <Image src="/icons/users/block.png" alt="block icon" width={20} height={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing {filteredPatients.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} entries
          </p>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            {getPageNumbers().map((page, index) => (
              <Button
                key={index}
                variant={page === currentPage ? 'default' : 'ghost'}
                className={page === currentPage ? ' text-white' : 'text-gray-600'}
                onClick={() => handlePageClick(page)}
                disabled={typeof page !== 'number'}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="text-gray-600"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Add New User Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              <p className="text-sm text-gray-600">Enter the details below to add a new user to the system.</p>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  placeholder="Enter your first name here..."
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Enter your last name here..."
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label>Email Address</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email address here..."
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <Input
                  name="phone"
                  placeholder="Enter your phone number here..."
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10",
                        !formData.dateOfBirth && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? (
                        format(formData.dateOfBirth, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dateOfBirth || undefined}
                      onSelect={handleDateChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Input
                name="address"
                placeholder="Enter address here..."
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className='bg-[#8E4585] hover:bg-[#8E4585]' onClick={handleSaveUser}>
              Save User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-2xl">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Ban size={32} className="text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Rejected</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to rejected?</p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button onClick={confirmReject} className="">
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}