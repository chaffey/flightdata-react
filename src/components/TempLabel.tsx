import { Typography } from "@mui/material";

export function TempLabel({cel, color}: {cel: number, color?: string}) {
    return (
        <Typography color={color}>
            {cel}ºC ({Math.round((cel * 9) / 5 + 32)}ºF)
        </Typography>
    );
}
    