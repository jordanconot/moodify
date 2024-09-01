import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomSkeleton = styled(Skeleton)(() => ({
  backgroundColor: "rgb(55, 194, 94)",
  "&::after": {
    background: `linear-gradient(90deg, transparent, rgb(55, 194, 94, 0.3), transparent)`,
  },
}));