'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DownloadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient & Pharmacy Info */}
          <Card>
            <CardHeader>
              <CardTitle>Patient & Pharmacy Info</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-purple-600 mb-2">Patient Information</h3>
                <div className="space-y-1 text-base">
                  <p><span className="font-medium">Name:</span> Jane Cooper</p>
                  <p><span className="font-medium">Phone:</span> (406) 555-0120</p>
                  <p><span className="font-medium">Address:</span> 3891 Ranchview Dr. Richardson</p>
                  <p><span className="font-medium">DOB:</span> 01/15/1990</p>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-purple-600 mb-2">Pharmacy Information</h3>
                <div className="space-y-1 text-base">
                  <p><span className="font-medium">Name:</span> Medicare Pharmacy</p>
                  <p><span className="font-medium">Address:</span> 3891 Ranchview Dr. Richardson</p>
                  <p><span className="font-medium">Contact:</span> (406) 555-0120</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prescription Details */}
          <Card>
            <CardHeader>
              <CardTitle>Prescription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="flex items-center gap-2">
                <DownloadIcon className="h-4 w-4" />
                Download
              </Button>
              <div>
                <Label htmlFor="medicineNotes">Medicine Notes</Label>
                <Textarea
                  id="medicineNotes"
                  placeholder="Type your medicine notes here..."
                  className="mt-2 h-32 bg-gray-100"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Assign Driver */}
              <div className='w-full'>
                <h3 className="text-base font-medium mb-2">Assign Driver</h3>
                <Select>
                  <SelectTrigger className='w-full cursor-pointer'>
                    <SelectValue placeholder="Select a Driver..." />
                  </SelectTrigger>
                  <SelectContent className='cursor-pointer'>
                    <SelectItem value="driver1">Driver 1</SelectItem>
                    <SelectItem value="driver2">Driver 2</SelectItem>
                    <SelectItem value="driver3">Driver 3</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => router.push("/prescription-requests/driver-tracking")} className="mt-4 w-full">Assign Driver</Button>
              </div>

              {/* Change Status */}
              <div>
                <h3 className="text-base font-medium mb-3">Change Status</h3>
                <RadioGroup defaultValue="pending" className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" className="accent-[#8E4585]" />
                    <Label htmlFor="pending">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inprogress" id="inprogress" className="accent-[#8E4585]" />
                    <Label htmlFor="inprogress">In Progress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="completed" id="completed" className="accent-[#8E4585]" />
                    <Label htmlFor="completed">Completed</Label>
                  </div>
                </RadioGroup>
                <Button className="mt-4 w-full">Update Status</Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}