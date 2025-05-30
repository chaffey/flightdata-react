import { Table, TableContainer, TableRow, TableCell, Typography } from '@mui/material';

export function Clouds({clouds}: {clouds: {cover: string, base: number}[]}) {
    return (
        <div style={{margin: '0px'}}>

            {clouds && (
                <TableContainer>
                    <Table>
                        {clouds.slice().reverse().map((cloud: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell><Typography>{cloud.cover} {cloud.base}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </TableContainer>
            )}                    
        </div>
    );
}