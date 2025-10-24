"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from 'next/image';

interface DeliveryRequest {
  requestId: string;
  patientName: string;
  pharmacy: string;
  deliveryAddress: string;
  driverAssigned: string;
  currentStatus: "In-Transit" | "Delivered" | "Pending" | "Failed" | "Cancelled";
  paymentStatus: "Paid" | "Free";
}

function RxDeliveryTable() {
  const deliveryRequests: DeliveryRequest[] = [
    {
      requestId: "#R78578",
      patientName: "Jane Cooper",
      pharmacy: "Medlplus",
      deliveryAddress: "Hawaii 81063",
      driverAssigned: "Jane Smith",
      currentStatus: "In-Transit",
      paymentStatus: "Paid",
    },
    {
      requestId: "#R78578",
      patientName: "Jane Cooper",
      pharmacy: "Medlplus",
      deliveryAddress: "Hawaii 81063",
      driverAssigned: "Jane Smith",
      currentStatus: "Delivered",
      paymentStatus: "Free",
    },
    {
      requestId: "#R78578",
      patientName: "Jane Cooper",
      pharmacy: "Medlplus",
      deliveryAddress: "Hawaii 81063",
      driverAssigned: "Jane Smith",
      currentStatus: "Pending",
      paymentStatus: "Paid",
    },
    {
      requestId: "#R78578",
      patientName: "Jane Cooper",
      pharmacy: "Medlplus",
      deliveryAddress: "Hawaii 81063",
      driverAssigned: "Jane Smith",
      currentStatus: "Failed",
      paymentStatus: "Free",
    },
    {
      requestId: "#R78578",
      patientName: "Jane Cooper",
      pharmacy: "Medlplus",
      deliveryAddress: "Hawaii 81063",
      driverAssigned: "Jane Smith",
      currentStatus: "Cancelled",
      paymentStatus: "Paid",
    },
  ];

  const handleAssignDriver = () => {
    alert("Assign Driver clicked");
  }

  const handleViewPayment = () => {
    alert("View Payments clicked");
  }

  const handleDownload = () => {
    alert("Download clicked");
  }

  const getStatusVariant = (status: DeliveryRequest["currentStatus"]) => {
    switch (status) {
      case "In-Transit":
        return "bg-cyan-100 text-cyan-700 hover:bg-cyan-100";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
      case "Pending":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100";
      case "Failed":
        return "bg-pink-100 text-pink-700 hover:bg-pink-100";
      case "Cancelled":
        return "bg-orange-100 text-orange-700 hover:bg-orange-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const getPaymentVariant = (status: DeliveryRequest["paymentStatus"]) => {
    return status === "Paid"
      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      : "bg-amber-100 text-amber-700 hover:bg-amber-100";
  };

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Latest Rx Delivery Request</h1>

        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-gray-800">Quick Actions:</span>
          <Button onClick={handleAssignDriver} className=" text-white py-5">
            <Image src="/icons/overview/assign.png" alt="Assign Driver" width={20} height={20} />
            Assign Driver
          </Button>
          <Button onClick={handleViewPayment} variant="outline" className="bg-[#F4ECF3] hover:bg-[#F4ECF4] py-5">
            <Image src="/icons/overview/view-payment.png" alt="Assign Driver" width={20} height={20} />
            View Payments
          </Button>
          <Button onClick={handleDownload} variant="outline" className="bg-[#F4ECF3] hover:bg-[#F4ECF4] py-5">
            <Image src="/icons/overview/download.png" alt="Assign Driver" width={20} height={20} />
            Download
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Request ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Patient Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Pharmacy
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Delivery Address
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Driver Assigned
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Current Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {deliveryRequests.map((request, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-900">
                  {request.requestId}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {request.patientName}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {request.pharmacy}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {request.deliveryAddress}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {request.driverAssigned}
                </td>
                <td className="py-4 px-4">
                  <Badge

                    className={`${getStatusVariant(
                      request.currentStatus
                    )} font-medium px-3 py-1.5`}
                  >
                    {request.currentStatus}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    className={`${getPaymentVariant(
                      request.paymentStatus
                    )} font-medium px-3 py-1.5`}
                  >
                    {request.paymentStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default RxDeliveryTable;