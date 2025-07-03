import theme from '@/theme';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMediaQuery } from '@mui/system';

function PricingTable() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer sx={{ pb: '34.5px' }}>
      <Table
        sx={{
          backgroundColor: '#f9fafb',
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: '#f9fafb' }}>Paslauga</TableCell>
            <TableCell sx={{ backgroundColor: '#f9fafb' }}>Kaina</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell sx={{ borderRight: 'none' }}>
              Laikinas pavadinimo įrašymas į Juridinių asmenų registrą (Prašymas nr.
              7107622)
            </TableCell>
            <TableCell sx={{ borderLeft: 'none' }}>14,76 Eur</TableCell>
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
                width: isMobile ? '100px' : undefined,
              }}
            >
              14,76 Eur
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PricingTable;
