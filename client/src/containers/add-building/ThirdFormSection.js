import React, { useCallback, useState } from 'react';
import { Alert, Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import FormSection from '../../components/FormSection';
import FormSubSection from '../../components/FormSubSection';
import { formFields } from './utils';
import FormRadio from '../../components/FormRadio';

const { generalInfoFields, buildingAdministrationFields, spaceUsageFields } =
  formFields.extraInfoFields;

const [isStillPresentField, ...remainingGeneralInfoFields] = generalInfoFields;

const ThirdFormSection = ({ disabledFields, form }) => {
  const [showAddMoreInfoBtn, setShowAddMoreInfoBtn] = useState(true);
  const [isDemolished, setIsDemolished] = useState(false);

  const onAddMoreInfoBtnClick = useCallback(() => {
    setShowAddMoreInfoBtn(false);
  }, []);

  const onIsStillPresentFieldChange = useCallback((checkedValue) => {
    if (checkedValue.target.value === 'NO') {
      setIsDemolished(true);
    } else {
      setIsDemolished(false);
    }
  }, []);

  return (
    <FormSection label={3} title={<Trans id="form.third_section.title" />}>
      <Col span={18}>
        {showAddMoreInfoBtn ? (
          <Row>
            <Button type="primary" ghost size="large" onClick={onAddMoreInfoBtnClick}>
              <Trans id="form.third_section.other_info_btn" />
            </Button>
          </Row>
        ) : (
          <>
            <FormSubSection
              label="A"
              title={<Trans id="form.third_section.sub_one.title" />}
              description={<Trans id="form.third_section.sub_one.description" />}
            >
              <FormRadio
                disabled={disabledFields}
                fieldName={isStillPresentField.fieldName}
                form={form}
                {...isStillPresentField}
                onChange={onIsStillPresentFieldChange}
              />
              {isDemolished && (
                <Alert type="info" message={<Trans id="form.is_still_present.info" />} showIcon />
              )}

              {/* @TODO user can see a new field and fill in other work performed when option 5 is selected */}
              {remainingGeneralInfoFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields || isDemolished}
                  fieldName={fieldName}
                  form={form}
                  {...rest}
                />
              ))}
            </FormSubSection>
            <FormSubSection
              label="B"
              title={<Trans id="form.third_section.sub_two.title" />}
              description={<Trans id="form.third_section.sub_two.description" />}
            >
              {buildingAdministrationFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields || isDemolished}
                  fieldName={fieldName}
                  form={form}
                  {...rest}
                />
              ))}
            </FormSubSection>
            <FormSubSection label="C" title={<Trans id="form.third_section.sub_three.title" />}>
              {spaceUsageFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields || isDemolished}
                  fieldName={fieldName}
                  form={form}
                  {...rest}
                />
              ))}
            </FormSubSection>
          </>
        )}
      </Col>
    </FormSection>
  );
};

ThirdFormSection.defaultProps = {
  disabledFields: null,
};

ThirdFormSection.propTypes = {
  form: PropTypes.shape().isRequired,
  disabledFields: PropTypes.bool,
};

export default ThirdFormSection;
