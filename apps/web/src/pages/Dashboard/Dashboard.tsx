import { useFetchWorkflowsQuery } from "@chatbot-builder/store/API/workflows/workflows";
import { DashboardContainer } from "./Dashboard.styles";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading } = useFetchWorkflowsQuery({});
  const navigate = useNavigate();
  if (isLoading || !data) return <div>Loading...</div>;

  const handleCardClick = (id: string) => {
    navigate(`/builder/flow/${id}`);
  };

  return (
    <DashboardContainer>
      {data.page.items.map((chatbot) => (
        <Card key={chatbot.id} chatbot={chatbot} onClick={handleCardClick} />
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
