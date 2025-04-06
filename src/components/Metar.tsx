import { FormEvent, useState } from 'react';
import { fetchMetar } from '../services/metarService';
import { Button, TextField, Table, TableContainer, TableRow, TableCell } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface MetarData {
  [key: string]: any;
}

function hPaToInHg(hPa: number) {
  return (hPa * 0.029529980164712).toFixed(2);
}

function mToFt(m: number) {
  return (m * 3.2808398950131).toFixed(0);
}

export default function Metar() {
  const [icao, setIcao] = useState('');
  const [metarData, setMetarData] = useState<MetarData | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await fetchMetar(icao) as MetarData;
    setMetarData(data);
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
            <Button variant="contained" type='submit'>Get METAR</Button>
        </AccordionSummary>
        <AccordionDetails>
          {metarData && (
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell width={160} align='right'>Time (UTC):</TableCell>
                  <TableCell>{metarData.reportTime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Name:</TableCell>
                  <TableCell>{metarData.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>ICAO:</TableCell>
                  <TableCell>{metarData.icaoId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Wind: </TableCell>
                  <TableCell>{metarData.wspd} at {String(metarData.wdir).padStart(3, '0')}º</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Temperature (ºc):</TableCell>
                  <TableCell>{Math.round(metarData.temp)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Dew Point (ºc):</TableCell>
                  <TableCell>{Math.round(metarData.dewp)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Altimeter:</TableCell>
                  <TableCell>{hPaToInHg(metarData.altim)} inHg / {Math.round(metarData.altim)} hPa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Elevation (ft):</TableCell>
                  <TableCell>{mToFt(metarData.elev)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right'>Raw:</TableCell>
                  <TableCell width={600}>{metarData.rawOb}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>              
          )}
        </AccordionDetails>
      </Accordion>
      </form>
      </div>
  );
}