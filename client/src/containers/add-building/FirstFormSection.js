import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Col, Row, Typography, Upload } from 'antd';
import config from '../../config';
import FormInput from '../../components/FormInput';
import FormSection from '../../components/FormSection';
import HereMapAddBuilding from '../../components/HereMapAddBuilding';
import UploadButton from '../../components/UploadButton';
import FormSelect from '../../components/FormSelect';

const { Paragraph } = Typography;

const { MAP_API_KEY } = config;

const FirstFormSection = ({
  disabledFields,
  form,
  onCoordinatesChange,
  mapSearchText,
  riskCategories,
}) => {
  const riskCategoryOptions = useMemo(
    () =>
      riskCategories.map((category) => ({ value: category.value, text: category.display_name })),
    [riskCategories],
  );

  return (
    <FormSection label={1} title={<Trans id="form.first_section.title" />}>
      <Col span={14}>
        <Row type="flex" gutter={20}>
          <Col span={18}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="address"
              form={form}
              label={<Trans id="form.adress.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col span={6}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="street_number"
              form={form}
              label={<Trans id="form.street_number.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="county"
              form={form}
              label={<Trans id="form.county.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="locality"
              form={form}
              label={<Trans id="form.locality.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormSelect
              disabled={disabledFields}
              fieldName="risk_class"
              form={form}
              label={<Trans id="form.risk_class.label" />}
              options={riskCategoryOptions}
              rulesOptions={[{ ruleName: 'required' }]}
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="height_regime"
              form={form}
              label={<Trans id="form.height_regime.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row>
          <Paragraph>
            <Trans id="form.first_section.extra" />
          </Paragraph>
        </Row>
      </Col>
      <Col span={10}>
        <HereMapAddBuilding
          apiKey={MAP_API_KEY}
          searchText={mapSearchText}
          onCoordinatesChange={onCoordinatesChange}
        />
      </Col>
      <Col span={14}>
        <Paragraph strong>
          <Trans id="form.images.label" />
        </Paragraph>
        <Paragraph>
          <Trans id="form.images.note" />
        </Paragraph>
        {/* @TODO test the behavior */}
        <Upload>
          <UploadButton name={<Trans id="form.upload_button.label" />} />
        </Upload>
      </Col>
    </FormSection>
  );
};

FirstFormSection.defaultProps = {
  mapSearchText: null,
  disabledFields: null,
};

FirstFormSection.propTypes = {
  form: PropTypes.shape().isRequired,
  onCoordinatesChange: PropTypes.func.isRequired,
  mapSearchText: PropTypes.string,
  riskCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  disabledFields: PropTypes.bool,
};

export default FirstFormSection;
