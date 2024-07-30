import React from "react";

interface CSVPreviewProps {
  data: { [key: string]: string }[];
  mapping: { [key: string]: string } | null;
}

const CSVPreview: React.FC<CSVPreviewProps> = ({ data, mapping }) => {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const allHeaders = Object.keys(data[0]);
  const mappedHeaders =
    mapping && Object.values(mapping).some((value) => value)
      ? ["Twitter Username", "Full Name", "Linkedin Username"]
      : [];

  const displayHeaders = [...new Set([...allHeaders, ...mappedHeaders])];

  const getDisplayRow = (row: { [key: string]: string }) => {
    if (mapping && Object.values(mapping).some((value) => value)) {
      return {
        "Twitter Username": row[mapping.twitter] || "",
        "Full Name": row[mapping.fullName] || "",
        "Linkedin Username": row[mapping.linkedin] || "",
        ...row,
      };
    }
    return row;
  };

  return (
    <div>
      <h2>CSV Preview</h2>
      <table
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "80%",
        }}
      >
        <thead>
          <tr>
            {displayHeaders.map((header) => (
              <th
                key={header}
                style={{ padding: "8px", border: "1px solid #ddd" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            const displayRow = getDisplayRow(row);
            return (
              <tr key={index}>
                {displayHeaders.map((header) => (
                  <td
                    key={header}
                    style={{ padding: "8px", border: "1px solid #ddd" }}
                  >
                    {displayRow[header] || ""}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CSVPreview;
