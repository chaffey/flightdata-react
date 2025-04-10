import { Table, TableContainer, TableRow, TableCell, Typography } from '@mui/material';

export interface CloudData {
    [key: string]: any;
}

export function Clouds({clouds}: CloudData) {
    return (
        <div style={{ margin: '0px'}}>

            {clouds && (
                <TableContainer>
                    <Table>
                        {clouds.slice().reverse().map((cloud: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{cloud.cover} {cloud.base}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </TableContainer>
            )}                    
        </div>
    );
}