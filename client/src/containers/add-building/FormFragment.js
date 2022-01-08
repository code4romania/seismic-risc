import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Spin } from 'antd';
import { Trans } from '@lingui/macro';
import { Link, Redirect } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import config from '../../config';
import { useGlobalContext } from '../../context';
import FirstFormSection from './FirstFormSection';
import SecondFormSection from './SecondFormSection';
import ThirdFormSection from './ThirdFormSection';
import useCreateFormValidationRules from '../../hooks/form/useFormValidationRules';
import FormCheckbox from '../../components/FormCheckbox';
import { useRiskCategoriesQuery } from '../../queries';

const { BUILDINGS_URL, CAPTCHA_API_KEY } = config;

const FormFragment = ({ form }) => {
  const [state, setState] = useState({
    requestError: false,
    loading: true,
    finished: false,
  });
  const [mapSearchText, setMapSearchText] = useState(undefined);
  const [coordinates, setCoordinates] = useState(undefined);
  const [language, setLanguage] = useState(undefined);
  const { getFieldDecorator } = form;
  const fields = form.getFieldsValue();
  const { currentLanguage } = useGlobalContext();

  const createFormValidationRules = useCreateFormValidationRules();

  const {
    riskCategories,
    isError: isErrorLoadingRiskCategories,
    isLoading: isLoadingRiskCategories,
  } = useRiskCategoriesQuery();

  const onFinish = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const valuesToSend = { ...values, ...coordinates };
          const res = await fetch(`${BUILDINGS_URL}/public_create/`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(valuesToSend),
          });
          if (res.ok) {
            if (res.status === 201) {
              setState((prevState) => ({
                ...prevState,
                finished: true,
              }));
            }
          } else {
            throw new Error(res.statusText);
          }
        } catch (error) {
          setState((prevState) => ({ ...prevState, loading: false, requestError: true }));
        }
      }
    });
  };

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
    if (fields.address && fields.street_number && fields.locality && fields.county) {
      setMapSearchText(
        `${fields.address} ${fields.street_number} ${fields.locality} ${fields.county}`,
      );
    }
  }, [fields]);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  if (state.finished) {
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
            riskCategories={riskCategories}
          />

          <SecondFormSection disabledFields={isErrorLoadingRiskCategories} form={form} />

          <ThirdFormSection disabledFields={isErrorLoadingRiskCategories} form={form} />

          <Row type="flex" gutter={16}>
            <Col xs={24} lg={16}>
              <FormCheckbox
                disabled={isErrorLoadingRiskCategories}
                form={form}
                fieldName="gdpr"
                options={[
                  {
                    value: 'gdpr',
                    text: (
                      <Trans id="form.gdpr_agreement">
                        By this check, you agree that the data provided by you through this form
                        will be processed exclusively to upload this document on the platform and
                        that the MKBT team will contact you only in connection with this submission.
                        Here you can find{' '}
                        <Link to="/termeni-si-conditii" target="_blank">
                          our regulations on the processing of personal data
                        </Link>
                        .
                      </Trans>
                    ),
                  },
                ]}
              />
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
                        hl={language}
                        languageOverride={language}
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
