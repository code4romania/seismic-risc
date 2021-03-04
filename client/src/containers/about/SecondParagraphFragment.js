import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ margin: '1rem', textAlign: 'left' }}>
      <Col sm={24} md={22}>
        <Paragraph>
          <Trans>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Pellentesque nec nam aliquam sem et tortor
            consequat id. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Diam
            donec adipiscing tristique risus nec feugiat in. Purus in mollis nunc sed id semper.
            Adipiscing at in tellus integer feugiat scelerisque. Vitae nunc sed velit dignissim
            sodales ut eu sem. Lacus viverra vitae congue eu consequat.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
