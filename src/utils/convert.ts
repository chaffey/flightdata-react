export function hPaToInHg(hPa: number) {
    return (hPa * 0.029529980164712).toFixed(2);
}

export function mToFt(m: number) {
    return (m * 3.2808398950131).toFixed(0);
}

export function parseCoordinate(coord: string): number {
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