import React from "react";
import Xarrow, { Xwrapper } from "react-xarrows";

interface ArrowWrapperProps {
  children: React.ReactNode;
  connections?: Array<{
    start: string;
    end: string;
  }>;
}

function ArrowWrapper({ children, connections = [] }: ArrowWrapperProps) {
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
          path="smooth"
        />
      ))}
    </Xwrapper>
  );
}

export default ArrowWrapper;
