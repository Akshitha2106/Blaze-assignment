/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import CSVPreview from "./CSVPreview";
import HeaderMapping from "./HeaderMapping";
import { saveAs } from "file-saver"; // Import file-saver for handling file downloads

interface CSVRow {
  [key: string]: string;
}

const FileUpload = () => {
  const [csvData, setCsvData] = useState<CSVRow[] | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<{ [key: string]: string } | null>(
    null
  );

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    Papa.parse<CSVRow>(file, {
      header: true,
      complete: (result) => {
        setCsvData(result.data);
        setHeaders(Object.keys(result.data[0]));
        setMapping(null);
      },
    });
  };

  const handleMappingComplete = (newMapping: { [key: string]: string }) => {
    setMapping(newMapping);
  };

  const handleDownload = () => {
    if (!csvData) return;

    const allHeaders = headers;
    const mappedHeaders = mapping
      ? ["Twitter Username", "Full Name", "Linkedin Username"]
      : [];

    const displayHeaders = [...new Set([...allHeaders, ...mappedHeaders])];

    const mappedData = csvData.map((row) => {
      const mappedRow: { [key: string]: string } = { ...row };
      if (mapping) {
        mappedRow["Twitter Username"] = row[mapping.twitter] || "";
        mappedRow["Full Name"] = row[mapping.fullName] || "";
        mappedRow["Linkedin Username"] = row[mapping.linkedin] || "";
      }
      return mappedRow;
    });

    const csv = Papa.unparse(mappedData, {
      header: true,
      columns: displayHeaders,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "mapped_data_with_original.csv");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop a CSV file here, or click to select one</p>
      </div>
      {csvData && (
        <HeaderMapping
          headers={headers}
          onMappingComplete={handleMappingComplete}
        />
      )}
      {csvData && <CSVPreview data={csvData} mapping={mapping} />}
      {csvData && (
        <button
          onClick={handleDownload}
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Download CSV with Mapped Columns
        </button>
      )}
    </div>
  );
};

export default FileUpload;
