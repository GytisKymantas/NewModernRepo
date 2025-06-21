// Optional: props for label text and SVG size
import React from "react";

const DownloadIconLabel = ({ label = 'Atsisiųsti', svg }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {svg}
      <p style={{ margin: 0 }}>{label}</p>
    </div>
  );
};

export default DownloadIconLabel;
