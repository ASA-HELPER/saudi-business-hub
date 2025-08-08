import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: inherit;
`;

export const LeftSection = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 50px 80px;
  background: url("/assets/images/background-image.jpeg");
  background-size: cover;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      189.27deg,
      rgba(18, 123, 126, 0.8) 11.82%,
      rgba(23, 116, 125, 0.8) 22.03%,
      rgba(63, 54, 121, 0.8) 39.14%,
      rgba(18, 123, 126, 0.8) 98.44%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

export const RightSection = styled.div`
  width: 45%;
  display: flex;
  background: rgba(15, 30, 35, 0.5);
  border-radius: 8px;
`;

export const LanguageSwitch = styled.div<{ variant?: "light" | "dark" }>`
  display: flex;
  background: ${({ variant }) =>
    variant === "light" ? "#E6F2F4" : "rgba(15, 30, 35, 0.5)"};
  border-radius: 6px;
  padding: 10px;
  width: fit-content;
  margin-bottom: 40px;
  z-index: 1;
`;

export const LanguageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active" && prop !== "variant",
})<{
  active?: boolean;
  variant?: "dark" | "light";
}>`
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: ${({ active, variant }) =>
    active
      ? variant === "light"
        ? "#00778E"
        : "rgba(255, 255, 255, 0.1)"
      : "transparent"};
  color: ${({ active, variant }) =>
    active ? "#fff" : variant === "light" ? "#00778E" : "#ffffff"};
  font-weight: ${({ active }) => (active ? 500 : 300)};
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === "light" ? "#c2e6ea" : "rgba(255, 255, 255, 0.44)"};
  }
`;

export const InvestmentInfo = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h1`
  font-family: "'IBM Plex Sans Arabic', sans-serif";
  font-size: 34px;
  font-weight: 600;
  color: #fff;
  opacity: 0.8;
  margin-bottom: 40px;
`;

export const SubTitle = styled.h2`
  font-family: "'IBM Plex Sans Arabic', sans-serif";
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  opacity: 0.8;
  margin-bottom: 40px;
`;

export const InfoBox = styled.div`
  background: rgba(15, 30, 35, 0.5);
  border-radius: 10px;
  padding: 30px 60px;

  ul {
    padding-left: 5px;
    margin: 0;
    list-style-position: inside;
  }
  li {
    margin-bottom: 30px;
    a {
      display: inline-block;
      margin-left: 20px;
      margin-top: 20px;
      color: #fff;
    }
  }
`;

export const BottomLeftSVGWrapper = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: 999;

  img {
    width: 90%;
    height: auto;
  }
`;
