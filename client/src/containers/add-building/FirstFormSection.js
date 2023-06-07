import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import { Col, App, Row, Typography, Upload } from 'antd';
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
  onCoordinatesChange,
  mapSearchText,
  riskCategories,
}) => {
  const [fileList, setFileList] = useState([]);
  const { message } = App.useApp();
  const riskCategoryOptions = useMemo(
    () => riskCategories.map((category) => ({ value: category.value, text: category.displayName })),
    [riskCategories],
  );

  const onBeforeUploadHandler = useCallback(
    (file) => {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        message.error(<Trans id="form.validation.image_size" />);
        return isLt2M;
      }

      setFileList((prevFileList) => [...prevFileList, file]);
      return false;
    },
    [fileList],
  );

  const onImageUploadChangeHandler = useCallback((info) => {
    setFileList(info.fileList.slice(-5));
  }, []);

  const onRemoveImageHandler = useCallback((removedFile) => {
    setFileList((prevFileList) => prevFileList.filter((file) => file !== removedFile));
  }, []);

  return (
    <FormSection label={1} title={<Trans id="form.first_section.title" />}>
      <Col xs={24} lg={14}>
        <Row type="flex" gutter={20}>
          <Col xs={24} md={18}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="address"
              label={<Trans id="form.adress.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 100 }]}
            />
          </Col>
          <Col xs={24} md={6}>
            <FormInput
              colon
              disabled={disabledFields}
              fieldName="streetNumber"
              label={<Trans id="form.street_number.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col xs={24} md={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="county"
              label={<Trans id="form.county.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="locality"
              label={<Trans id="form.locality.label" />}
              rulesOptions={[{ ruleName: 'required' }, { ruleName: 'max', value: 50 }]}
            />
          </Col>
        </Row>
        <Row type="flex" gutter={20}>
          <Col xs={24} md={12}>
            <FormSelect
              disabled={disabledFields}
              fieldName="riskCategory"
              label={<Trans id="form.risk_class.label" />}
              options={riskCategoryOptions}
              rulesOptions={[{ ruleName: 'required' }]}
            />
          </Col>
          <Col xs={24} md={12}>
            <FormInput
              disabled={disabledFields}
              fieldName="heightRegime"
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
      <Col xs={24} lg={10}>
        <HereMapAddBuilding
          apiKey={MAP_API_KEY}
          searchText={mapSearchText}
          onCoordinatesChange={onCoordinatesChange}
        />
      </Col>
      <Col xs={24} lg={18}>
        <Paragraph strong>
          <Trans id="form.images.label" />
        </Paragraph>
        <Paragraph>
          <Trans id="form.images.note" />
        </Paragraph>

        <Upload
          accept=".jpg,.png"
          beforeUpload={onBeforeUploadHandler}
          fileList={fileList}
          listType="picture-card"
          multiple
          onChange={onImageUploadChangeHandler}
          onRemove={onRemoveImageHandler}
          disabled={disabledFields}
        >
          {fileList.length < 5 && <UploadButton name={<Trans id="form.upload_button.label" />} />}
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
  onCoordinatesChange: PropTypes.func.isRequired,
  mapSearchText: PropTypes.string,
  riskCategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  disabledFields: PropTypes.bool,
};

export default FirstFormSection;
