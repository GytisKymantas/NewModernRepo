import { Box } from '@mui/material';
import ServiceCopy from '../components/Service copy';
import Header from '../components/layout/Header';
import TopBanner from '../components/layout/components/TopBanner';

function Home() {
  return (
    <Box>
      {/* placeholders that are commented, should receive from RC <TopBanner />
      <Header /> */}
      <ServiceCopy />
    </Box>
  );
}

export default Home;
