import { AppLogoContainer, AppTitle } from "./component.styles";
import appLogo from "@chatbot-builder/client/public/assets/icons/appLogo.svg";

const AppLogo = () => {
  return (
    <AppTitle to="/">
      <AppLogoContainer src={appLogo} alt="app-logo" />
      FlowX
    </AppTitle>
  );
};

export default AppLogo;
