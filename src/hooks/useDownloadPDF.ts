"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const useDownloadPDF = () => {
  const downloadPDF = (
    data: Record<string, any>[],
    fileName = "data.pdf",
    title = "Data List"
  ) => {
    if (!data || data.length === 0) return;

    const doc = new jsPDF();

    doc.text(title, 14, 15);

    const headers = Object.keys(data[0]);
    const body = data.map(item => headers.map(key => item[key]));

    autoTable(doc, {
      startY: 20,
      head: [headers],
      body,
    });

    doc.save(fileName);
  };

  return { downloadPDF };
};
