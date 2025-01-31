import React, { memo } from "react";
import { View } from "react-native";
import { shallowEqual, useSelector } from "react-redux";
import { Svg, Defs, Marker, Polygon } from "react-native-svg";
import {
  selectFlowLinkIds,
  selectPendingFlowLinkSourceId,
} from "@chatbot-builder/store/slices/Builder/Nodes/slice";
import CustomArrow from "./CustomArrow";
import PendingArrow from "./PendingArrow";

const ArrowsLayer =() => {
  const flowLinksIds = useSelector(selectFlowLinkIds, shallowEqual);
  const pendingSourceId = useSelector(selectPendingFlowLinkSourceId);
  console.log("flowLinksIds", flowLinksIds);
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        overflow: "visible",
        backgroundColor: "transparent",
      }}
    >
      <Svg
        style={{
          flex: 1,
          overflow: "visible",
        }}
      >
        <Defs>
          <Marker
            id="arrowhead"
            markerWidth={4}
            markerHeight={4}
            refX={3}
            refY={2}
            orient="auto"
          >
            <Polygon points="0,0 4,2 0,4" fill="#fff" />
          </Marker>
          <Marker
            id="arrowhead-selected"
            markerWidth={4}
            markerHeight={4}
            refX={3}
            refY={2}
            orient="auto"
          >
            <Polygon points="0,0 4,2 0,4" fill="#009bff" />
          </Marker>
        </Defs>
        {flowLinksIds.map((linkId) => (
          <CustomArrow key={linkId} linkId={linkId} />
        ))}
        {/* {pendingSourceId && <PendingArrow sourceId={pendingSourceId} />} */}
      </Svg>
    </View>
  );
};

export default ArrowsLayer;
