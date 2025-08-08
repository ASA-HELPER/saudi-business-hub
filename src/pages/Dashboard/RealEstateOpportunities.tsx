import React from "react";
import styled from "styled-components";

// Dummy images (replace with your actual paths or use Unsplash/placeholders)
const cardData = [
  {
    title: "Albuhairat Land Development Project",
    description:
      "A transformative urban development project shaping sustainable living and investment in Albuhairat.",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    title: "Alhamadania Land Development Project",
    description:
      "A visionary land development project redefining modern living and growth in Alhamadania.",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    title: "South Murcia Land Development Project",
    description:
      "Pioneering sustainable growth and modern infrastructure in the heart of South Murcia.",
    image: "https://picsum.photos/id/237/200/300",
  },
  {
    title: "South Murcia Land Development Project",
    description:
      "Pioneering sustainable growth and modern infrastructure in the heart of South Murcia.",
    image: "https://picsum.photos/id/237/200/300",
  },
];

const SectionWrapper = styled.section`
  padding: 3rem 2rem;
  background: #fff;
`;

const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #555555;
  font-weight: 600;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 64px;
  margin-bottom: 28px;
  position: relative;
  padding-left: 24px;
  margin-left: 40px;
  margin-right: 40px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
    border-radius: 2px;
  }
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;

  span {
    border-left: 5px solid #6a1b9a;
    padding-left: 0.75rem;
  }
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #555;
  margin-top: 0.5rem;
`;

const ExploreButton = styled.button`
  background: #007d8a;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  flex-wrap: nowrap;
  margin-left: 40px;

  /* Optional scroll styling */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const Card = styled.div`
  background: #f1f8fa;
  border: 1px solid #d4e2e8;
  border-radius: 12px;
  min-width: 300px; /* Force horizontal size */
  max-width: 340px;
  flex: 0 0 auto; /* Prevent shrinking and line wrapping */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 180px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  font-size: 0.95rem;
  color: #333;
  flex-grow: 1;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const OutlineButton = styled.button`
  flex: 1;
  background: transparent;
  border: 2px solid #007d8a;
  color: #007d8a;
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

const FilledButton = styled.button`
  flex: 1;
  background: #007d8a;
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const RealEstateOpportunities = () => {
  return (
    <SectionWrapper>
      <SectionHeader>
        <div>
          <SectionTitle>APPLY FOR</SectionTitle>
          <SectionSubtitle>
            Discover key insights, trends, and opportunities within the sector.
          </SectionSubtitle>
        </div>
        <ExploreButton>Explore All →</ExploreButton>
      </SectionHeader>

      <CardsContainer>
        {cardData.map((item, index) => (
          <Card key={index}>
            <CardImage src={item.image} alt={item.title} />
            <CardTitle>{item.title}</CardTitle>
            <CardDesc>{item.description}</CardDesc>
            <CardActions>
              <OutlineButton>Know More</OutlineButton>
              <FilledButton>I am Interested</FilledButton>
            </CardActions>
          </Card>
        ))}
      </CardsContainer>
    </SectionWrapper>
  );
};

export default RealEstateOpportunities;
