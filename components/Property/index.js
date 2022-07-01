import PropTypes from 'prop-types';
import * as e from './styles';
import { useCallback, useContext } from 'react';
import { MapContext } from '@app/Pulse';
import { getBounds } from '@app/Map/utils';

export default function Property({ model }) {
    const { mapRef } = useContext(MapContext);

    const viewLocation = useCallback(() => {
        mapRef.current.leafletElement.fitBounds(getBounds([model]), { padding: [20, 20] });
    }, []);

    return (
        <e.Container>
            <e.Title>{model.address1}</e.Title>

            <e.Address>
                {model.city}, {model.postalCode}, {model.state}
            </e.Address>

            <e.Button onClick={viewLocation}>View Location</e.Button>
        </e.Container>
    );
}

Property.propTypes = {
    model: PropTypes.shape({
        address1: PropTypes.string.isRequired,
        city: PropTypes.string.isrequired,
        postalCode: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    }).isRequired,
};
