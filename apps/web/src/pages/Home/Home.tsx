import { useUser } from "@chatbot-builder/store/slices/User";
import { HomeText } from "./Home.styles";

const Home: React.FC = () => {
  const { logout } = useUser();
  return (
    <HomeText>
      Home
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </HomeText>
  );
};

export default Home;
