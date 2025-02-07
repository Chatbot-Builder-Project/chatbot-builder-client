import homePageImage from "@chatbot-builder/client/public/assets/images/FlowImage.png";
import {
  HomePageImage,
  HomeContainer,
  HomeText,
  SubText,
  TextContainer,
  ButtonGroup,
  StyledButton,
} from "./Home.styles";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <TextContainer>
        <HomeText>The web builder for stunning Chatbots.</HomeText>
        <SubText>
          Create, customize, and deploy your chatbot with our intuitive
          drag-and-drop interface.
        </SubText>
        <ButtonGroup>
          <StyledButton primary>Get Started</StyledButton>
          <StyledButton>Learn More</StyledButton>
        </ButtonGroup>
      </TextContainer>
      <HomePageImage>
        <img src={homePageImage} alt="home-page-image" loading="lazy" />
      </HomePageImage>
    </HomeContainer>
  );
};

export default Home;
