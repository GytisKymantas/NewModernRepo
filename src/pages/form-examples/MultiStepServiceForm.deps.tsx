import DownloadIcon from '@/assets/icons/DownloadIcon';
import { CustomFieldProps } from '@/components/FormBuilder';
import FormTable from '@/components/OwnedProperties/FormTable';
import PricingTable from '@/components/OwnedProperties/PricingTable';
import ServiceDetails from '@/components/OwnedProperties/ServiceDetails';
import DownloadIconLabel from '@/components/Signature/components/DownloadIconLabel';

function ServiceDetail({
  title,
  rows,
  sxStyle,
  withHeading,
  textSpacing,
}: CustomFieldProps) {
  return (
    <ServiceDetails
      title={title}
      rows={rows}
      sxStyle={sxStyle}
      withHeading={withHeading}
      textSpacing={textSpacing}
    />
  );
}
function FormTableData({ sxStyle, cols, rows }: CustomFieldProps) {
  return <FormTable sxStyle={sxStyle} rows={rows} cols={cols} />;
}

function PricingTableData() {
  return <PricingTable />;
}

const sampleTableData = {
  cols: [
    { key: 'doc', label: 'Dokumentas' },
    { key: 'status', label: 'Būsena' },
    { key: 'actions', label: 'Veiksmai' },
  ],
  rows: [
    {
      doc: 'Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą JAR-5-E',
      status: 'Pasirašytas',
      actions: (
        <DownloadIconLabel
          label='Atsisiųsti'
          svg={<DownloadIcon />}
          style={{ justifyContent: 'flex-end' }}
        />
      ),
    },
    {
      doc: 'Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą JAR-5-E',
      status: 'Pasirašytas',
      actions: (
        <DownloadIconLabel
          label='Atsisiųsti'
          svg={<DownloadIcon />}
          style={{ justifyContent: 'flex-end' }}
        />
      ),
    },
    {
      doc: 'Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą JAR-5-E',
      status: 'Pasirašytas',
      actions: (
        <DownloadIconLabel
          label='Atsisiųsti'
          svg={<DownloadIcon />}
          style={{ justifyContent: 'flex-end' }}
        />
      ),
    },
  ],
};

export { FormTableData, PricingTable, PricingTableData, ServiceDetail, sampleTableData };
