import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Spin, Typography } from 'antd';
import { Trans } from '@lingui/macro';
import { Redirect } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import PinDrop from '../../images/pin_drop.svg';

import config from '../../config';
import HereMapAddBuilding from '../../components/HereMapAddBuilding/HereMapAddBuilding';

const { Title } = Typography;

const { BUILDINGS_URL, MAP_API_KEY, CAPTCHA_API_KEY } = config;

const layout = {
  labelCol: { sm: { span: 24 }, md: { span: 6 }, lg: { span: 4 } },
  wrapperCol: { sm: { span: 24 }, md: { span: 10 }, lg: { span: 10 } },
};

const { Option } = Select;

const EmptyFieldMessage = () => <Trans>Cannot be left empty!</Trans>;
const MaxLengthMessage = ({ maxLen }) => (
  <Trans>Field cannot exceed a maximum of {maxLen} characters!</Trans>
);

const FormFragment = ({ form }) => {
  const [state, setState] = useState({
    riskCategories: [],
    requestError: false,
    loading: true,
    finished: false,
  });
  const [mapSearchText, setMapSearchText] = useState(undefined);
  const [coordinates, setCoordinates] = useState(undefined);
  const { getFieldDecorator } = form;
  const fields = form.getFieldsValue();

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
    const getRiskCategories = async () => {
      try {
        const res = await fetch(`${BUILDINGS_URL}/public_create/`, { method: 'OPTIONS' });
        if (res.ok) {
          const posts = await res.json();
          const { choices } = posts.actions.POST.risk_category;
          setState((prevState) => ({
            ...prevState,
            requestError: false,
            riskCategories: choices,
            loading: false,
          }));
        } else {
          throw new Error(res.statusText);
        }
      } catch (err) {
        setState((prevState) => ({ ...prevState, loading: false, requestError: true }));
      }
    };

    getRiskCategories();
  }, []);

  if (state.loading) {
    return (
      <div className="form-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (state.requestError) {
    return (
      <div className="form-loading">
        <Title level={3}>
          <Trans>Server unavailable</Trans>
        </Title>
      </div>
    );
  }

  if (state.finished) {
    return <Redirect push to="/multumim" />;
  }

  return (
    <Form labelAlign="left" {...layout} onSubmit={onFinish}>
      <Title level={3} underline>
        <img src={PinDrop} alt="" height="20px" />
        <Trans>Building Info</Trans>
      </Title>
      <Form.Item label={<Trans>Street</Trans>}>
        {getFieldDecorator('address', {
          rules: [
            { required: true, message: <EmptyFieldMessage /> },
            { max: 250, message: <MaxLengthMessage maxLen={250} /> },
          ],
        })(<Input disabled={state.requestError} />)}
      </Form.Item>
      <Form.Item label={<Trans>Street number</Trans>}>
        {getFieldDecorator('street_number', {
          rules: [
            { required: true, message: <EmptyFieldMessage /> },
            { max: 100, message: <MaxLengthMessage maxLen={100} /> },
          ],
        })(<Input disabled={state.requestError} />)}
      </Form.Item>
      <Form.Item label={<Trans>Locality</Trans>}>
        {getFieldDecorator('locality', {
          rules: [
            { required: true, message: <EmptyFieldMessage /> },
            { max: 20, message: <MaxLengthMessage maxLen={20} /> },
          ],
        })(<Input disabled={state.requestError} />)}
      </Form.Item>
      <Form.Item label={<Trans>County</Trans>}>
        {getFieldDecorator('county', {
          rules: [
            { required: true, message: <EmptyFieldMessage /> },
            { max: 60, message: <MaxLengthMessage maxLen={60} /> },
          ],
        })(<Input disabled={state.requestError} />)}
      </Form.Item>
      <Form.Item wrapperCol={{ sm: { span: 48 }, md: { span: 16 }, lg: { span: 14 } }}>
        <HereMapAddBuilding
          apiKey={MAP_API_KEY}
          searchText={mapSearchText}
          onCoordinatesChange={onCoordinatesChange}
        />
      </Form.Item>
      <Form.Item label={<Trans>Height regime</Trans>}>
        {getFieldDecorator('height_regime', {
          rules: [
            { required: true, message: <EmptyFieldMessage /> },
            { max: 50, message: <MaxLengthMessage maxLen={50} /> },
          ],
        })(<Input disabled={state.requestError} />)}
      </Form.Item>
      <Form.Item label={<Trans>Risk category</Trans>}>
        {getFieldDecorator('risk_category', {
          rules: [{ required: true, message: <EmptyFieldMessage /> }],
        })(
          <Select disabled={state.requestError}>
            {state.riskCategories.map((category) => (
              <Option key={category.value} value={category.value}>
                {category.display_name}
              </Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item label={<Trans>Captcha</Trans>}>
        {getFieldDecorator('captcha', {
          rules: [{ required: true, message: <EmptyFieldMessage /> }],
        })(<HCaptcha sitekey={CAPTCHA_API_KEY} onVerify={handleVerifyCaptcha} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={state.requestError}>
          <Trans>Add a building</Trans>
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: 'add_building' })(FormFragment);
