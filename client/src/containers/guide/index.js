import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { Row, Col, Button } from 'antd';
import { Trans } from '@lingui/macro';
import Layout from '../../components/Layout';
import PdfViewer from './PdfViewer';

const GUIDE_PDF_URL = '/assets/documents/Toolkit Asociatii de proprietari v2018.pdf';

const Guide = () => {
  const { search } = useLocation();
  const { page } = qs.parse(search, { ignoreQueryPrefix: true });
  let pageNumber = parseInt(page, 10);
  if (Number.isNaN(pageNumber)) {
    pageNumber = 1;
  }
  return (
    <Layout>
      <div className="page">
        <h1>
          <Trans>Homeowners associations guide</Trans>
        </h1>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
        >
          <Col>
            <PdfViewer file={GUIDE_PDF_URL} defaultPageNumber={pageNumber} />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button type="primary" icon="download" href={GUIDE_PDF_URL} download>
            <Trans>Download</Trans>
          </Button>
        </Row>
      </div>
    </Layout>
  );
};

export default Guide;
