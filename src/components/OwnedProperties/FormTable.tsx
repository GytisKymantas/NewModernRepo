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

type ColAlignment = 'left' | 'center' | 'right';

type Column<Row> = {
  key: keyof Row;
  label: React.ReactNode;
  headerAlign?: ColAlignment;
  cellAlign?: ColAlignment | ((row: Row) => ColAlignment);
  cellStyles?: SxProps;
};

type FormTableProps<Row> = {
  sxStyle?: SxProps;
  cols: Column<Row>[];
  rows: Row[];
  hasAdditionalRowActions?: boolean;
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
  hasAdditionalRowActions,
}: FormTableProps<Row>) {
  return (
    <TableContainer
      sx={{
        border: '2px solid #c5cad1',
        borderRadius: '8px',
        ...sxStyle,
      }}
    >
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
                  <TableCell key={String(col.key)} align={alignment} sx={col.cellStyles}>
                    {row[col.key]}
                    {hasAdditionalRowActions && (
                      <>
                        {col.key === 'doc' && <Box mt={1}>{row.actions}</Box>}
                        {col.key === 'receivedDocs' && row.receivedDocsActions && (
                          <Box mt={1}>{row.receivedDocsActions}</Box>
                        )}
                        {col.key === 'submittedDocs' && row.submittedDocsActions && (
                          <Box mt={1}>{row.submittedDocsActions}</Box>
                        )}
                      </>
                    )}
                    {/*  jeigu key receivedDocs, submittedDocs arba docs, tada galima actions prideti */}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FormTable;

// border bottom for row should decrease by 1 px
