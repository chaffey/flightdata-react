import { Table, TableContainer, TableRow, TableCell, Typography } from '@mui/material';
import { hPaToInHg } from '../utils/convert'
import { Clouds } from './Clouds';
import { TempLabel } from './TempLabel';
import { CompassDial } from './CompassDial';

export interface MetarData {
    metarData: any;
    [key: string]: any;
}

export function Metar({ metarData }: MetarData) {
    return (
        <div style={{ margin: '0px' }}>

            {metarData && (
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell align='right'><Typography>Name:</Typography></TableCell>
                            <TableCell><Typography>{metarData.name}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Report Time (UTC):</Typography></TableCell>
                            <TableCell>{metarData.reportTime}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>ICAO:</Typography></TableCell>
                            <TableCell>{metarData.icaoId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Altimeter:</Typography></TableCell>
                            <TableCell><Typography color={'secondary'}>{hPaToInHg(metarData.altim)} inHg / {Math.round(metarData.altim)} hPa</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right' style={{ verticalAlign: 'middle' }}><Typography>Wind:</Typography></TableCell>
                            <TableCell>
                                <CompassDial speed={metarData.wspd} heading={metarData.wdir} size={250}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Temperature:</Typography></TableCell>
                            <TableCell><TempLabel cel={metarData.temp} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Dew Point:</Typography></TableCell>
                            <TableCell><TempLabel cel={metarData.dewp} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Visibility:</Typography></TableCell>
                            <TableCell>{metarData.visib}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Clouds:</Typography></TableCell>
                            <TableCell>
                                <Clouds clouds={metarData.clouds} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'><Typography>Raw:</Typography></TableCell>
                            <TableCell width={300}>{metarData.rawOb}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}