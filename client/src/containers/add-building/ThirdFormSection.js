import React from 'react';
import { Button, Col, Row } from 'antd';
// import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import FormSection from '../../components/FormSection';

const ThirdFormSection = () => {
  return (
    <FormSection
      label={3}
      title={<Trans>Ai și alte informații despre această clădire?</Trans>}
      description="Notă: Întrebările din secțiunea A se referă la numărul de locuințe și persoane care locuiesc în clădirea care face obiectul prezentului formular."
    >
      <Col span={14}>
        <Row>
          <Button type="primary" ghost size="large">
            Completeaza cu alte informații
          </Button>
        </Row>
      </Col>
    </FormSection>
  );
};

// ThirdFormSection.defaultProps = {
//   disabledFields: null,
// };

// ThirdFormSection.propTypes = {
//   form: PropTypes.shape().isRequired,
//   disabledFields: PropTypes.bool,
// };

export default ThirdFormSection;
