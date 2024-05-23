import { Typography } from "@mui/material";

interface BillModalContentProps {
  shortTitle: string;
  longTitle: string;
}

export const BillModalContent = ({
  shortTitle,
  longTitle,
}: BillModalContentProps) => {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {shortTitle}
      </Typography>
      <div style={{ height: "300px", overflow: "auto" }}>
        <Typography>
          <span dangerouslySetInnerHTML={{ __html: longTitle }}></span>
        </Typography>
      </div>
    </>
  );
};
