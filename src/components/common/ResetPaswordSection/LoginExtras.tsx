import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import nafathLogo from '../../../assets/images/nafath-logo.png';



const NafathContainer = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const NafathLogo = styled.img`
  width: 77px;
  height: 30px;
  margin-bottom: 8px;
`;


const EnglishHeading = styled.h4`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
  color: #0C3957;;
  font-weight: bold;
  line-height: 1.4;
  font-weight: 800;
`;

const LoginExtras = () => {
  const navigate = useNavigate();

  return (
    <>
      <NafathContainer>
        <NafathLogo src={nafathLogo} alt="Nafath Logo" />
        <EnglishHeading>
          For Citizens/ Resident Individuals, Login through Nafath
        </EnglishHeading>
      </NafathContainer>
    </>
  );
};

export default LoginExtras;
