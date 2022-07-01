import PropTypes from 'prop-types';
import * as rl from 'react-leaflet';
import { useRef, useCallback } from 'react';
import { useMount } from 'react-use';
import { createIcon, getBounds } from './utils';
import * as e from './styles';

export default function Map({ models }) {
    const ref = useRef();

    const handleFitBounds = useCallback(() => {
        ref.current.leafletElement.fitBounds(getBounds(models), { padding: [20, 20] });
    }, []);

    useMount(handleFitBounds);

    return (
        <e.Container>
            <rl.Map ref={ref} center={[51.505, -0.09]} zoom={13}>
                <rl.TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png" />
                <rl.Marker
                    key={models[0].address1}
                    position={[models[0].coordinates.lat, models[0].coordinates.lng]}
                    icon={createIcon(
                        'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF',
                        [20, 20]
                    )}
                />
                {models.slice(1).map((model) => (
                    <rl.Marker
                        key={model.address1}
                        position={[model.coordinates.lat, model.coordinates.lng]}
                        icon={createIcon()}
                    />
                ))}
            </rl.Map>

            <e.Button onClick={handleFitBounds}>Reset View</e.Button>
        </e.Container>
    );
}

Map.propTypes = {
    models: PropTypes.arrayOf(
        PropTypes.shape({
            address1: PropTypes.string.isRequired,
        }).isRequired,
        PropTypes.shape({
            coordinates: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
};
