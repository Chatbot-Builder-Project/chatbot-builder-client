import {
  DashboardContainer,
  StatisticsSection,
  MainContent,
  SearchSection,
  ListSection,
  SearchButton,
  ChatbotItem,
  ItemContent,
  SettingsButton,
  PopupMenuItem,
  PopupContainer,
  StatItem,
  StatValue,
  StatLabel,
} from "./Dashboard.styles";
import {
  IconSearch,
  IconSettings,
  IconEdit,
  IconTrash,
  IconTools,
  IconMessageCircle2,
  IconRobot,
  IconMessages,
} from "@tabler/icons-react";
import { Popover } from "@mui/material";
import { useState } from "react";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardContainer>
      <StatisticsSection>
        <h2>General Statistics</h2>
        <StatItem>
          <IconMessageCircle2 size={32} color="#009bff" />
          <div>
            <StatValue>150</StatValue>
            <StatLabel>Total Chats</StatLabel>
          </div>
        </StatItem>
        <StatItem>
          <IconRobot size={32} color="#009bff" />
          <div>
            <StatValue>3</StatValue>
            <StatLabel>Active Bots</StatLabel>
          </div>
        </StatItem>
        <StatItem>
          <IconMessages size={32} color="#009bff" />
          <div>
            <StatValue>247</StatValue>
            <StatLabel>Messages Today</StatLabel>
          </div>
        </StatItem>
      </StatisticsSection>

      <MainContent>
        <SearchSection>
          <input type="text" placeholder="Search chatbots..." />
          <SearchButton>
            <IconSearch size={20} />
          </SearchButton>
        </SearchSection>

        <h2>Your Chatbots</h2>
        <ListSection>
          {[1, 2, 3].map((item) => (
            <ChatbotItem key={item}>
              <div className="image">
                {/* Placeholder for chatbot image */}
                <div className="placeholder" />
              </div>
              <ItemContent>
                <h3>Chatbot {item}</h3>
                <p>
                  This is a description for Chatbot {item}. It explains what the
                  chatbot does.
                </p>
                <SettingsButton onClick={handleSettingsClick}>
                  <IconSettings size={20} />
                </SettingsButton>
              </ItemContent>
            </ChatbotItem>
          ))}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              style: {
                backgroundColor: "transparent",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <PopupContainer>
              <PopupMenuItem onClick={handleClose}>
                <IconTools size={20} />
              </PopupMenuItem>
              <PopupMenuItem onClick={handleClose}>
                <IconEdit size={20} />
              </PopupMenuItem>
              <PopupMenuItem onClick={handleClose} className="delete">
                <IconTrash size={20} />
              </PopupMenuItem>
            </PopupContainer>
          </Popover>
        </ListSection>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
