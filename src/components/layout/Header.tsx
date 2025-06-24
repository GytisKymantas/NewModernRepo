import React from 'react';
import RegistruCentras from '../../assets/images/logo.png';
import TopBanner from './components/TopBanner';
import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  background-color: white;
`;

const Logo = styled.img``;

const ReturnLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #0079ad;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>

      <LogoSection>
        <Logo src={RegistruCentras} alt="Registrų centras" />

        <ReturnLink>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3537 12.6462C10.4001 12.6927 10.437 12.7478 10.4621 12.8085C10.4872 12.8692 10.5002 12.9343 10.5002 13C10.5002 13.0657 10.4872 13.1307 10.4621 13.1914C10.437 13.2521 10.4001 13.3073 10.3537 13.3537C10.3072 13.4002 10.252 13.437 10.1914 13.4622C10.1307 13.4873 10.0656 13.5003 9.99991 13.5003C9.93421 13.5003 9.86915 13.4873 9.80846 13.4622C9.74776 13.437 9.69261 13.4002 9.64615 13.3537L4.64615 8.35372C4.59967 8.30729 4.56279 8.25214 4.53763 8.19144C4.51246 8.13074 4.49951 8.06568 4.49951 7.99997C4.49951 7.93427 4.51246 7.8692 4.53763 7.8085C4.56279 7.7478 4.59967 7.69266 4.64615 7.64622L9.64615 2.64622C9.73997 2.5524 9.86722 2.49969 9.99991 2.49969C10.1326 2.49969 10.2598 2.5524 10.3537 2.64622C10.4475 2.74004 10.5002 2.86729 10.5002 2.99997C10.5002 3.13265 10.4475 3.2599 10.3537 3.35372L5.70678 7.99997L10.3537 12.6462Z"
              fill="#0079AD"
            />
          </svg>
          Grįžti į savitarną
        </ReturnLink>
      </LogoSection>
    </HeaderWrapper>
  );
};

export default Header;
