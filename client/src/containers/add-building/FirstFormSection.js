import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Col, Row, Select, Typography, Upload } from 'antd';
import config from '../../config';
import FormInput from '../../components/FormInput';
import FormSection from '../../components/FormSection';
import HereMapAddBuilding from '../../components/HereMapAddBuilding';
import UploadButton from '../../components/UploadButton';
import FormSelect from '../../components/FormSelect';

const { Paragraph } = Typography;
const { Option } = Select;

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
      riskCategories.map((category) => (
        <Option key={category.value} value={category.value}>
          {category.display_name}
        </Option>
      )),
    [riskCategories],
  );

  return (
    <FormSection
      label={1}
      title={<Trans>About building</Trans>}
      description="Notă: Întrebările din secțiunea A se referă la numărul de locuințe și persoane care locuiesc în clădirea care face obiectul prezentului formular."
    >
      <Col span={12}>
        <Row type="flex" gutter={20}>
          <Col span={16}>
            <FormInput
              disabled={disabledFields}
              fieldName="address"
              form={form}
              label={<Trans>Street</Trans>}
              maxLen={250}
              required
            />
          </Col>
          <Col span={8}>
            <FormInput
              disabled={disabledFields}
              fieldName="street_number"
              form={form}
              label={<Trans>Number</Trans>}
              maxLen={100}
              required
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="county"
              form={form}
              label={<Trans>County</Trans>}
              maxLen={60}
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="locality"
              form={form}
              label={<Trans>Locality</Trans>}
              maxLen={20}
              required
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col span={12}>
            <FormSelect
              disabled={disabledFields}
              fieldName="risk_category"
              form={form}
              label={<Trans>Risk category</Trans>}
              options={riskCategoryOptions}
              required
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="height_regime"
              form={form}
              label={<Trans>Height regime</Trans>}
              maxLen={50}
              required
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, deserunt ea adipisci
            culpa vitae officiis libero. Quas voluptate, id quasi placeat aut dolorum hic architecto
            sed, nulla possimus voluptatibus blanditiis!
          </Paragraph>
        </Row>
      </Col>
      <Col span={12}>
        <HereMapAddBuilding
          apiKey={MAP_API_KEY}
          searchText={mapSearchText}
          onCoordinatesChange={onCoordinatesChange}
        />
      </Col>
      <Row>
        <Paragraph strong>
          <Trans>Please upload a few pictures with the building</Trans>
        </Paragraph>
        <Paragraph>
          <Trans>
            Note: We suggest loading three pictures on averrage showing if the building has the
            seismic risk symbol, the general view of the building and its suroundings.
          </Trans>
        </Paragraph>
        <Upload>
          <UploadButton name={<Trans>Upload one or more photographs</Trans>} />
        </Upload>
      </Row>
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
