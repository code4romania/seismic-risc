import React, { useState, useEffect, useCallback } from 'react';
import { Button, Checkbox, Col, Form, message, Row, Spin } from 'antd';
import { Trans, t } from '@lingui/macro';
import { Link, Redirect } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import config from '../../config';
import { useGlobalContext } from '../../context';
import FirstFormSection from './FirstFormSection';
import SecondFormSection from './SecondFormSection';
import ThirdFormSection from './ThirdFormSection';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import { useRiskCategoriesQuery } from '../../queries';
import { useAddBuilding } from '../../hooks/form/useAddBuilding';
import { useIsSmallDevice } from '../../hooks/useIsSmallDevice';

const { CAPTCHA_API_KEY } = config;

const FormFragment = ({ form }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [mapSearchText, setMapSearchText] = useState(undefined);
  const [coordinates, setCoordinates] = useState(undefined);
  const { getFieldDecorator } = form;
  const fields = form.getFieldsValue();
  const { currentLanguage } = useGlobalContext();

  const isSmallDevice = useIsSmallDevice();

  const createFormValidationRules = useCreateFormValidationRules();
  const addBuilding = useAddBuilding();

  const {
    riskCategories,
    isError: isErrorLoadingRiskCategories,
    isLoading: isLoadingRiskCategories,
  } = useRiskCategoriesQuery();

  const onFinish = useCallback(
    (e) => {
      e.preventDefault();

      form.validateFields(async (err, { gdpr, ...values }) => {
        if (err) {
          message.warning(<Trans id="form.error.validate_fields" />);
          return;
        }

        const isBuildingAdded = await addBuilding({ ...values, ...coordinates });

        if (!isBuildingAdded) {
          message.error(<Trans id="form.error.add_building" />);
          return;
        }

        setIsFinished(true);
      });
    },
    [form, coordinates, addBuilding],
  );

  const onCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  // eslint-disable-next-line no-unused-vars
  const handleVerifyCaptcha = (token, eKey) => {
    form.setFieldsValue({
      captcha: token,
    });
  };

  useEffect(() => {
    if (fields.address && fields.streetNumber && fields.locality && fields.county) {
      setMapSearchText(
        `${fields.address} ${fields.streetNumber} ${fields.locality} ${fields.county}`,
      );
    }
  }, [fields]);

  useEffect(() => {
    if (!isErrorLoadingRiskCategories) return;

    message.error(t({ id: 'form.error.fetch_risk_categories' }));
  }, [isErrorLoadingRiskCategories]);

  if (isFinished) {
    return <Redirect push to="/multumim" />;
  }

  return (
    <>
      {isLoadingRiskCategories ? (
        <div className="form-loading">
          <Spin size="large" />
        </div>
      ) : (
        <Form labelAlign="left" onSubmit={onFinish}>
          <FirstFormSection
            disabledFields={isErrorLoadingRiskCategories}
            form={form}
            onCoordinatesChange={onCoordinatesChange}
            mapSearchText={mapSearchText}
            riskCategories={riskCategories ?? []}
          />

          <SecondFormSection disabledFields={isErrorLoadingRiskCategories} form={form} />

          <ThirdFormSection disabledFields={isErrorLoadingRiskCategories} form={form} />

          <Row type="flex" gutter={16}>
            <Col xs={24} lg={16}>
              <Form.Item style={{ lineHeight: 1 }}>
                {getFieldDecorator('gdpr', {
                  valuePropName: 'checked',
                  rules: createFormValidationRules([{ ruleName: 'gdpr' }]),
                })(
                  <Checkbox disabled={isErrorLoadingRiskCategories} style={{ lineHeight: 1.5 }}>
                    <Trans id="form.gdpr_agreement">
                      By this check, you agree that the data provided by you through this form will
                      be processed exclusively to upload this document on the platform and that the
                      MKBT team will contact you only in connection with this submission. Here you
                      can find{' '}
                      <Link to="/termeni-si-conditii" target="_blank">
                        our regulations on the processing of personal data
                      </Link>
                      .
                    </Trans>
                  </Checkbox>,
                )}
              </Form.Item>
              <br />
              <Row type="flex" align="middle" justify="space-between">
                <Col>
                  <Form.Item>
                    {getFieldDecorator('captcha', {
                      rules: createFormValidationRules([{ ruleName: 'captcha' }]),
                    })(
                      <HCaptcha
                        sitekey={CAPTCHA_API_KEY}
                        onVerify={handleVerifyCaptcha}
                        hl={currentLanguage}
                        languageOverride={currentLanguage}
                        size={isSmallDevice ? 'compact' : 'normal'}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item colon>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isErrorLoadingRiskCategories}
                    >
                      <Trans>Add a building</Trans>
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default Form.create({ name: 'add_building' })(FormFragment);
