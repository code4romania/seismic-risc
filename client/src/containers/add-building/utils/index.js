import { Trans } from '@lingui/macro';
import React from 'react';
import FormCheckbox from '../../../components/FormCheckbox';
import FormInput from '../../../components/FormInput';
import FormTextArea from '../../../components/FormTextArea';

export const formFields = {
  extraInfoFields: {
    generalInfoFields: [
      {
        fieldName: 'is_still_present',
        label: <Trans id="form.is_still_present.label" />,
        options: [
          {
            value: 'YES',
            text: <Trans id="general.yes" />,
          },
          { value: 'NO', text: <Trans id="general.no" /> },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'consolidation_status',
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
        component: FormCheckbox,
      },
      {
        fieldName: 'work_performed',
        label: <Trans id="form.work_performed.label" />,
        options: [
          {
            value: '0',
            text: <Trans id="form.work_performed.0" />,
          },
          { value: '1', text: <Trans id="form.work_performed.1" /> },
          {
            value: '2',
            text: <Trans id="form.work_performed.2" />,
          },
          {
            value: '3',
            text: <Trans id="form.work_performed.3" />,
          },
          {
            value: '4',
            text: <Trans id="form.work_performed.4" />,
          },
          {
            value: '5',
            text: <Trans id="form.work_performed.5" />,
          },
        ],
        // @TODO user can see a new field and fill in other work performed when option 5 is selected
        component: FormCheckbox,
      },
      {
        fieldName: 'apartment_count',
        label: <Trans id="form.apartment_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'permanently_occupied_apartment_count',
        label: <Trans id="form.permanently_occupied_apartment_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'residents_count',
        label: <Trans id="form.residents_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'owners_count',
        label: <Trans id="form.owners_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'public_apartment_count',
        label: <Trans id="form.public_apartment_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'public_owners',
        label: <Trans id="form.public_owners.label" />,
        note: <Trans id="form.public_owners.note" />,
        component: FormInput,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 100 }],
      },
      {
        fieldName: 'rented_apartment_count',
        label: <Trans id="form.rented_apartment_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
    ],
    buildingAdministrationFields: [
      {
        fieldName: 'has_owners_association',
        label: <Trans id="form.has_owners_association.label" />,
        note: <Trans id="form.has_owners_association.note" />,
        options: [
          {
            value: 'YES',
            text: <Trans id="general.yes" />,
          },
          { value: 'NO', text: <Trans id="general.no" /> },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'apartments_with_6_months_debt',
        label: <Trans id="form.apartments_with_6_months_debt.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'disconnected_utilities',
        label: <Trans id="form.disconnected_utilities.label" />,
        note: <Trans id="form.disconnected_utilities.note" />,
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
      {
        fieldName: 'broken_utilities',
        label: <Trans id="form.broken_utilities.label" />,
        note: <Trans id="form.broken_utilities.note" />,
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
    ],
    spaceUsageFields: [
      {
        fieldName: 'office_count',
        label: <Trans id="form.office_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'commercial_space_count',
        label: <Trans id="form.commercial_space_count.label" />,
        note: <Trans id="form.commercial_space_count.note" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'self_owned_commercial_space_count',
        label: <Trans id="form.self_owned_commercial_space_count.label" />,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'proximal_utilities',
        label: <Trans id="form.proximal_utilities.label" />,
        note: <Trans id="form.proximal_utilities.note" />,
        options: [
          {
            value: '0',
            text: <Trans id="form.proximal_utilities.0" />,
          },
          {
            value: '1',
            text: <Trans id="form.proximal_utilities.1" />,
          },
          {
            value: '2',
            text: <Trans id="form.proximal_utilities.2" />,
          },
          {
            value: '3',
            text: <Trans id="form.proximal_utilities.3" />,
          },
          {
            value: '4',
            text: <Trans id="form.proximal_utilities.4" />,
          },
          {
            value: '5',
            text: <Trans id="form.proximal_utilities.5" />,
          },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'proximal_utilities_description',
        label: <Trans id="form.proximal_utilities_description.label" />,
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
    ],
  },
};

export default { formFields };
