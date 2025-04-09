import { FormEvent, useState } from 'react';
import { fetchAirport } from '../services/airportService';
import { Button, TextField, Table, TableContainer, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Runway, RunwayData } from './Runway';
import { mToFt, parseCoordinate } from '../utils/convert';
import { Metar } from './Metar';

interface AirportData {
    [key: string]: any;
}

export default function Airport() {
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };
    const [icao, setIcao] = useState('');
    const [airportData, setAirportData] = useState<AirportData | null>(null);
    const [runways, setRunways] = useState([]);
    const [offset, setOffset] = useState(0);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = await fetchAirport(icao) as AirportData;
        setAirportData(data);
        setRunways(data.runways)
        setOffset(parseCoordinate(data.magdec));
        console.log("Offset: " + offset)
    };

    return (
        <div style={{ margin: '20px' }}>
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td colSpan={2} style={{ textAlign: 'center', paddingBottom: '30px' }}>
                            <TextField
                                value={icao}
                                onChange={(e) => setIcao(e.target.value.toUpperCase())}
                                onFocus={handleFocus}
                                placeholder="Enter ICAO code"
                                variant="outlined"
                                size="small"
                                style={{ marginRight: '8px' }}
                            />
                            <Button variant="contained" type='submit'>Get Airport</Button>
                        </td>
                    </tr>
                    {airportData && (
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '0', margin: '0' }}>
                                <Metar metarData={airportData.metar} />
                            </td>
                            <td style={{ verticalAlign: 'top', borderLeft: "1px solid rgb(200, 200, 200)" }}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width={160} align='right'><Typography>Name:</Typography></TableCell>
                                                <TableCell>{airportData.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'>ICAO:</TableCell>
                                                <TableCell>{airportData.icaoId}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'>Location: </TableCell>
                                                <TableCell>{airportData.state}, {airportData.country}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'>Elevation (ft):</TableCell>
                                                <TableCell>{mToFt(airportData.elev)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right' valign='top'>
                                                    <Typography>
                                                        Runways:
                                                    </Typography>
                                                </TableCell>
                                                <TableCell style={{ paddingTop: '3px' }}>
                                                    <Table>
                                                        <TableBody>
                                                            {runways && runways.map((runway: RunwayData) => (
                                                                <Runway
                                                                    key={runway.id}
                                                                    id={runway.id}
                                                                    alignment={Number(runway.alignment) + offset}
                                                                    dimension={runway.dimension}
                                                                />
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'>Frequencies:</TableCell>
                                                <TableCell>
                                                    {airportData.freqs.split(';').map((freq: string, index: number) => (
                                                        <div>{freq}</div>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </td>
                        </tr>
                    )}
                </table>
            </form>
        </div>
    );
}