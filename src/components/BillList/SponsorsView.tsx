import { Sponsor } from "../../domain/legislation";

interface SponsorsViewProps {
  sponsors: Sponsor[];
}

export const SponsorsView = ({ sponsors }: SponsorsViewProps) => {
  console.log(sponsors);
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

  return <>{stringArray.join("|")}</>;
};
