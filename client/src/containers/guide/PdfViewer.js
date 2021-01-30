import React, { useState, useLayoutEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Row, Col, Button } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 * Custom hook for obtaining window size.
 */
// Based on https://stackoverflow.com/a/19014495/5723188
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const updateSize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const MAX_PDF_PAGE_WIDTH = 500;

// Based on https://github.com/wojtekmaj/react-pdf/wiki/Recipes#display-single-page-with-navigation
const PdfViewer = ({ file }) => {
  const windowSize = useWindowSize();
  const pageWidth = Math.min(MAX_PDF_PAGE_WIDTH, windowSize.width);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => setPageNumber((num) => num + offset);
  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(+1);

  return (
    <>
      <Document file={file} onLoadSuccess={handleLoadSuccess}>
        <Page pageNumber={pageNumber} width={pageWidth} />
      </Document>
      {numPages && (
        <>
          <p style={{ textAlign: 'center' }}>
            Pagina {pageNumber} din {numPages}
          </p>
          <Row type="flex" justify="center">
            <Col span={8}>
              <Button disabled={pageNumber <= 1} onClick={previousPage}>
                Pagina anterioară
              </Button>
            </Col>
            <Col span={8}>
              <Button type="Primary" disabled={pageNumber >= numPages} onClick={nextPage}>
                Pagina următoare
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PdfViewer;
