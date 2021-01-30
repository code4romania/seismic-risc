import React from 'react';
import { Row, Col } from 'antd';
import Layout from '../../components/Layout';
import PdfViewer from './PdfViewer';

const GUIDE_PDF_URL = '/assets/documents/Toolkit Asociatii de proprietari v2018.pdf';

const Guide = () => {
  return (
    <Layout>
      <div className="page">
        <h1>Ghid</h1>
        <Row
          type="flex"
          justify="center"
          align="top"
          style={{ marginTop: '2rem', marginBottom: '2rem' }}
        >
          <Col>
            <PdfViewer file={GUIDE_PDF_URL} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Guide;
