import L from 'leaflet';

export function createIcon(
    iconUrl = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF',
    iconSize = [10, 10]
) {
    return new L.Icon({
        className: 'property',
        iconSize,
        iconUrl,
    });
}

export function getBounds(models) {
    return models.map((model) => new L.LatLng(model.coordinates.lat, model.coordinates.lng));
}
