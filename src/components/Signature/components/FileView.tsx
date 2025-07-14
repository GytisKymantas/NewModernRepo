import { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function FileView({ fileUploadPath }: any) {
  const [numberOfPages, setNumberOfPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }): void => {
      setNumberOfPages(numPages);
    },
    [],
  );

  return (
    <div>
      <Document file={fileUploadPath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numberOfPages}
      </p>
    </div>
  );
}

export default FileView;
