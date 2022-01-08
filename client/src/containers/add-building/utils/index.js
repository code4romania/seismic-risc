import { Trans } from '@lingui/macro';
import React from 'react';
import FormCheckbox from '../../../components/FormCheckbox';
import FormInput from '../../../components/FormInput';
import FormTextArea from '../../../components/FormTextArea';

// @TODO add translation

export const formFields = {
  extraInfoFields: {
    generalInfoFields: [
      {
        fieldName: 'is_still_present',
        label: <Trans>Mai există clădirea la adresa indicată?</Trans>,
        options: [
          {
            value: 'YES',
            text: <Trans>Yes</Trans>,
          },
          { value: 'NO', text: <Trans>No</Trans> },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'consolidation_status',
        label: <Trans>Clădirea a fost consolidată/reabilitată de la data expertizării?</Trans>,
        options: [
          {
            value: 'NO',
            text: <Trans>No</Trans>,
          },
          { value: 'YES_PRIVATE', text: <Trans>da, fonduri proprii</Trans> },
          { value: 'YES_PUBLIC', text: <Trans>da, fonduri publice</Trans> },
          {
            value: 'DEMOLISHED',
            text: (
              <Trans>
                clădirea cu risc seismic a fost demolată și s-a construit clădire nouă în locul ei
              </Trans>
            ),
          },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'work_performed',
        label: <Trans>Ce lucrări au fost efectuate?</Trans>,
        options: [
          {
            value: '0',
            text: <Trans>consolidate structură</Trans>,
          },
          { value: '1', text: <Trans>consolidare fundație</Trans> },
          { value: '2', text: <Trans>reabilitare instalații comune</Trans> },
          {
            value: '3',
            text: <Trans>izolare termică</Trans>,
          },
          {
            value: '4',
            text: <Trans>reparații tencuială exterioară și acoperiș/terasă</Trans>,
          },
          {
            value: '5',
            text: <Trans>altele</Trans>,
          },
        ],
        // @TODO user can see a new field and fill in other work performed when option 5 is selected
        component: FormCheckbox,
      },
      {
        fieldName: 'apartment_count',
        label: <Trans>Câte locuințe sunt în clădire?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'permanently_occupied_apartment_count',
        label: <Trans>Număr de locuințe ocupate permanent?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'residents_count',
        label: <Trans>Câte persoane locuiesc în aceste locuințe?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'owners_count',
        label: <Trans>Câți proprietari dețin apartamente în acest imobil?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'public_apartment_count',
        label: <Trans>Din care, câte apartamente în proprietate publică?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'public_owners',
        label: <Trans>Vă rugăm menționați proprietarii publici</Trans>,
        note: (
          <Trans>
            Notă: prin proprietate publică înțelegem locuințe deținute de Administrația Fondului
            Imobiliar – AFI (fostul ICRAL), RAPPS, Birouri de primarie, ANAF ș.a.
          </Trans>
        ),
        component: FormInput,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 100 }],
      },
      {
        fieldName: 'rented_apartment_count',
        label: <Trans>Câte apartamente sunt locuite în regim de chirie?</Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
    ],
    buildingAdministrationFields: [
      {
        fieldName: 'has_owners_association',
        label: <Trans>Există asociație de proprietari?</Trans>,
        note: (
          <Trans>
            Conform legii, asociațiile de proprietari se înființează pentru condominii cu minim 3
            unități de locuit.
          </Trans>
        ),
        options: [
          {
            value: 'YES',
            text: <Trans>Yes</Trans>,
          },
          { value: 'NO', text: <Trans>No</Trans> },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'apartments_with_6_months_debt',
        label: (
          <Trans>
            Câte dintre apartamentele din clădire înregistrează datorii la întreținere mai mari de 6
            luni?
          </Trans>
        ),
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'disconnected_utilities',
        label: <Trans>Imobilul este deconectat de la vreun servicu de utilitate publică?</Trans>,
        note: (
          <Trans>
            Dacă da, indicați de la ce serviciu/servicii este deconectat. (Serviciu de utilitate
            publică: apă, canalizare, electricitate, termoficare)
          </Trans>
        ),
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
      {
        fieldName: 'broken_utilities',
        label: <Trans>Imobilul înregistrează elemente tehnice nefuncționale?</Trans>,
        note: (
          <Trans>
            Spre exemplu: conductele, rețeaua de încălzire etc. Dacă da, indicati ce elemente nu
            funcționează.
          </Trans>
        ),
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
    ],
    spaceUsageFields: [
      {
        fieldName: 'office_count',
        label: <Trans>Câte apartamente sunt folosite ca birou de firmă? </Trans>,
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'commercial_space_count',
        label: <Trans>Câte spații comerciale și de servicii există în clădire?</Trans>,
        note: (
          <Trans>
            Notă: Prin spații comerciale și de servicii ne referim la magazine, ateliere,
            restaurante, cinema-uri, teatre ș.a., a căror activitate a fost suspendată în urma
            adoptării Legii 282/2015 pentru modificarea si completarea OG 20/1994 privind masuri
            pentru reducerea riscului seismic al constructiilor existente.
          </Trans>
        ),
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'self_owned_commercial_space_count',
        label: (
          <Trans>
            Din aceste spații/apartamente cu altă funcțiune decât locuire, câte sunt proprietate a
            firmelor care le utilizează?
          </Trans>
        ),
        component: FormInput,
        wrapperCol: { span: 6 },
        rulesOptions: [{ ruleName: 'integer' }],
      },
      {
        fieldName: 'proximal_utilities',
        label: <Trans>Ce există în imediata vecinătate a clădirii?</Trans>,
        note: (
          <Trans>
            Notă: Prin vecinătate ne referim la clădiri și funcțiuni la o distanță de până la 10 m
            de clădirea vizată.
          </Trans>
        ),
        options: [
          {
            value: '0',
            text: <Trans>Alte clădiri rezidențiale</Trans>,
          },
          {
            value: '1',
            text: (
              <Trans>
                Clădiri cu funcții comerciale sau culturale (eg. restaurant, magazin, galerie,
                cinema, teatru ș.a.)
              </Trans>
            ),
          },
          {
            value: '2',
            text: <Trans>Clădiri cu funcție publică (eg. grădiniță, școală ș.a.)</Trans>,
          },
          {
            value: '3',
            text: <Trans>Spațiu public: parc, parcare ș.a.</Trans>,
          },
          {
            value: '4',
            text: <Trans>Curtea aferentă imobilului</Trans>,
          },
          {
            value: '5',
            text: <Trans>Teren neutilizat fără construcții sau anexe</Trans>,
          },
        ],
        component: FormCheckbox,
      },
      {
        fieldName: 'proximal_utilities_description',
        label: <Trans>Comentarii privind funcțiunile din proximitatea imobilului</Trans>,
        component: FormTextArea,
        wrapperCol: { span: 18 },
        rulesOptions: [{ ruleName: 'max', value: 250 }],
      },
    ],
  },
};

export default { formFields };
