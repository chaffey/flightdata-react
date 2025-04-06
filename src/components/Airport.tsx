import { FormEvent, useState } from 'react';
import { fetchAirport } from '../services/airportService';
import { Button, TextField, Table, TableContainer, TableRow, TableCell, TableBody } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AirportData {
    [key: string]: any;
}

function mToFt(m: number) {
    return (m * 3.2808398950131).toFixed(0);
}

function parseCoordinate(coord: string): number {
    const match = coord.match(/^(\d+)([EW])$/i);

    if (!match) {
        throw new Error(`Invalid coordinate format: ${coord}`);
    }

    const [, numStr, direction] = match;
    const value = parseInt(numStr, 10);

    if (direction.toUpperCase() === "E") {
        return -value;
    } else if (direction.toUpperCase() === "W") {
        return value;
    } else {
        throw new Error(`Unsupported direction: ${direction}`);
    }
}

export default function Airport() {
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
        <div>
            <form onSubmit={handleSubmit}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1a-content"
                        id="panel1-header">
                        <TextField
                            value={icao}
                            onChange={(e) => setIcao(e.target.value.toUpperCase())}
                            placeholder="Enter ICAO code"
                            variant="outlined"
                            size="small"
                            style={{ marginRight: '8px' }}
                        />
                        <Button variant="contained" type='submit'>Get Airport</Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        {airportData && (
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell width={160} align='right'>Name:</TableCell>
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
                                            <TableCell valign='top' align='right'>Runways:</TableCell>
                                            <TableCell>
                                                <Table>
                                                    <TableBody>
                                                        {runways.map((runway: any, index: number) => (
                                                            <TableRow>
                                                                <TableCell width={100} align='left'><strong>{runway.id}</strong></TableCell>
                                                                <TableCell width={100} align='left'>{String(Number(runway.alignment) + offset).padStart(3, '0')}º <br /> {String(Number(runway.alignment) + offset + 180).padStart(3, '0')}º</TableCell>
                                                                <TableCell align='left'>{runway.dimension}</TableCell>
                                                            </TableRow>
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
                        )}
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
}