import { useMemo } from "react";
import { Sponsor } from "../../../domain/legislation";

interface SponsorsViewProps {
  sponsors: Sponsor[];
}

const styleTruncate = {
  width: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const SponsorsView = ({ sponsors }: SponsorsViewProps) => {
  const sponsorsStringList = useMemo(() => {
    const stringArray: string[] = [];

    sponsors.forEach((sponsor) => {
      const item = sponsor.sponsor;
      if (item.as.showAs) {
        stringArray.push(item.as.showAs);
      }
      if (item.by.showAs) {
        stringArray.push(item.by.showAs);
      }
    });

    return stringArray;
  }, [sponsors]);

  const sponsorsJoined = sponsorsStringList.join(" | ");
  return (
    <div style={styleTruncate} title={sponsorsJoined}>
      {sponsorsJoined}
    </div>
  );
};
