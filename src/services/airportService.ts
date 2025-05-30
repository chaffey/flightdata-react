import api from '../api';
import { parseCoordinate } from '../utils/convert';

export interface AirportDataResponse {
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

export const fetchAirportData = async (icaoCode: string) : Promise <AirportDataResponse> => {
    const response = await api.get(`/full/${icaoCode}`);
    var offset = parseCoordinate(response.data.magdec)
    response.data.runways.forEach((runway: any) => {
        runway.alignment = Number(runway.alignment) + offset;
    });

    return response.data;
};

/* Sample Response
{
    "id": "2728",
    "icaoId": "KAPA",
    "iataId": "APA",
    "faaId": "APA",
    "name": "DENVER/CENTENNIAL ",
    "state": "CO",
    "country": "US",
    "source": "FAA",
    "type": "ARP",
    "lat": 39.5701,
    "lon": -104.849,
    "elev": 1794,
    "magdec": "08E",
    "owner": "P",
    "runways": [
        {
            "id": "10/28",
            "dimension": "4800x75",
            "surface": "A",
            "alignment": "111"
        },
        {
            "id": "17L/35R",
            "dimension": "10001x100",
            "surface": "A",
            "alignment": "178"
        },
        {
            "id": "17R/35L",
            "dimension": "7001x75",
            "surface": "A",
            "alignment": "178"
        },
        {
            "id": "H1",
            "dimension": "50x50",
            "surface": "C",
            "alignment": "-"
        }
    ],
    "rwyNum": "4",
    "rwyLength": "L",
    "rwyType": "C",
    "services": "S",
    "tower": "T",
    "beacon": "B",
    "operations": "0",
    "passengers": null,
    "freqs": "LCL/P,118.9;ATIS,120.3",
    "priority": "4",
    "metar": {
        "metar_id": 735606794,
        "icaoId": "KAPA",
        "receiptTime": "2025-04-14 15:27:05",
        "obsTime": 1744642380,
        "reportTime": "2025-04-14 15:00:00",
        "temp": 0.6,
        "dewp": -3.9,
        "wdir": 150,
        "wspd": 4,
        "wgst": null,
        "visib": "10+",
        "altim": 1025.5,
        "slp": 1026,
        "qcField": 4,
        "wxString": null,
        "presTend": 0.7,
        "maxT": null,
        "minT": null,
        "maxT24": null,
        "minT24": null,
        "precip": null,
        "pcp3hr": 0.005,
        "pcp6hr": null,
        "pcp24hr": null,
        "snow": null,
        "vertVis": null,
        "metarType": "METAR",
        "rawOb": "KAPA 141453Z 15004KT 10SM OVC019 01/M04 A3028 RMK AO2 SLP260 60000 T00061039 50007",
        "mostRecent": 1,
        "lat": 39.5599,
        "lon": -104.848,
        "elev": 1791,
        "prior": 5,
        "name": "Denver/Centennial Arpt, CO, US",
        "clouds": [
            {
                "cover": "OVC",
                "base": 1900
            }
        ]
    }
}
*/
