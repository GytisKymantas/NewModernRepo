import theme from '@/theme';
import {
  Box,
  Card,
  CardContent,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type ColAlignment = 'left' | 'center' | 'right';

type Column<Row> = {
  key: keyof Row;
  label: React.ReactNode;
  headerAlign?: ColAlignment;
  cellAlign?: ColAlignment | ((row: Row) => ColAlignment);
};

type FormTableProps<Row> = {
  sxStyle?: SxProps;
  cols: Column<Row>[];
  rows: Row[];
};

type MobileTableProps<Row> = {
  cols: Column<Row>[];
  rows: Row[];
};

function MobileTable<Row extends Record<string, any>>({
  cols,
  rows,
}: MobileTableProps<Row>) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: '34.5px' }}>
      {rows.map((row, index) => (
        <Card key={row.id ?? index} sx={{ borderRadius: 0 }}>
          <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
            {cols.map((col) => (
              <Box
                key={String(col.key)}
                sx={{
                  mb: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'flex-start',
                  pt: '16px',
                  justifyContent:
                    typeof col.cellAlign === 'function'
                      ? col.cellAlign(row)
                      : col.cellAlign ?? 'left',
                }}
              >
                <Box sx={{ alignSelf: 'flex-start', pt: '16px' }}>
                  <Typography component='div'>{col.label}</Typography>
                  <Typography component='div' sx={{ pt: '4px' }}>
                    {row[col.key]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

function FormTable<Row extends Record<string, any>>({
  sxStyle,
  cols,
  rows,
}: FormTableProps<Row>) {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return !isMobile ? (
    <TableContainer sx={{ pb: '34.5px', ...sxStyle }}>
      <Table
        sx={{
          backgroundColor: '#f9fafb',
          borderCollapse: 'collapse',
          width: '100%',
        }}
      >
        <TableHead>
          <TableRow>
            {cols.map((col) => (
              <TableCell
                key={String(col.key)}
                align={col.headerAlign ?? 'left'}
                sx={{ backgroundColor: '#f9fafb' }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={row.id ?? rowIndex}>
              {cols.map((col) => {
                const alignment =
                  typeof col.cellAlign === 'function'
                    ? col.cellAlign(row)
                    : col.cellAlign ?? 'left';

                return (
                  <TableCell
                    sx={{
                      '&:not(:first-of-type):not(:last-of-type)': {
                        borderLeft: 'none',
                        borderRight: 'none',
                      },
                      '&:last-of-type': { borderLeft: 'none' },
                      '&:first-of-type': { borderRight: 'none' },
                    }}
                    key={String(col.key)}
                    align={alignment}
                  >
                    {row[col.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <MobileTable cols={cols} rows={rows} />
  );
}

export default FormTable;
