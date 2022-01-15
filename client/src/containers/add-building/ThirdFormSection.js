import React, { useCallback, useState } from 'react';
import { Alert, Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import FormSection from '../../components/FormSection';
import FormSubSection from '../../components/FormSubSection';
import { useExtraInfoFormFields } from './utils';
import FormRadio from '../../components/FormRadio';
import FormCheckbox from '../../components/FormCheckbox';
import FormTextArea from '../../components/FormTextArea';

const ThirdFormSection = ({ disabledFields, form }) => {
  const [showAddMoreInfoBtn, setShowAddMoreInfoBtn] = useState(true);
  const [isDemolished, setIsDemolished] = useState(false);
  const [showOtherWorkPerformedField, setShowOtherWorkPerformedField] = useState(false);

  const { generalInfoFields, buildingAdministrationFields, spaceUsageFields } =
    useExtraInfoFormFields();

  const [
    isStillPresentField,
    consolidationStatusField,
    workPerformedField,
    ...remainingGeneralInfoFields
  ] = generalInfoFields;

  const onAddMoreInfoBtnClick = useCallback(() => {
    setShowAddMoreInfoBtn(false);
  }, []);

  const onIsStillPresentFieldChange = useCallback(({ target }) => {
    if (target.value === 'NO') {
      setIsDemolished(true);
    } else {
      setIsDemolished(false);
    }
  }, []);

  const onOtherWorkPerformedSelected = useCallback((checkedValues) => {
    if (checkedValues.includes('5')) {
      setShowOtherWorkPerformedField(true);
    } else {
      setShowOtherWorkPerformedField(false);
    }
  }, []);

  return (
    <FormSection label={3} title={<Trans id="form.third_section.title" />}>
      <Col xs={24} lg={18}>
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
                label={isStillPresentField.label}
                onChange={onIsStillPresentFieldChange}
                options={isStillPresentField.options}
              />
              {isDemolished && (
                <Alert type="info" message={<Trans id="form.is_still_present.info" />} showIcon />
              )}

              <FormRadio
                disabled={disabledFields || isDemolished}
                fieldName={consolidationStatusField.fieldName}
                form={form}
                label={consolidationStatusField.label}
                options={consolidationStatusField.options}
              />

              <FormCheckbox
                disabled={disabledFields || isDemolished}
                fieldName={workPerformedField.fieldName}
                form={form}
                label={workPerformedField.label}
                options={workPerformedField.options}
                onChange={onOtherWorkPerformedSelected}
              />
              {showOtherWorkPerformedField && (
                <FormTextArea
                  fieldName="work_performed_other"
                  form={form}
                  rows={2}
                  rulesOptions={[{ ruleName: 'max', value: 250 }]}
                />
              )}

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
