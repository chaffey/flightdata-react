import { Typography } from "@mui/material";

export function TempLabel({cel}: {cel: number}) {
    return (
        <Typography>
            {cel}ºC ({Math.round((cel * 9) / 5 + 32)}ºF)
        </Typography>
    );
}
    