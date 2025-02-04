import { useFetchWorkflowsQuery } from "@chatbot-builder/store/API/workflows/workflows";
import { useDeleteWorkflowMutation } from "@chatbot-builder/store/API/builder/builder";
import { DashboardContainer } from "./Dashboard.styles";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data, isLoading, refetch } = useFetchWorkflowsQuery({});
  const [deleteWorkflow] = useDeleteWorkflowMutation();
  const navigate = useNavigate();

  if (isLoading || !data) return <div>Loading...</div>;

  const handleCardClick = (id: string) => {
    navigate(`/builder/flow/${id}`);
  };

  const handleDeleteWorkflow = async (id: string) => {
    try {
      await deleteWorkflow(id).unwrap();
      refetch(); // Refetch the workflows list after successful deletion
    } catch (error) {
      console.error("Failed to delete workflow:", error);
      // You can add error handling/notification here
    }
  };

  return (
    <DashboardContainer>
      {data.page.items.map((workflow) => (
        <Card 
          key={workflow.id} 
          workflow={workflow} 
          onClick={handleCardClick}
          onDelete={handleDeleteWorkflow}
        />
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
