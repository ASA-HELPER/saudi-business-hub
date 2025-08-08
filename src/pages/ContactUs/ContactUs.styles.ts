import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  padding: 5rem 7.5rem;
  background-color: white;
  width: 100%;

  @media (max-width: 1024px) {
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;
  }
`;