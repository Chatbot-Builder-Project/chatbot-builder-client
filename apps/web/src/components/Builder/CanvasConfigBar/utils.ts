/* eslint-disable @typescript-eslint/no-explicit-any */
export const traverseAndAddVisualData = (obj: any) => {
  if (obj && typeof obj === "object") {
    Object.keys(obj).forEach((key) => {
      if (key.endsWith("Ports") && Array.isArray(obj[key])) {
        obj[key].forEach((port: any) => {
          if (!port?.visual?.data) {
            port.visual = { data: {} };
          }
        });
      } else if (key.endsWith("Port") && !obj[key]?.visual?.data && obj[key]) {
        obj[key].visual = { data: {} };
      }
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any) => traverseAndAddVisualData(item));
      } else if (typeof obj[key] === "object") {
        traverseAndAddVisualData(obj[key]);
      }
    });
  }
};
