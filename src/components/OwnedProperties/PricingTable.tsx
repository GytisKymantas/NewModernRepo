import theme from '@/theme';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SxProps, useMediaQuery } from '@mui/system';

type PricingTableProps = {
  sxStyle?: SxProps;
  document?: string;
  price?: number;
};

function PricingTable({ sxStyle, document, price }: PricingTableProps) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <TableContainer sx={sxStyle}>
      <Table
        sx={{
          backgroundColor: '#f9fafb',
          borderCollapse: 'collapse',
          width: '100%',
          '& .MuiTableCell-root': {
            borderRight: '1px solid rgba(224,224,224,1)',
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
