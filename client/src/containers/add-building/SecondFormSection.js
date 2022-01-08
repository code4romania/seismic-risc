import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Col, Row, Typography } from 'antd';
import FormInput from '../../components/FormInput';
import FormSection from '../../components/FormSection';
import FormCheckbox from '../../components/FormCheckbox';
import FormTextArea from '../../components/FormTextArea';

const { Paragraph } = Typography;

const TYPE_OF_CONTRACTS = [
  {
    value: 'OWNER',
    text: <Trans>Owner</Trans>,
  },
  {
    value: 'TENANT',
    text: <Trans>Tennant</Trans>,
  },
  {
    value: 'ADMIN',
    text: <Trans>Reprezentant cu funcție de conducere din asociația de proprietari</Trans>,
  },
];

const SecondFormSection = ({ disabledFields, form }) => {
  return (
    <FormSection
      label={2}
      title={<Trans>About you</Trans>}
      description="Datele de contact ale persoanei care completează prezentul formular"
    >
      <Col span={14}>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="full_name"
              form={form}
              label={<Trans>Full name:</Trans>}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="email_address"
              form={form}
              label={<Trans>Email address:</Trans>}
              rulesOptions={[
                { ruleName: 'required' },
                { ruleName: 'email' },
                { ruleName: 'max', value: 100 },
              ]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="phone_number"
              form={form}
              label={<Trans>Phone number:</Trans>}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
        </Row>
        <Row>
          <FormCheckbox
            disabled={disabledFields}
            fieldName="type_of_contract"
            form={form}
            label={<Trans>Type of contract:</Trans>}
            options={TYPE_OF_CONTRACTS}
            rulesOptions={[{ ruleName: 'required' }]}
          />
        </Row>
        <Row>
          <Paragraph strong>
            <Trans>
              În opinia dumneavoastră, ca locatar al imobilului, de ce sprijin aveți nevoie și cu ce
              dificultăți v-ați confruntat, în demersul de a crește siguranța imobilului în care
              locuiți?
            </Trans>
          </Paragraph>
          <FormTextArea
            disabled={disabledFields}
            fieldName="necessary_support"
            form={form}
            rulesOptions={[{ ruleName: 'max', value: 400 }]}
          />
        </Row>
      </Col>
    </FormSection>
  );
};

SecondFormSection.defaultProps = {
  disabledFields: null,
};

SecondFormSection.propTypes = {
  form: PropTypes.shape().isRequired,
  disabledFields: PropTypes.bool,
};

export default SecondFormSection;
