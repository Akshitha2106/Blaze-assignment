import React, { useState, useEffect } from "react";

interface HeaderMappingProps {
  headers: string[];
  onMappingComplete: (mapping: { [key: string]: string }) => void;
}

const HeaderMapping: React.FC<HeaderMappingProps> = ({
  headers,
  onMappingComplete,
}) => {
  const [mapping, setMapping] = useState<{ [key: string]: string }>({
    twitter: "",
    fullName: "",
    linkedin: "",
  });

  useEffect(() => {
    onMappingComplete(mapping);
  }, [mapping, onMappingComplete]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMapping((prevMapping) => ({
      ...prevMapping,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Map Headers</h2>
      <div>
        <label>
          Twitter Username:
          <select
            name="twitter"
            value={mapping.twitter}
            onChange={handleSelectChange}
          >
            <option value="">Select a header</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Full Name:
          <select
            name="fullName"
            value={mapping.fullName}
            onChange={handleSelectChange}
          >
            <option value="">Select a header</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Linkedin Username:
          <select
            name="linkedin"
            value={mapping.linkedin}
            onChange={handleSelectChange}
          >
            <option value="">Select a header</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default HeaderMapping;
