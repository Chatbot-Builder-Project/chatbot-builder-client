import { Modal, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { theme } from "@chatbot-builder/client/theme/palette";

const ModalContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.colors.secondaryBackground,
  borderRadius: 8,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

interface CreateWorkflowModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export const CreateWorkflowModal = ({
  open,
  onClose,
  onSubmit,
}: CreateWorkflowModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(name, description);
    setName("");
    setDescription("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <TextField
          label="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              color: theme.colors.lightText,
              '& fieldset': {
                borderColor: theme.colors.lightGray,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.colors.lightGray,
            },
          }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              color: theme.colors.lightText,
              '& fieldset': {
                borderColor: theme.colors.lightGray,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.colors.lightGray,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!name.trim()}
          sx={{ 
            mt: 2,
            bgcolor: theme.colors.primary,
            '&:hover': {
              bgcolor: theme.colors.muted,
            },
            '&:disabled': {
              bgcolor: theme.colors.lightGray,
            }
          }}
        >
          Create
        </Button>
      </ModalContent>
    </Modal>
  );
};
