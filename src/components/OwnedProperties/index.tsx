import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box, useMediaQuery } from '@mui/system';
import { redirectToSelfServiceDashboard } from '@rc-ses/mfe-host';
import { RcSesServicePage } from '@registrucentras/rc-ses-react-components';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import theme from '../../theme';
import AccordionWrapper from '../Service copy/components/AccordionWrapper';
import { HeaderMain } from '../Service copy/components/ServiceDetailsForm';
import ServiceFormAccordion from '../Service copy/components/ServiceFormAccordion';
import ServiceFormContainer from '../Service copy/components/ServiceFormContainer';
import ServiceHeader from '../Service copy/components/ServiceHeader';
import DeleteItemModal from '../Signature/components/DeleteItemModal';
import DownloadIconLabel from '../Signature/components/DownloadIconLabel';
import ServiceFormActions from '../Signature/components/ServiceFormActions';
import useAccordionController from '../hooks/useAccordionController';
import ServiceDetails from './ServiceDetails';

function OwnedProperties() {
  const navigate = useNavigate();
  const accordionController = useAccordionController({
    initialState: {
      serviceDetails: {
        expanded: false,
        canToggle: false,
        state: 'completed',
        title: 'Paslaugos užsakymas',
      },
      serviceIssuance: {
        expanded: false,
        canToggle: false,
        state: 'completed',
        title: 'Dokumentų pasirašymas',
      },
      additionalServices: {
        expanded: true,
        canToggle: false,
        state: 'active',
        title: 'Prašymo peržiūra',
      },
    },
  });

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <RcSesServicePage>
      <ServiceHeader
        breadcrumbsProps={{
          path: [
            { label: 'Savitarna', path: '/' },
            {
              label: 'Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą',
              path: '/sample-form-multiple-steps',
            },
          ],
        }}
        title='Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą'
      />
      <ServiceFormAccordion
        accordionController={accordionController}
        showProgressStepper={upMd}
      >
        {!upMd && <ServiceFormContainer steps={accordionController.state} />}

        <AccordionWrapper
          id='additionalServices'
          controller={accordionController}
          sxStyle={{ background: '#f9fafb' }}
        >
          <ServiceDetails
            title='Prašymo objektas'
            rows={[{ label: 'Laikinai įrašomas pavadinimas', value: 'Pavadinimas' }]}
          />

          <ServiceDetails
            title='Prašymą teikia'
            sxStyle={{ pt: '34.5px' }}
            rows={[
              { label: 'Asmens Kodas', value: '39005201234' },
              { label: 'Vardas, Pavardė', value: 'Vardenis Pavardenis' },
            ]}
          />

          <ServiceDetails
            title='Prašymo būsena'
            sxStyle={{ pt: '34.5px' }}
            rows={[{ label: 'Būsena', value: 'Pildomas' }]}
          />
          <Box sx={{ pt: '34.5px' }}>
            <HeaderMain>Teikiami Dokumentai</HeaderMain>
            <Divider />
          </Box>
          <TableContainer sx={{ pb: '34.5px' }}>
            <Table sx={{ backgroundColor: '#f9fafb' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#f9fafb' }}>Dokumentas</TableCell>
                  <TableCell align='left' sx={{ backgroundColor: '#f9fafb' }}>
                    Būsena
                  </TableCell>
                  <TableCell align='right' sx={{ backgroundColor: '#f9fafb' }}>
                    Veiksmai
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: 'none' }}>
                    Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą
                    JAR-5-E
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none', borderRight: 'none' }}>
                    Pasirašytas
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none' }}>
                    <DownloadIconLabel
                      style={{ justifyContent: 'flex-end' }}
                      label='Atsisiųsti'
                      svg={<DownloadIcon />}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 'none' }}>
                    Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą
                    JAR-5-E
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none', borderRight: 'none' }}>
                    Pasirašytas
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none' }}>
                    <DownloadIconLabel
                      style={{ justifyContent: 'flex-end' }}
                      label='Atsisiųsti'
                      svg={<DownloadIcon />}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 'none' }}>
                    Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą
                    JAR-5-E
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none', borderRight: 'none' }}>
                    Pasirašytas
                  </TableCell>
                  <TableCell sx={{ borderLeft: 'none' }}>
                    <DownloadIconLabel
                      style={{ justifyContent: 'flex-end' }}
                      label='Atsisiųsti'
                      svg={<DownloadIcon />}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <HeaderMain>Paslaugos Kaina</HeaderMain>
          <Divider />
          <TableContainer sx={{ pb: '48px' }}>
            <Table>
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
                  <TableCell sx={{ borderRight: 'none' }}>
                    Prašymas laikinai įrašyti pavadinimą į Juridinių asmenų registrą
                    JAR-5-E
                  </TableCell>
                  <TableCell align='right' sx={{ borderLeft: 'none' }}>
                    14,76 Eur
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ borderRight: 'none' }}>
                    <Typography
                      variant='body1'
                      sx={{ textAlign: 'right', fontWeight: 'bold' }}
                    >
                      Bendra Suma
                    </Typography>
                  </TableCell>
                  <TableCell align='right' sx={{ borderLeft: 'none' }}>
                    14,76 Eur
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionWrapper>

        <ServiceFormActions
          onDiscard={handleOpenModal}
          onBack={() => navigate('/self-service-dashboard')}
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceDashboard()}
        />
      </ServiceFormAccordion>
      {/* closing modal */}
      {openModal && <DeleteItemModal open={true} onClose={handleCloseModal} />}
    </RcSesServicePage>
  );
}

export default OwnedProperties;
