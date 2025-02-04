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
import { useNavigate } from "react-router-dom";
import { useCreateWorkflowMutation } from "@chatbot-builder/store/API/builder/builder";
import { CreateWorkflowModal } from "../../../components/CreateWorkflowModal/CreateWorkflowModal";

const DashboardBar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createWorkflow] = useCreateWorkflowMutation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsSearchActive(false);
    }
  };

  const handleCreateWorkflow = async (name: string, description: string) => {
    try {
      const response = await createWorkflow({
        name: name,
        description: description,
        visual: {
          data: {},
        },
        graph: {
          visual: {
            data: {},
          },
          startNodeId: 1,
          nodes: [
            {
              type: "Interaction",
              info: {
                id: 1,
                name: "First Stage Node",
              },
              visual: {
                data: {
                  x: 4896.250564370485,
                  y: 4964.17261523236,
                  width: 231,
                  height: 63,
                },
              },
              textInputPort: {
                info: {
                  id: 2,
                  name: "Input",
                },
                nodeId: 1,
                dataType: "Text",
                visual: {
                  data: {},
                },
              },
              imageInputPorts: [],
              textOutputPort: {
                info: {
                  id: 3,
                  name: "Port_4",
                },
                visual: {
                  data: {},
                },
                nodeId: 1,
                dataType: "text",
              },
              outputEnumId: null,
              optionOutputPort: null,
              outputOptionMetas: null,
            },
            {
              type: "Static",
              info: {
                id: 5,
                name: "Default Message",
              },
              visual: {
                data: {
                  x: 4887.048302051083,
                  y: 4852.339107800809,
                  width: 224,
                  height: 63,
                },
              },
              data: {
                type: "text",
                text: "Hello world!",
              },
              outputPort: {
                info: {
                  id: 6,
                  name: "Port_7",
                },
                visual: {
                  data: {},
                },
                nodeId: 5,
                dataType: "text",
              },
            },
            {
              type: "Prompt",
              info: {
                id: 11,
                name: "Example Prompt",
              },
              visual: {
                data: {
                  x: 5223.924823835784,
                  y: 4961.816242481778,
                  width: 224,
                  height: 63,
                },
              },
              template: "Your input is: {{1}}",
              outputPort: {
                info: {
                  id: 12,
                  name: "Output",
                },
                nodeId: 11,
                dataType: "Text",
                visual: {
                  data: {},
                },
              },
              inputPorts: [
                {
                  info: {
                    id: 1,
                    name: "Input_1",
                  },
                  nodeId: 11,
                  dataType: "text",
                  visual: {
                    data: {},
                  },
                },
              ],
            },
          ],
          dataLinks: [
            {
              info: {
                id: 7,
                name: "DataLink_7",
              },
              sourcePortId: 6,
              targetPortId: 2,
              visual: {
                data: {},
              },
            },
            {
              info: {
                id: 15,
                name: "DataLink_15",
              },
              sourcePortId: 3,
              targetPortId: 1,
              visual: {
                data: {},
              },
            },
            {
              info: {
                id: 16,
                name: "DataLink_16",
              },
              sourcePortId: 12,
              targetPortId: 2,
              visual: {
                data: {},
              },
            },
          ],
          flowLinks: [
            {
              info: {
                id: 13,
                name: "FlowLink_13",
              },
              sourceNodeId: 1,
              targetNodeId: 11,
              visual: {
                data: {
                  points: [
                    {
                      id: "start-point",
                      position: {
                        x: 5127.250564370485,
                        y: 4995.67261523236,
                      },
                    },
                    {
                      id: "end-point",
                      position: {
                        x: 5223.924823835784,
                        y: 4993.316242481778,
                      },
                    },
                  ],
                },
              },
            },
            {
              info: {
                id: 14,
                name: "FlowLink_14",
              },
              sourceNodeId: 11,
              targetNodeId: 1,
              visual: {
                data: {
                  points: [
                    {
                      id: "start-point",
                      position: {
                        x: 5447.924823835784,
                        y: 4993.316242481778,
                      },
                    },
                    {
                      id: "point-1738708641252",
                      position: {
                        x: 5464.447682856027,
                        y: 5064.258618743543,
                      },
                    },
                    {
                      id: "point-1738708628898",
                      position: {
                        x: 5228.121573464936,
                        y: 5084.898453624867,
                      },
                    },
                    {
                      id: "point-1738708633148",
                      position: {
                        x: 4928.843967685752,
                        y: 5091.090404089251,
                      },
                    },
                    {
                      id: "point-1738708636889",
                      position: {
                        x: 4846.284628160472,
                        y: 5033.298866421562,
                      },
                    },
                    {
                      id: "end-point",
                      position: {
                        x: 4896.250564370485,
                        y: 4995.67261523236,
                      },
                    },
                  ],
                },
              },
            },
          ],
          enums: [],
        },
      }).unwrap();

      setIsModalOpen(false);
      navigate(`/builder/flow/${response.id}`);
    } catch (error) {
      console.error("Failed to create workflow:", error);
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
        <NewButton onClick={() => setIsModalOpen(true)}>New</NewButton>
      </DashboardBarContent>
      <CreateWorkflowModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateWorkflow}
      />
    </CanvasConfigContainerBar>
  );
};

export default DashboardBar;
