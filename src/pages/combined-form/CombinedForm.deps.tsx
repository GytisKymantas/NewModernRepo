import DownloadIcon from '@/assets/icons/DownloadIcon';
import OverviewIcon from '@/assets/icons/OverviewIcon';
import { CustomFieldProps } from '@/components/FormBuilder';
import SearchableField from '@/components/FormBuilder/components/SearchableField';
import FormTable from '@/components/OwnedProperties/FormTable';
import ServiceDetails from '@/components/OwnedProperties/ServiceDetails';
import PrimaryButton from '@/components/common/PrimaryButton';
import { PricingTable } from '../form-examples/MultiStepServiceForm.deps';

const CombinedFormTableData = {
  cols: [
    { key: 'doc', label: 'Dokumentas' },
    { key: 'status', label: 'Būsena', headerAlign: 'left', cellAlign: 'left' },
  ],
  rows: [
    {
      doc: 'Prašymas išduoti pažymą apie viešuosiuose pirkimuose dalyvaujantį tiekėją',
      status: 'Pasirašytas',
      actions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
    },
  ],
};

const DelayedTableTada = {
  cols: [
    {
      key: 'delayedDate',
      label: 'Atidėjimo data',
      cellStyles: { verticalAlign: 'top' },
    },
    {
      key: 'receivedDocs',
      label: 'Gauti dokumentai',
      headerAlign: 'left',
      cellAlign: 'left',
    },
    {
      key: 'submittedDocs',
      label: 'Pateikti dokumentai',
      headerAlign: 'left',
      cellAlign: 'left',
    },
  ],
  rows: [
    {
      delayedDate: '2025-07-13',
      receivedDocs: 'Pranešimas dėl termino trūkumams pašalinti nustatymo',
      submittedDocs:
        'Prašymas išduoti pažymą apie viešuosiuose pirkimuose dalyvaujantį tiekėją',
      receivedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
      submittedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
    },
  ],
};

const CompletedTableTada = {
  cols: [
    {
      key: 'delayedDate',
      label: 'Atidėjimo data',
      cellStyles: { verticalAlign: 'top' },
    },
    {
      key: 'receivedDocs',
      label: 'Gauti dokumentai',
      headerAlign: 'left',
      cellAlign: 'left',
    },
    {
      key: 'submittedDocs',
      label: 'Pateikti dokumentai',
      headerAlign: 'left',
      cellAlign: 'left',
    },
  ],
  rows: [
    {
      delayedDate: '2025-07-13',
      receivedDocs: 'Pranešimas dėl termino trūkumams pašalinti nustatymo',
      submittedDocs:
        'Prašymas išduoti pažymą apie viešuosiuose pirkimuose dalyvaujantį tiekėją',
      receivedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
      submittedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
    },
    {
      delayedDate: '2025-07-13',
      receivedDocs: 'Pranešimas dėl termino trūkumams pašalinti nustatymo',
      submittedDocs:
        'Prašymas išduoti pažymą apie viešuosiuose pirkimuose dalyvaujantį tiekėją',
      receivedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
      submittedDocsActions: (
        <>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<OverviewIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
          >
            Peržiūrėti
          </PrimaryButton>
          <PrimaryButton
            variant='text'
            size='small'
            startIcon={<DownloadIcon />}
            sx={{
              color: '#1F2733',
              '&:hover': {
                backgroundColor: 'inherit',
                boxShadow: 'none',
              },
            }}
            onClick={() => {}}
          >
            Atsisiųsti
          </PrimaryButton>
        </>
      ),
    },
  ],
};

function ServiceDetail({
  title,
  rows,
  sxStyle,
  withHeading,
  textSpacing,
  isWithoutDivider,
}: CustomFieldProps) {
  return (
    <ServiceDetails
      title={title}
      rows={rows}
      sxStyle={sxStyle}
      withHeading={withHeading}
      textSpacing={textSpacing}
      isWithoutDivider={isWithoutDivider}
    />
  );
}

function FormTableData({
  sxStyle,
  cols,
  rows,
  hasAdditionalRowActions,
}: CustomFieldProps) {
  return (
    <FormTable
      sxStyle={sxStyle}
      rows={rows}
      cols={cols}
      hasAdditionalRowActions={hasAdditionalRowActions}
    />
  );
}

type SearchableModalInputProps = CustomFieldProps;

function PricingTableData({ document, price, sxStyle }: CustomFieldProps) {
  return <PricingTable document={document} price={price} sxStyle={sxStyle} />;
}

function SearchableModalInput({
  id,
  name,
  label,
  control,
  errors,
  withTriggerText,
  placeholderText,
  sxStyle,
  ModalComponent,
}: SearchableModalInputProps): JSX.Element {
  return (
    <SearchableField
      ModalComponent={ModalComponent}
      id={id}
      name={name}
      label={label}
      control={control}
      errors={errors}
      withTriggerText={withTriggerText}
      placeholderText={placeholderText}
      sxStyle={sxStyle}
    />
  );
}

export {
  CombinedFormTableData,
  CompletedTableTada,
  DelayedTableTada,
  FormTableData,
  PricingTableData,
  SearchableModalInput,
  ServiceDetail,
};
