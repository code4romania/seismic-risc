import { useCallback } from 'react';
import config from '../../config';
import { mapKeysToSnakeCase } from '../../utils';

const { BUILDINGS_URL } = config;

export const useAddBuilding = () => {
  return useCallback(async (formValues) => {
    try {
      const valuesToSend = {
        address: formValues.address,
        streetNumber: formValues.streetNumber,
        county: formValues.county,
        locality: formValues.locality,
        lat: formValues.lat ?? null,
        lng: formValues.lng ?? null,
        riskCategory: formValues.riskCategory,
        heightRegime: formValues.heightRegime,
        images: [], // @TODO add images from form after API is fixed
        fullName: formValues.fullName,
        emailAddress: formValues.emailAddress,
        phoneNumber: formValues.phoneNumber,
        typeOfContact: formValues.typeOfContact,
        necessarySupport: formValues.necessarySupport ?? '',
        isStillPresent: formValues.isStillPresent ?? false,
        consolidationStatus: formValues.consolidationStatus ?? 'NO',
        workPerformed: formValues.workPerformed ?? [],
        apartmentCount: formValues.apartmentCount ?? null,
        permanentlyOccupiedApartmentCount: formValues.permanentlyOccupiedApartmentCount ?? null,
        residentsCount: formValues.residentsCount ?? null,
        ownersCount: formValues.ownersCount ?? null,
        publicApartmentCount: formValues.publicApartmentCount ?? null,
        publicOwners: formValues.publicOwners ?? '',
        rentedApartmentCount: formValues.rentedApartmentCount ?? null,
        hasOwnersAssociation: formValues.hasOwnersAssociation ?? false,
        apartmentsWith6MonthsDebt: formValues.apartmentsWith6MonthsDebt ?? null,
        disconnectedUtilities: formValues.disconnectedUtilities ?? '',
        brokenUtilities: formValues.brokenUtilities ?? '',
        officeCount: formValues.officeCount ?? null,
        commercialSpaceCount: formValues.commercialSpaceCount ?? null,
        selfOwnedCommercialSpaceCount: formValues.selfOwnedCommercialSpaceCount ?? null,
        proximalUtilities: formValues.proximalUtilities ?? [],
        proximalUtilitiesDescription: formValues.proximalUtilitiesDescription ?? '',
      };

      const valuestoSendSnakeCase = mapKeysToSnakeCase(valuesToSend);

      const res = await fetch(`${BUILDINGS_URL}/public_create/`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(valuestoSendSnakeCase),
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
