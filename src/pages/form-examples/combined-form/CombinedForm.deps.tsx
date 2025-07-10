import DownloadIcon from '@/assets/icons/DownloadIcon';
import DownloadIconLabel from '@/components/Signature/components/DownloadIconLabel';

const CombinedFormTableData = {
  cols: [
    { key: 'doc', label: 'Dokumentas' },
    { key: 'status', label: 'Būsena' },
    { key: 'actions', label: 'Veiksmai' },
  ],
  rows: [
    {
      doc: 'Prašymas išduoti pažymą apie viešuosiuose pirkimuose dalyvaujantį tiekėją',
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

export default CombinedFormTableData;
