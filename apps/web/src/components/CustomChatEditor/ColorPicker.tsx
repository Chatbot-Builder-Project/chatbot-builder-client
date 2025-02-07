import { Box, Popover } from "@mui/material";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          cursor: "pointer",
          width: "100%",
          height: "28px",
          borderRadius: 1,
          border: "1px solid #ffffff20",
          backgroundColor: value || "#fff",
          transition: "all 0.2s ease",
          "&:hover": {
            borderColor: "#ffffff40",
          },
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            p: 1,
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        <HexColorPicker color={value} onChange={onChange} />
      </Popover>
    </>
  );
};
