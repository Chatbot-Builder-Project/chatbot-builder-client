import {
  DashboardContainer,
  StatisticsSection,
  MainContent,
  SearchSection,
  ListSection,
} from "./Dashboard.styles";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <StatisticsSection>
        <h2>Statistics</h2>
        <div>Total Chats: 150</div>
        <div>Active Bots: 3</div>
        <div>Messages Today: 247</div>
      </StatisticsSection>

      <MainContent>
        <SearchSection>
          <input type="text" placeholder="Search chatbots..." />
        </SearchSection>

        <h2>Your Chatbots</h2>
        <ListSection>
          <div className="item">Chatbot 1</div>
          <div className="item">Chatbot 2</div>
          <div className="item">Chatbot 3</div>
          <div className="item">Chatbot 3</div>
          <div className="item">Chatbot 3</div>
          <div className="item">Chatbot 3</div>
        </ListSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
