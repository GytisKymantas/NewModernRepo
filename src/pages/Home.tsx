import Header from '../components/layout/Header';
import React from 'react';
import ServiceCopy from '../components/Service copy';
import TopBanner from '../components/layout/components/TopBanner';


const Home = () => {
  return (
    <div>
             <TopBanner />
              
              <Header />
        <ServiceCopy />
    </div>
  );
};

export default Home;
    