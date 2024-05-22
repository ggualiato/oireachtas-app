import { Sponsor } from "../../domain/legislation";

interface SponsorsViewProps {
  sponsors: Sponsor[];
}

export const SponsorsView = ({ sponsors }: SponsorsViewProps) => {
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

  const final = stringArray.join(" | ");
  return (
    <div
      style={{
        width: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={final}
    >
      {final}
    </div>
  );
};
