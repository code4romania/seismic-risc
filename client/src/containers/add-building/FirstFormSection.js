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
    <FormSection
      label={1}
      title={<Trans>About building</Trans>}
      description="Notă: Întrebările din secțiunea A se referă la numărul de locuințe și persoane care locuiesc în clădirea care face obiectul prezentului formular."
    >
      <Col span={14}>
        <Row type="flex" gutter={20}>
          <Col span={18}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="address"
              form={form}
              label={<Trans>Street:</Trans>}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col span={6}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="street_number"
              form={form}
              label={<Trans>Building number:</Trans>}
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
              label={<Trans>County:</Trans>}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="locality"
              form={form}
              label={<Trans>City:</Trans>}
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
              label={<Trans>Risk class:</Trans>}
              options={riskCategoryOptions}
              rulesOptions={[{ ruleName: 'required' }]}
            />
          </Col>
          <Col span={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="height_regime"
              form={form}
              label={<Trans>Height regime:</Trans>}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, deserunt ea adipisci
            culpa vitae officiis libero. Quas voluptate, id quasi placeat aut dolorum hic architecto
            sed, nulla possimus voluptatibus blanditiis!
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
