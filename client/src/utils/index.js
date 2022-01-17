import { camelCase, isArray, isObject, snakeCase } from 'lodash';

const createObjectKeyMapper = (keyMappingFunction) => {
  function mapper(data) {
    if (isArray(data)) {
      return data.map(mapper);
    }

    if (isObject(data)) {
      return Object.entries(data).reduce(
        (o, [key, value]) => ({
          ...o,
          [keyMappingFunction(key)]: mapper(value),
        }),
        {},
      );
    }

    return data;
  }

  return mapper;
};

export const mapKeysToCamelCase = createObjectKeyMapper(camelCase);
export const mapKeysToSnakeCase = createObjectKeyMapper(snakeCase);
