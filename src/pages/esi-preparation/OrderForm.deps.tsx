import { CustomFieldProps } from '@/components/FormBuilder';
import { PricingTable } from '../form-examples/MultiStepServiceForm.deps';

export default function PricingTableData({ sxStyle, document, price }: CustomFieldProps) {
  return <PricingTable sxStyle={sxStyle} document={document} price={price} />;
}
