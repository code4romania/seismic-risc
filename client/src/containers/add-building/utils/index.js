import { sortBy } from 'lodash';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import FormCheckbox from '../../../components/FormCheckbox';
import FormInput from '../../../components/FormInput';
import FormRadio from '../../../components/FormRadio';
import FormTextArea from '../../../components/FormTextArea';
import { useProximalUtilitiesQuery, useWorkPerformedQuery } from '../../../queries';
import { useGlobalContext } from '../../../context';

export const useExtraInfoFormFields = () => {
  const { currentLanguage } = useGlobalContext();
  const { proximalUtilities } = useProximalUtilitiesQuery();
  const { workPerformed } = useWorkPerformedQuery();

  const proximalUtilitiesOptions = useMemo(
    () =>
      sortBy(proximalUtilities, 'id').map(({ id, nameRo, nameEn }) => ({
        value: id.toString(),
        text: currentLanguage === 'ro' ? nameRo : nameEn,
      })) ?? [],
    [proximalUtilities, currentLanguage],
  );

  const workPerformedOptions = useMemo(
    () =>
      sortBy(workPerformed, 'id').map(({ id, nameRo, nameEn }) => ({
        value: id.toString(),
        text: currentLanguage === 'ro' ? nameRo : nameEn,
      })) ?? [],
    [workPerformed, currentLanguage],
  );

  return useMemo(
    () => ({
      generalInfoFields: [
        {
          fieldName: 'isStillPresent',
          label: <Trans id="form.is_still_present.label" />,
          options: [
            {
              value: 'YES',
              text: <Trans id="general.yes" />,
            },
            { value: 'NO', text: <Trans id="general.no" /> },
          ],
          component: FormRadio,
        },
        {
          fieldName: 'consolidationStatus',
          label: <Trans id="form.consolidation_status.label" />,
          options: [
            {
              value: 'NO',
              text: <Trans id="general.no" />,
            },
            { value: 'YES_PRIVATE', text: <Trans id="form.consolidation_status.yes_private" /> },
            { value: 'YES_PUBLIC', text: <Trans id="form.consolidation_status.yes_public" /> },
            {
              value: 'DEMOLISHED',
              text: <Trans id="form.consolidation_status.demolished" />,
            },
          ],
          component: FormRadio,
        },
        {
          fieldName: 'workPerformed',
          label: <Trans id="form.work_performed.label" />,
          options: workPerformedOptions,
          component: FormCheckbox,
        },
        {
          fieldName: 'apartmentCount',
          label: <Trans id="form.apartment_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'permanentlyOccupiedApartmentCount',
          label: <Trans id="form.permanently_occupied_apartment_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'residentsCount',
          label: <Trans id="form.residents_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'ownersCount',
          label: <Trans id="form.owners_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'publicApartmentCount',
          label: <Trans id="form.public_apartment_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'publicOwners',
          label: <Trans id="form.public_owners.label" />,
          note: <Trans id="form.public_owners.note" />,
          component: FormTextArea,
          rulesOptions: [{ ruleName: 'max', value: 100 }],
        },
        {
          fieldName: 'rentedApartmentCount',
          label: <Trans id="form.rented_apartment_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
      ],
      buildingAdministrationFields: [
        {
          fieldName: 'hasOwnersAssociation',
          label: <Trans id="form.has_owners_association.label" />,
          note: <Trans id="form.has_owners_association.note" />,
          options: [
            {
              value: 'YES',
              text: <Trans id="general.yes" />,
            },
            { value: 'NO', text: <Trans id="general.no" /> },
          ],
          component: FormRadio,
        },
        {
          fieldName: 'apartmentsWith6MonthsDebt',
          label: <Trans id="form.apartments_with_6_months_debt.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'disconnectedUtilities',
          label: <Trans id="form.disconnected_utilities.label" />,
          note: <Trans id="form.disconnected_utilities.note" />,
          component: FormTextArea,
          rulesOptions: [{ ruleName: 'max', value: 250 }],
        },
        {
          fieldName: 'brokenUtilities',
          label: <Trans id="form.broken_utilities.label" />,
          note: <Trans id="form.broken_utilities.note" />,
          component: FormTextArea,
          rulesOptions: [{ ruleName: 'max', value: 250 }],
        },
      ],
      spaceUsageFields: [
        {
          fieldName: 'officeCount',
          label: <Trans id="form.office_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'commercialSpaceCount',
          label: <Trans id="form.commercial_space_count.label" />,
          note: <Trans id="form.commercial_space_count.note" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'selfOwnedCommercialSpaceCount',
          label: <Trans id="form.self_owned_commercial_space_count.label" />,
          component: FormInput,
          wrapperCol: { xs: 24, md: 12, lg: 6 },
          rulesOptions: [{ ruleName: 'integer' }],
        },
        {
          fieldName: 'proximalUtilities',
          label: <Trans id="form.proximal_utilities.label" />,
          note: <Trans id="form.proximal_utilities.note" />,
          options: proximalUtilitiesOptions,
          component: FormCheckbox,
        },
        {
          fieldName: 'proximalUtilitiesDescription',
          label: <Trans id="form.proximal_utilities_description.label" />,
          component: FormTextArea,
          rulesOptions: [{ ruleName: 'max', value: 250 }],
        },
      ],
    }),
    [proximalUtilities],
  );
};

export default { useExtraInfoFormFields };
