import { TableRow, TableCell } from '@mui/material';

export interface RunwayData {
    id: string;
    alignment: number;
    dimension: string;
}

export function Runway({id, alignment, dimension} : RunwayData) {
    return (
        <TableRow>
            <TableCell width={100} align='left'>{id}</TableCell>
            <TableCell width={100} align='left'>{String(alignment).padStart(3, '0')}º / {String(alignment + 180).padStart(3, '0')}º</TableCell>
            <TableCell align='left'>{dimension}</TableCell>
        </TableRow>
    );
}

