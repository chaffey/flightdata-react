import { FormEvent, useState } from 'react';
import { fetchAirportData } from '../services/airportService';
import { Button, TextField, Table, TableContainer, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Runway, RunwayData } from './Runway';
import { hPaToInHg, mToFt, parseCoordinate } from '../utils/convert';
import { TempLabel } from './TempLabel';
import { Clouds } from './Clouds';
import dial from '../assets/compass-dial.png'
import arrow from '../assets/red-arrow.png'
import runway from '../assets/runway.png'

const dialSize = 275;

interface AirportData {
    name: string;
    icaoId: string;
    state: string;
    country: string;
    elev: number;
    magdec: number;
    freqs: string;
    metar: {
        reportTime: string;
        temp: number;
        dewp: number;
        wdir: number;
        wspd: number;
        visib: string;
        altim: number;
        rawOb: string;
        clouds: {
            cover: string;
            base: number;
        }[];
    };
    runways: {
        id: string;
        dimension: string;
        surface: string;
        alignment: number;
    }[];
}

export default function Airport() {
    const [icao, setIcao] = useState('');
    const [airportData, setAirportData] = useState<AirportData | null>(null);
    const [selectedRunway, setSelectedRunway] = useState<RunwayData | null>(null);

    const dialSize = 375;
    const dialCenter = dialSize / 2;
    const dialArrowSize = dialSize * 0.16;
    const dailRadius = dialSize * 0.37;
    const dialHeadingDeg = airportData?.metar.wdir;
    const dialHeadingRad = (dialHeadingDeg !== undefined) ? (dialHeadingDeg - 90) * (Math.PI / 180) : 0;
    const dialX = dailRadius * Math.cos(dialHeadingRad);
    const dialY = dailRadius * Math.sin(dialHeadingRad);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const handleSubmit = async (e: FormEvent) => {
        var data;
        e.preventDefault();
        try {
            data = await fetchAirportData(icao) as AirportData;
            setAirportData(data);
            setSelectedRunway(null);
        } catch (error) {
            setAirportData(null);
            return;
        }
    };

    return (
        <div style={{ margin: '20px', width: '100%', height: '100%', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        value={icao}
                        onFocus={handleFocus}
                        placeholder="Enter ICAO code"
                        variant="outlined"
                        size="small"
                        style={{ marginRight: '8px' }}
                        onChange={(e) => setIcao(e.target.value.toUpperCase())}
                    />
                    <Button variant="contained" type='submit'>Get Airport</Button>
                </div>
                {airportData && (
                    <table>
                        <tr>
                            <td style={{ verticalAlign: 'top', padding: '0', margin: '0' }}>
                                <TableContainer>
                                    <Table>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Report Time (UTC):</Typography></TableCell>
                                            <TableCell><Typography>{airportData?.metar.reportTime}</Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Altimeter:</Typography></TableCell>
                                            <TableCell><Typography color={'secondary'}>{hPaToInHg(airportData?.metar.altim)} inHg / {Math.round(airportData?.metar.altim)} hPa</Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right' style={{ verticalAlign: 'middle' }}><Typography>Wind:</Typography></TableCell>
                                            <TableCell>
                                                {(airportData.metar.wspd !== 0) && (
                                                    <div
                                                        style={{
                                                            position: 'relative',
                                                            padding: 0,
                                                            margin: 0,
                                                            width: dialSize,
                                                            height: dialSize,
                                                        }}>
                                                        <img src={dial}
                                                            style={{
                                                                zIndex: 10,
                                                                position: 'absolute',
                                                                top: (dialSize * 0.1) / 2,
                                                                left: (dialSize * 0.1) / 2,
                                                                width: dialSize * 0.9,
                                                                height: dialSize * 0.9
                                                            }} />
                                                        {selectedRunway !== null && (
                                                            <img
                                                                src={runway}
                                                                style={{
                                                                    zIndex: 1,
                                                                    position: 'absolute',
                                                                    top: dialSize * 0.15,
                                                                    left: dialCenter - (dialSize * 0.08) / 2,
                                                                    opacity: 0.5,
                                                                    height: dialSize * 0.7,
                                                                    rotate: `${selectedRunway?.alignment}deg`,
                                                                }}
                                                            />
                                                        )}
                                                        {Number.isInteger(airportData.metar.wdir) && (
                                                            <img
                                                                src={arrow}
                                                                style={{
                                                                    zIndex: 2,
                                                                    position: 'absolute',
                                                                    top: dialCenter - dialArrowSize / 2,
                                                                    left: dialCenter - dialArrowSize / 2,
                                                                    rotate: `${airportData.metar.wdir}deg`,
                                                                    width: dialArrowSize,
                                                                    height: dialArrowSize,
                                                                    translate: `${dialX}px ${dialY}px`,
                                                                }}
                                                            />
                                                        )}
                                                        <Typography
                                                            color={'secondary'}
                                                            style={{
                                                                padding: '3px 10px',
                                                                backgroundColor: '#2f3235',
                                                                display: 'inline-block',
                                                                border: '1px solid #fcdf52',
                                                                zIndex: 20,
                                                                position: 'relative',
                                                                top: dialSize/2 - 10,
                                                                left: dialSize/2 - 50,
                                                            }}
                                                        >
                                                            {String(dialHeadingDeg).padStart(3, '0')}º / 5kts
                                                        </Typography>
                                                    </div>
                                                )}
                                                {(airportData.metar.wspd === 0) && (
                                                    <Typography color={'secondary'}>Calm</Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Temperature:</Typography></TableCell>
                                            <TableCell><TempLabel color={'secondary'} cel={airportData?.metar.temp} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Dew Point:</Typography></TableCell>
                                            <TableCell><TempLabel cel={airportData?.metar.dewp} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Visibility:</Typography></TableCell>
                                            <TableCell><Typography>{airportData?.metar.visib}</Typography></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Clouds:</Typography></TableCell>
                                            <TableCell>
                                                <Clouds clouds={airportData?.metar.clouds} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='right'><Typography>Raw:</Typography></TableCell>
                                            <TableCell width={300}><Typography>{airportData?.metar.rawOb}</Typography></TableCell>
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                            </td>
                            <td style={{ verticalAlign: 'top', borderLeft: "1px solid rgb(200, 200, 200)" }}>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width={160} align='right'><Typography>Name:</Typography></TableCell>
                                                <TableCell><Typography>{airportData.name}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'><Typography>ICAO:</Typography></TableCell>
                                                <TableCell><Typography>{airportData.icaoId}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'><Typography>Location:</Typography></TableCell>
                                                <TableCell><Typography>{airportData.state}, {airportData.country}</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'><Typography>Elevation:</Typography></TableCell>
                                                <TableCell><Typography>{mToFt(airportData.elev)}ft / {airportData.elev}m</Typography></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right' valign='top'>
                                                    <Typography>Runways:</Typography>
                                                </TableCell>
                                                <TableCell style={{ paddingTop: '3px' }}>
                                                    <Table>
                                                        <TableBody>
                                                            {airportData.runways && airportData.runways.filter(runway => !runway.id.startsWith('H')).map((runway: RunwayData) => (
                                                                <TableRow onClick={(e) => setSelectedRunway(runway)}  style={{ cursor: 'pointer' }}>
                                                                    <TableCell align='left'><Typography>{runway.id}</Typography></TableCell>
                                                                    <TableCell width={120} align='left'><Typography>{String(runway.alignment).padStart(3, '0')}º / {String(runway.alignment + 180).padStart(3, '0')}º</Typography></TableCell>
                                                                    <TableCell align='left'><Typography>{runway.dimension}</Typography></TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align='right'><Typography>Frequencies:</Typography></TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {airportData.freqs.split(';').map((freq: string, index: number) => (
                                                            <div>{freq}</div>
                                                        ))}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </td>
                        </tr>
                    </table>
                )}
            </form>
        </div>
    );
}