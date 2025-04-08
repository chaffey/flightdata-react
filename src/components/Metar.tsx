import { Table, TableContainer, TableRow, TableCell, Typography } from '@mui/material';
import { hPaToInHg } from  '../utils/convert'
import { Clouds } from './Clouds';

export interface MetarData {
    metarData: any;
    [key: string]: any;
}

export function Metar({metarData}: MetarData) {
    return (
        <div style={{ margin: '0px'}}>

            {metarData && (
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell align='right'>Name:</TableCell>
                            <TableCell><Typography>{metarData.name}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell width={160} align='right'>Report Time (UTC):</TableCell>
                            <TableCell>{metarData.reportTime}</TableCell>                            
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>ICAO:</TableCell>
                            <TableCell>{metarData.icaoId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Altimeter:</TableCell>
                            <TableCell><Typography color={'secondary'}>{hPaToInHg(metarData.altim)} inHg / {Math.round(metarData.altim)} hPa</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Wind: </TableCell>
                            <TableCell><Typography color={'secondary'}>{metarData.wspd} at {String(metarData.wdir).padStart(3, '0')}º</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Temperature:</TableCell>
                            <TableCell><Typography color={'secondary'}>{Math.round(metarData.temp)}ºc</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Dew Point:</TableCell>
                            <TableCell>{Math.round(metarData.dewp)}ºc</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Visibility:</TableCell>
                            <TableCell>{metarData.visib}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Clouds:</TableCell>
                            <TableCell>
                                <Clouds clouds={metarData.clouds} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Raw:</TableCell>
                            <TableCell width={300}>{metarData.rawOb}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            )}                    
        </div>
    );
}