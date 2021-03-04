import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Trans } from '@lingui/macro';

const { Paragraph } = Typography;

export default () => {
  return (
    <Row type="flex" justify="space-around" style={{ margin: '1rem', textAlign: 'left' }}>
      <Col sm={24} md={22}>
        <Paragraph style={{ paddingBottom: '2rem' }}>
          <Trans>
            In the research and design program developed by Code for Romania, we focused on the
            non-governmental sector to identify the hotspots of civil society and to intervene with
            digital solutions where we can bring about change for the better. We often design
            solutions that digitize processes and simplify procedures and mechanics that need to be
            streamlined, but in many cases we come up with solutions that address the need to build
            completely new tools that solve problems with the support of technology.
          </Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            The solution you are using right now is a platform that responds to the need to increase
            the the representativeness of non-profit organizations, through clear and transparent
            selection mechanisms that carry out the sector's missions in decision-making forums.
            VotONG is, therefore, the necessary piece of infrastructure for the self-regulation of
            the NGO sector in Romania, which in time, through the active participation of
            organizations, will lead to an efficient communication and consultation between all
            actors in the field. That is why we invite you to join us in this endeavor because
            together we can trigger the positive changes we want for the Romanian society. Together
            we are invincible. Both us and our beneficiaries. Romania.
          </Trans>
        </Paragraph>
      </Col>
    </Row>
  );
};
