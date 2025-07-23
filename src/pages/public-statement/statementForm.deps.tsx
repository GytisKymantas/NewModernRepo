import { CustomFieldProps } from '@/components/FormBuilder';
import TableWithModal from '@/components/FormBuilder/components/TableWithModal';
import { PricingTable } from '../form-examples/MultiStepServiceForm.deps';

type TableWithModalDataProps = CustomFieldProps;

function PricingTableData({ document, price }: CustomFieldProps) {
  return <PricingTable document={document} price={price} />;
}

function TableWithModalData({
  id,
  name,
  label,
  control,
  errors,
  ModalComponent,
}: TableWithModalDataProps): JSX.Element {
  return (
    <TableWithModal
      ModalComponent={ModalComponent}
      id={id}
      name={name}
      label={label}
      control={control}
      errors={errors}
    />
  );
}

export { PricingTableData, TableWithModalData };
