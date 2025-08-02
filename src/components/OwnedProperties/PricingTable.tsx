import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SxProps } from '@mui/system';

type PricingTableProps = {
  sxStyle?: SxProps;
  document?: string;
  price?: number;
};

function PricingTable({ sxStyle, document, price }: PricingTableProps) {
  return (
    <TableContainer sx={{ borderRadius: '8px', border: '2px solid #c5cad1', ...sxStyle }}>
      <Table
        sx={{
          backgroundColor: '#f9fafb',
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: 0,
          '& .MuiTableCell-root': {
            borderRight: 'none',
            borderLeft: 'none',
            borderTop: 'none',
          },
          '& .MuiTableCell-root:not(:last-of-type)': {
            borderRight: '2px solid #c5cad1',
          },
          '& tbody .MuiTableRow-root:not(:last-of-type)': {
            borderBottom: '2px solid #c5cad1',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f9fafb' }}>Paslauga</TableCell>
            <TableCell align='right' sx={{ backgroundColor: '#f9fafb' }}>
              Kaina
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell sx={{ borderRight: 'none' }}>{document}</TableCell>
            <TableCell align='right' sx={{ borderLeft: 'none' }}>
              {price}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align='right'
              sx={{
                fontWeight: 'bold',
                borderRight: 'none',
              }}
            >
              Bendra suma
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 'bold',
                borderLeft: 'none',
                width: '100px',
              }}
              align='right'
            >
              {price}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
