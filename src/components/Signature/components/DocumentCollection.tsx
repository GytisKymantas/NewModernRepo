import DocumentInfoSection from "./DocumentInfoSection";

function DocumentCollection() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <DocumentInfoSection key={`document-info-${index + 1}`} index={index + 1} />
      ))}
    </>
  );
}

export default DocumentCollection;