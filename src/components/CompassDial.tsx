import { Typography } from '@mui/material';
import dial from '../assets/compass-dial.png'
import arrow from '../assets/red-arrow.png'

export function CompassDial({speed, heading, size = 50}: {speed: number, heading: number, size?: number}) {
    const radius = size * 0.37;
    const center = size / 2;
    const arrowSize = size * 0.16;
    const headingRad = (heading - 90) * (Math.PI / 180);
    const x = center + (radius * Math.cos(headingRad)) - (arrowSize/2);
    const y = center + radius * Math.sin(headingRad) - (arrowSize/2);

    return (
        <div style={{ padding: 0, margin: 0, width: size, height: size}}>
            <img src={arrow} 
                style={{ 
                    position: 'fixed', 
                    rotate: `${heading}deg`, 
                    width: arrowSize, 
                    height: arrowSize,
                    translate: `${x}px ${y}px`
                }} 
                alt="Arrow" />
            <img src={dial} 
                style={{ 
                    position: 'relative', 
                    top: center - (size * 0.9 / 2), 
                    left: center - (size * 0.9 / 2), 
                    width: size * 0.9, 
                    height: size * 0.9
                }}/>
            <Typography color={'secondary'} style={{position: 'relative', top: -center, textAlign: 'center'}}>
                {speed}kts<br/>{String(heading).padStart(3, '0')}º
            </Typography>
        </div>
    );

}