import { IconButton, SxProps, Theme } from "@mui/material";
import * as TablerIcons from "@tabler/icons-react";

interface SendButtonProps {
  styles: SxProps<Theme> & { icon?: string };
}

const SendButton: React.FC<SendButtonProps> = ({ styles }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { icon, ...buttonStyles } = styles as any;
  let IconComponent = TablerIcons.IconSend;

  if (icon && typeof icon === 'string') {
    const selectedIcon = TablerIcons[icon as keyof typeof TablerIcons];
    if (selectedIcon) {
      IconComponent = selectedIcon as typeof TablerIcons.IconSend;
    }
  }

  return (
    <IconButton
      sx={buttonStyles}
      disabled
    >
      <IconComponent size={20} />
    </IconButton>
  );
};

export default SendButton;
