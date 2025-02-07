import { useState } from "react";
import { Box, TextField, Popover } from "@mui/material";
import * as TablerIcons from "@tabler/icons-react";

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const IconSelect: React.FC<IconSelectProps> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const icons = Object.entries(TablerIcons)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 100); // Limit to 100 results for performance

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          p: 1,
          border: "1px solid #ffffff20",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: "#2b2b2b",
          "&:hover": {
            backgroundColor: "#363636",
            borderColor: "#ffffff40",
          },
        }}
      >
        {value && TablerIcons[value as keyof typeof TablerIcons]
          ? (() => {
              const IconComponent =
                TablerIcons[value as keyof typeof TablerIcons];
              return <IconComponent size={20} color="#fff" />;
            })()
          : "Select Icon"}
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            p: 2,
            backgroundColor: "#1e1e1e",
            maxWidth: 320,
            maxHeight: 400,
          },
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2b2b2b",
              color: "white",
            },
          }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {icons.map(([name, Icon]) => (
            <Box
              key={name}
              onClick={() => {
                onChange(name);
                handleClose();
              }}
              sx={{
                p: 1,
                cursor: "pointer",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#2b2b2b",
                },
              }}
            >
              <Icon size={20} color="#fff" />
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default IconSelect;
