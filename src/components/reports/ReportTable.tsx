"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";

import { Report } from "@/components/reports/report.type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import {
  useDeleteSupportMutation,
  useGetSupportQuery,
} from "@/redux/Apis/supportApi";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import DeleteConfirmationDialog from "../confirmation/deleteConfirmationDialog";
const ReportTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [supportToDelete, setSupportToDelete] = useState<Report | null>(null);

  // API integration
  const { data: supportData, isLoading } = useGetSupportQuery({
    page: currentPage,
    limit: 10,
  });

  const [deleteSupport, { isLoading: isDeleting }] = useDeleteSupportMutation();
  const { success, error } = useToast();

  const allSupports = supportData?.data?.data || [];
  const totalPages = supportData?.data?.meta?.totalPages || 1;
  const totalSupports = supportData?.data?.meta?.total || 0;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  // Handle delete button click
  const handleDeleteClick = (support: Report) => {
    setSupportToDelete(support);
    setIsDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!supportToDelete) return;

    try {
      await deleteSupport(supportToDelete._id).unwrap();
      success("Support request deleted successfully!");
      setIsDeleteDialogOpen(false);
      setSupportToDelete(null);
    } catch (err: unknown) {
      console.error("Error deleting support request:", err);
      error("Failed to delete support request. Please try again.");
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSupportToDelete(null);
  };

  const getInitials = (name: string | undefined): string => {
    if (!name) return "UN";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="rounded-md border p-8 text-center">
        <div className="text-muted-foreground">Loading support requests...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {allSupports.length} support requests
        </div>
        <div className="text-sm text-muted-foreground">
          Total: {totalSupports} requests
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-left">Date</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSupports.length > 0 ? (
              allSupports.map((support: Report) => (
                <TableRow
                  key={support._id}
                  className={
                    // selectedUsers.includes(support._id) ? "bg-muted/50" : ""
                    ""
                  }
                >
                  <TableCell className="font-medium">
                    {new Date(support.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-sm">
                          {getInitials(support.userId?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {support.userId?.name || "Unknown"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {support.userId?.email || "Unknown"}
                  </TableCell>

                  <TableCell>
                    <div className=" break-words text-sm leading-relaxed">
                      {support.message && support.message.length > 150 ? (
                        <div>
                          <div className="line-clamp-3">
                            {support.message.substring(0, 120)}...
                          </div>
                          <button className="text-blue-600 hover:text-blue-800 text-xs mt-1">
                            Read more
                          </button>
                        </div>
                      ) : (
                        support.message || "No message"
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end space-x-2">
                      {/* <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <RiAlarmWarningLine className="text-red-500" />
                        <span className="sr-only">Edit report</span>
                      </Button> */}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteClick(support)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4 text-orange-500" />
                        <span className="sr-only">Delete support request</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No support requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 p-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className="h-8 w-8 p-0"
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Support Request"
          itemName={supportToDelete?.userId?.name || "this support request"}
          itemType="support request"
          isLoading={isDeleting}
          confirmButtonText="Delete Support Request"
          cancelButtonText="Cancel"
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default ReportTable;
