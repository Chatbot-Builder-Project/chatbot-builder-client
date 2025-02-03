import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { CanvasConfigContainerBar } from "../../../components/Builder/CanvasConfigBar/CanvasConfigBar.styles";
import {
  DashboardBarContent,
  SearchBarContainer,
  SearchInput,
  SearchContentWrapper,
  SearchLabel,
  NewButton,
} from "./DashboardBar.styles";
import AppLogo from "../../../components/AppLogo";

const DashboardBar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsSearchActive(false);
    }
  };

  return (
    <CanvasConfigContainerBar>
      <DashboardBarContent>
        <AppLogo />
        <SearchBarContainer>
          {!searchText && (
            <SearchContentWrapper $isActive={isSearchActive}>
              <IconSearch size={20} stroke={1.5} color={"#666"} />
              <SearchLabel>Search</SearchLabel>
            </SearchContentWrapper>
          )}
          <SearchInput
            $isActive={isSearchActive}
            onClick={handleSearchClick}
            onBlur={handleSearchBlur}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </SearchBarContainer>
        <NewButton>New</NewButton>
      </DashboardBarContent>
    </CanvasConfigContainerBar>
  );
};

export default DashboardBar;
