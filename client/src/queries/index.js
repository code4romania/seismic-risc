import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';
import { t } from '@lingui/macro';

import config from '../config';

const { BUILDINGS_URL } = config;

export const useRiskCategoriesQuery = () => {
  const [riskCategories, setRiskCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRiskCategories = useCallback(async () => {
    try {
      const res = await fetch(`${BUILDINGS_URL}/public_create/`, { method: 'OPTIONS' });
      if (res.ok) {
        const posts = await res.json();
        const { choices } = posts.actions.POST.risk_category;
        setRiskCategories(choices);
        setIsLoading(false);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      message.error(t({ id: 'form.error.fetch_risk_categories' }));
    }
  }, []);

  useEffect(() => {
    fetchRiskCategories();
  }, []);

  return { isError, isLoading, riskCategories };
};

export default { useRiskCategoriesQuery };
