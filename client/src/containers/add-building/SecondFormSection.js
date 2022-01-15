import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Col, Row } from 'antd';
import FormInput from '../../components/FormInput';
import FormSection from '../../components/FormSection';
import FormTextArea from '../../components/FormTextArea';
import FormRadio from '../../components/FormRadio';

// @TODO types of contracts must be fetched from API? (not available yet)
const TYPE_OF_CONTRACTS = [
  {
    value: 'OWNER',
    text: <Trans id="form.type_of_contract.owner" />,
  },
  {
    value: 'TENANT',
    text: <Trans id="form.type_of_contract.tenant" />,
  },
  {
    value: 'ADMIN',
    text: <Trans id="form.type_of_contract.admin" />,
  },
];

const SecondFormSection = ({ disabledFields, form }) => {
  return (
    <FormSection
      label={2}
      title={<Trans id="form.second_section.title" />}
      description={<Trans id="form.second_section.description" />}
    >
      <Col xs={24} lg={18}>
        <Row type="flex" gutter={20}>
          <Col xs={24} md={12} lg={10} xl={9}>
            <FormInput
              disabled={disabledFields}
              fieldName="fullName"
              form={form}
              label={<Trans id="form.full_name.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col xs={24} md={12} lg={10} xl={9}>
            <FormInput
              disabled={disabledFields}
              fieldName="emailAddress"
              form={form}
              label={<Trans id="form.email_address.label" />}
              rulesOptions={[
                { ruleName: 'required' },
                { ruleName: 'email' },
                { ruleName: 'max', value: 100 },
              ]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col xs={24} md={12} lg={10} xl={9}>
            <FormInput
              disabled={disabledFields}
              fieldName="phoneNumber"
              form={form}
              label={<Trans id="form.phone_number.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
        </Row>
        <Row>
          <FormRadio
            disabled={disabledFields}
            fieldName="typeOfContact"
            form={form}
            label={<Trans id="form.type_of_contract.label" />}
            options={TYPE_OF_CONTRACTS}
            rulesOptions={[{ ruleName: 'required' }]}
          />
        </Row>
        <Row>
          <FormTextArea
            disabled={disabledFields}
            fieldName="necessarySupport"
            form={form}
            label={<Trans id="form.necessary_support.label" />}
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
