import { useCallback } from 'react';
import config from '../../config';

const { BUILDINGS_URL } = config;

export const useAddBuilding = () => {
  return useCallback(async (formValues) => {
    try {
      const valuesToSend = {
        address: formValues.address,
        street_number: formValues.street_number,
        county: formValues.county,
        locality: formValues.locality,
        lat: formValues.lat ?? null,
        lng: formValues.lng ?? null,
        risk_category: formValues.risk_category,
        height_regime: formValues.height_regime,
        images: [], // @TODO add images from form after API is fixed
        full_name: formValues.full_name,
        email_address: formValues.email_address,
        phone_number: formValues.phone_number,
        type_of_contact: formValues.type_of_contact,
        necessary_support: formValues.necessary_support ?? '',
        is_still_present: formValues.is_still_present ?? false,
        consolidation_status: formValues.consolidation_status ?? 'NO',
        work_performed: formValues.work_performed ?? [],
        apartment_count: formValues.apartment_count ?? null,
        permanently_occupied_apartment_count:
          formValues.permanently_occupied_apartment_count ?? null,
        residents_count: formValues.residents_count ?? null,
        owners_count: formValues.owners_count ?? null,
        public_apartment_count: formValues.public_apartment_count ?? null,
        public_owners: formValues.public_owners ?? '',
        rented_apartment_count: formValues.rented_apartment_count ?? null,
        has_owners_association: formValues.has_owners_association ?? false,
        apartments_with_6_months_debt: formValues.apartments_with_6_months_debt ?? null,
        disconnected_utilities: formValues.disconnected_utilities ?? '',
        broken_utilities: formValues.broken_utilities ?? '',
        office_count: formValues.office_count ?? null,
        commercial_space_count: formValues.commercial_space_count ?? null,
        self_owned_commercial_space_count: formValues.self_owned_commercial_space_count ?? null,
        proximal_utilities: formValues.proximal_utilities ?? [],
        proximal_utilities_description: formValues.proximal_utilities_description ?? '',
      };

      const res = await fetch(`${BUILDINGS_URL}/public_create/`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(valuesToSend),
      });

      if (!res.ok) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }, []);
};

export default { useAddBuilding };
