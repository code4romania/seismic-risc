import React, { useCallback, useState } from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { Trans } from '@lingui/macro';
import FormSection from '../../components/FormSection';
import FormSubSection from '../../components/FormSubSection';
import { formFields } from './utils';

const { generalInfoFields, buildingAdministrationFields, spaceUsageFields } =
  formFields.extraInfoFields;

const ThirdFormSection = ({ disabledFields, form }) => {
  const [showAddMoreInfoBtn, setShowAddMoreInfoBtn] = useState(true);

  const onAddMoreInfoBtnClick = useCallback(() => {
    setShowAddMoreInfoBtn(false);
  }, []);

  // @TODO add translations

  return (
    <FormSection label={3} title={<Trans>Ai și alte informații despre această clădire?</Trans>}>
      <Col span={18}>
        {showAddMoreInfoBtn ? (
          <Row>
            <Button type="primary" ghost size="large" onClick={onAddMoreInfoBtnClick}>
              Completeaza cu alte informații
            </Button>
          </Row>
        ) : (
          <>
            <FormSubSection
              label="A"
              title={<Trans>Date generale</Trans>}
              description={
                <Trans>
                  Notă: Întrebările din secțiunea A se referă la numărul de locuințe și persoane
                  care locuiesc în clădirea care face obiectul prezentului formular.
                </Trans>
              }
            >
              {/* @TODO user can see a new field and fill in other work performed when option 5 is
              selected */}
              {generalInfoFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields}
                  fieldName={fieldName}
                  form={form}
                  {...rest}
                />
              ))}
            </FormSubSection>
            <FormSubSection
              label="B"
              title={<Trans>Funcționarea imobilului</Trans>}
              description={
                <Trans>
                  Nota: Întrebări din secțiunile B-F se referă la problemele și nevoile de ansamblu
                  ale clădirii și ale celor ce locuiesc în aceasta.
                </Trans>
              }
            >
              {buildingAdministrationFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields}
                  fieldName={fieldName}
                  form={form}
                  {...rest}
                />
              ))}
            </FormSubSection>
            <FormSubSection label="C" title={<Trans>Structura și tipul ocupării clădirii</Trans>}>
              {spaceUsageFields.map(({ component: FormField, fieldName, ...rest }) => (
                <FormField
                  key={fieldName}
                  disabled={disabledFields}
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
