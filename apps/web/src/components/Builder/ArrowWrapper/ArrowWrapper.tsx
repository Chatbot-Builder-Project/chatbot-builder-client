import React, { memo } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

interface ArrowWrapperProps {
  children: React.ReactNode;
}

function ArrowWrapper({ children }: ArrowWrapperProps) {
  const connections: Array<{
    start: string;
    end: string;
  }> = [];
  return (
    <Xwrapper>
      {children}
      {connections.map(({ start, end }) => (
        <Xarrow
          key={`${start}-${end}`}
          start={start}
          end={end}
          strokeWidth={3}
          SVGcanvasProps={{
            color: "red",
          }}
          color="#888"
          path="grid"
        />
      ))}
    </Xwrapper>
  );
}

export default memo(ArrowWrapper);
