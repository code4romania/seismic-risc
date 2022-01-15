import { useCallback, useEffect, useState } from 'react';
import config from '../config';
import { mapKeysToCamelCase } from '../utils';

const { BUILDINGS_URL, PROXIMAL_UTILITIES, WORK_PERFORMED } = config;

const useBasicFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(url, options);

      if (!res.ok) throw new Error(res.statusText);

      const resData = await res.json();

      setData(mapKeysToCamelCase(resData));
      setIsLoading(false);
    } catch (error) {
      setData(null);
      setIsError(true);
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isError, isLoading };
};

const defaultGetOptions = { method: 'GET' };

const useGet = (url, options = defaultGetOptions) => {
  return useBasicFetch(url, { ...defaultGetOptions, ...options });
};

const defaultGetOptsOptions = { method: 'OPTIONS' };

const useGetOptions = (url, options = defaultGetOptsOptions) => {
  const { data, isLoading, isError } = useBasicFetch(url, { ...defaultGetOptsOptions, ...options });

  return { postActions: data?.actions.post, isLoading, isError };
};

export const useRiskCategoriesQuery = () => {
  const { postActions, isLoading, isError } = useGetOptions(`${BUILDINGS_URL}/public_create/`);

  const { riskCategory } = postActions ?? {};
  const { choices: riskCategories } = riskCategory ?? {};

  return { isError, isLoading, riskCategories };
};

export const useProximalUtilitiesQuery = () => {
  const { data: proximalUtilities, isLoading, isError } = useGet(PROXIMAL_UTILITIES);

  return { isError, isLoading, proximalUtilities };
};

export const useWorkPerformedQuery = () => {
  const { data: workPerformed, isLoading, isError } = useGet(WORK_PERFORMED);

  return { isError, isLoading, workPerformed };
};
