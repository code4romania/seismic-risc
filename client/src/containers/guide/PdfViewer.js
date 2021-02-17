import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Row, Button } from 'antd';
import { Trans } from '@lingui/macro';

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
const PdfViewer = ({ file, defaultPageNumber = 1 }) => {
  const windowSize = useWindowSize();
  const pageWidth = Math.min(MAX_PDF_PAGE_WIDTH, windowSize.width);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);

  const handleLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
  };

  const changePage = (offset) => setPageNumber((num) => num + offset);
  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(+1);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (pageNumber > 1) {
          previousPage();
        }
        break;
      case 'ArrowRight':
        if (pageNumber < numPages) {
          nextPage();
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <div style={{ width: pageWidth, minHeight: pageWidth * 1.5 }}>
        <Document file={file} onLoadSuccess={handleLoadSuccess}>
          <Page pageNumber={pageNumber} width={pageWidth} />
        </Document>
      </div>
      {numPages && (
        <>
          <p style={{ textAlign: 'center' }}>
            <Trans>
              Page {pageNumber} of {numPages}
            </Trans>
          </p>
          <Row type="flex" justify="center">
            <Button disabled={pageNumber <= 1} onClick={previousPage} style={{ marginRight: 16 }}>
              <Trans>Previous page</Trans>
            </Button>
            <Button type="Primary" disabled={pageNumber >= numPages} onClick={nextPage}>
              <Trans>Next page</Trans>
            </Button>
          </Row>
        </>
      )}
    </>
  );
};

export default PdfViewer;
