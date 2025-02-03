import React, { useState } from "react";
import styled from "styled-components";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import { Popover, IconButton } from "@mui/material";
import { Chatbot } from "@chatbot-builder/store/API/workflows/types";
import { theme } from "@chatbot-builder/client/theme/palette";

const ImgContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }

  &:hover .stop1 {
    stop-color: #8a2be2; /* Change start color on hover */
  }

  &:hover .stop2 {
    stop-color: #ff00ff; /* Change end color on hover */
  }
`;

const StyledSVG = styled.svg`
  width: 120px;
  height: 120px;
  fill: url(#grad1);
`;

const CardContainer = styled.div`
  display: flex;
  width: 250px;
  cursor: pointer;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const CardInfo = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardName = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const MenuButton = styled(IconButton)`
  && {
    color: #808080;
    padding: 4px;
    &:hover {
      color: #fff;
    }
  }
`;

const StyledPopover = styled(Popover)`
  .MuiPaper-root {
    background-color: ${theme.colors.gray};
    border: 1px solid ${theme.colors.nodeBackground};
    border-radius: 8px;
    margin-top: 4px;
  }
`;

const PopoverContainer = styled.div`
  min-width: 150px;
  padding: ${theme.spacing.xs} 0;
`;

const PopoverItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.lightText};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes.small};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.nodeBackground};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

interface CardProps {
  chatbot: Chatbot;
  onClick?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ chatbot, onClick }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <CardContainer onClick={() => onClick?.(chatbot.id)}>
      <ImgContainer>
        <LogoSVG />
      </ImgContainer>
      <CardInfo>
        <CardName>{chatbot.name}</CardName>
        <MenuButton size="small" onClick={handleClick}>
          <IconDots size={20} />
        </MenuButton>
        <StyledPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <PopoverContainer>
            <PopoverItem>
              <IconEdit stroke={1.5} />
              Edit
            </PopoverItem>
            <PopoverItem style={{ color: theme.colors.error }}>
              <IconTrash stroke={1.5} />
              Delete
            </PopoverItem>
          </PopoverContainer>
        </StyledPopover>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;

const LogoSVG: React.FC = () => (
  <>
    <svg width="0" height="0">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            className="stop1"
            offset="0%"
            stopColor="#808080"
            style={{ transition: "stop-color 0.3s ease" }}
          />
          <stop
            className="stop2"
            offset="100%"
            stopColor="#808080"
            style={{ transition: "stop-color 0.3s ease" }}
          />
        </linearGradient>
      </defs>
    </svg>
    <StyledSVG
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
        <path
          d="M1130 4949 c-95 -12 -233 -54 -328 -99 -349 -166 -589 -501 -633
        -884 -7 -61 -9 -552 -7 -1471 l3 -1380 27 -98 c15 -54 43 -134 62 -178 143
        -332 432 -569 796 -655 67 -16 151 -18 805 -21 l730 -4 45 23 c48 25 90 88 90
        138 0 42 -42 113 -80 135 -34 19 -56 20 -770 25 -826 6 -775 2 -945 85 -201
        98 -348 274 -417 495 l-23 75 -3 1153 -2 1152 2080 0 2080 0 0 -453 c0 -450 0
        -453 23 -497 24 -48 88 -90 137 -90 49 0 113 42 138 90 l22 44 0 676 c0 431
        -4 708 -11 765 -62 507 -465 911 -971 975 -101 12 -2751 12 -2848 -1z m316
        -655 c53 -39 69 -71 69 -134 0 -63 -16 -95 -69 -134 -23 -18 -45 -22 -144 -24
        -137 -4 -179 6 -221 53 -52 59 -54 147 -4 206 44 52 73 59 215 57 110 -3 130
        -6 154 -24z"
        />
        <path
          d="M3425 2068 c-182 -34 -340 -197 -374 -382 -15 -81 -15 -1051 0 -1132
        35 -193 195 -350 389 -384 45 -8 233 -10 600 -8 524 4 536 4 594 26 146 55
        243 152 298 298 22 58 22 72 26 594 2 367 0 555 -8 600 -34 194 -191 354 -384
        389 -75 14 -1069 13 -1141 -1z m334 -485 c57 -43 66 -67 69 -181 3 -96 1 -112
        -20 -151 -30 -58 -65 -83 -126 -89 -62 -5 -122 25 -155 78 -19 30 -22 49 -22
        145 0 92 3 116 20 144 50 85 158 110 234 54z m653 11 c66 -33 93 -107 85 -235
        -7 -128 -52 -188 -147 -197 -60 -5 -110 16 -146 63 -26 35 -29 46 -32 140 -5
        117 5 159 47 199 54 52 126 63 193 30z"
        />
      </g>
    </StyledSVG>
  </>
);
