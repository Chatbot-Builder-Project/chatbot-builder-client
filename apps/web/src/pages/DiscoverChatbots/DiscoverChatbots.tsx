import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  styled,
  CardActionArea,
} from "@mui/material";
import { AccessTime, Person, Public } from "@mui/icons-material";
import { useFetchChatbotsQuery } from "@chatbot-builder/store/API/userInfo";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#1d1d1d",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #373737",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    borderColor: "#009bff",
  },
}));

const StyledTypography = styled(Typography)({
  fontFamily: "Montserrat, sans-serif",
});

const PreviewImage = styled(CardMedia)({
  height: 200,
  backgroundSize: "cover",
  backgroundColor: "#111111",
  borderBottom: "1px solid #373737",
  "&:hover": {
    opacity: 0.9,
  },
});

const StyledCardContent = styled(CardContent)({
  backgroundColor: "#1d1d1d",
  flexGrow: 1,
  padding: "20px",
});

const StyledChip = styled(Chip)({
  "& .MuiChip-label": {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
  },
  "& .MuiChip-icon": {
    color: "inherit",
  },
});

const DiscoverChatbots = () => {
  const { data: chatbots, isLoading, error } = useFetchChatbotsQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Container>
        <Alert severity="error">Error loading chatbots</Alert>
      </Container>
    );

  const handleChatbotClick = (chatbotId: string) => {
    navigate(`/chat/${chatbotId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <StyledTypography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 600,
          mb: 6,
          color: "#fffdf9",
        }}
      >
        Discover Chatbots
      </StyledTypography>

      <Grid container spacing={3}>
        {chatbots?.page?.items?.map((chatbot) => (
          <Grid item xs={12} sm={6} md={4} key={chatbot.id}>
            <StyledCard>
              <CardActionArea onClick={() => handleChatbotClick(chatbot.id)}>
                <PreviewImage
                  image={chatbot.visual?.data?.imageUrl}
                  title={chatbot.name}
                />
                <StyledCardContent>
                  <StyledTypography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: "#fffdf9",
                      fontSize: "1.25rem",
                    }}
                  >
                    {chatbot.name}
                  </StyledTypography>

                  <StyledTypography
                    variant="body2"
                    sx={{
                      mb: 2,
                      minHeight: "40px",
                      color: "#979797",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {chatbot.description}
                  </StyledTypography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      color: "#979797",
                    }}
                  >
                    <AccessTime sx={{ fontSize: 18, mr: 1 }} />
                    <StyledTypography variant="body2">
                      {new Date(chatbot.updatedAt).toLocaleDateString()}
                    </StyledTypography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <StyledChip
                      icon={<Person />}
                      label="AI Assistant"
                      size="small"
                      sx={{
                        backgroundColor: "#009bff",
                        color: "#fffdf9",
                        "&:hover": {
                          backgroundColor: "#632edb",
                        },
                      }}
                    />
                    {chatbot.isPublic && (
                      <StyledChip
                        icon={<Public />}
                        label="Public"
                        size="small"
                        sx={{
                          backgroundColor: "#4CAF50",
                          color: "#fffdf9",
                        }}
                      />
                    )}
                  </Box>
                </StyledCardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DiscoverChatbots;
