import React from "react";
import styled from "styled-components";

const newsData = [
  {
    title: "Saudi Arabia Launches Bold Urban Ex...",
    description:
      "A major milestone in the Kingdom’s development strategy, the Abdullah 10-10 project marks a new chapter in Albuhairat’s tra...",
    image: "https://picsum.photos/id/1011/600/400",
    date: "12 Oct, 2025",
  },
  {
    title: "Alhamadania Land Project Set to Red...",
    description:
      "The Alhamadania development project is a forward-looking initiative focused on smart infrastructure, eco-friendly planning, and sust...",
    image: "https://picsum.photos/id/1015/600/400",
    date: "12 Oct, 2025",
  },
  {
    title: "South Murcia to Become Saudi’s Next...",
    description:
      "With the launch of the South Murcia Land Development Project, authorities aim to unlock new economic potential through mixed-use zo...",
    image: "https://picsum.photos/id/1016/600/400",
    date: "12 Oct, 2025",
  },
];

const Section = styled.section`
  background: #f6f1fb;
  padding: 1rem 2rem;
`;

const ExploreButton = styled.button`
  background: #a655e1;
  color: white;
  font-weight: 600;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const NewsGrid = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  margin-left: 40px;
`;

const NewsCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  min-width: 300px;
  max-width: 380px;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DateBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: #555;
  color: white;
  font-size: 0.875rem;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
`;

const NewsContent = styled.div`
  padding: 1rem;
`;

const NewsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const NewsDesc = styled.p`
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled.button`
  background: #00566b;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

const NewsSection = () => {
  return (
    <Section>
      <SectionHeader>
        <div>
          <SectionTitle>NEWS</SectionTitle>
          <SectionSubtitle>
            Breaking Stories, Insights, and Announcements
          </SectionSubtitle>
        </div>
        <ExploreButton>Explore All →</ExploreButton>
      </SectionHeader>

      <NewsGrid>
        {newsData.map((item, index) => (
          <NewsCard key={index}>
            <ImageWrapper>
              <NewsImage src={item.image} alt={item.title} />
              <DateBadge>{item.date}</DateBadge>
            </ImageWrapper>
            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDesc>{item.description}</NewsDesc>
              <ReadMoreButton>Know More →</ReadMoreButton>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
    </Section>
  );
};

export default NewsSection;
