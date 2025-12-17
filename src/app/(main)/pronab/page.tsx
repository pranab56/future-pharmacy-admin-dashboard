"use client";

import { useCSVDownload } from '../../../hooks/useCSVDownload';
import { useDownloadPDF } from '../../../hooks/useDownloadPDF';
import { useDownloadXlShit } from '../../../hooks/useDownloadXlShit';

const page = () => {

  const { downloadCSV } = useCSVDownload();
  const { downloadExcel } = useDownloadXlShit();
  const { downloadPDF } = useDownloadPDF();


  const users = [
    {
      id: 1,
      name: "Pronab1",
    },
    {
      id: 2,
      name: "Pronab2",
    },
    {
      id: 3,
      name: "Pronab3",
    }
  ];

  const handlePDFDownload = () => {
    downloadExcel(users);
  };
  return (
    <div>
      This is pronab
      <button onClick={handlePDFDownload} className='border cursor-pointer'>Download pdf</button>
    </div>
  );
};

export default page;