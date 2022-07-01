import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Properties from '@app/Properties';
import * as e from './styles';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3000');

const Map = dynamic(() => import('@app/Map'), {
    ssr: false,
    loading: () => <e.Loading>Loading Map&hellip;</e.Loading>,
});

export default function Pulse({ models }) {
    const [propertyData, setPropertyData] = useState(models);

    useEffect(() => {
        // connect to the socket when the component mounts
        const propertySocket = socket.on('property', (data) => {
            setPropertyData((prevState) => {
                if (
                    prevState.findIndex(
                        (property) => property.address1 === data.message.model.address1
                    ) === -1
                ) {
                    return [data.message.model, ...prevState];
                } else {
                    const tempState = prevState.filter(
                        (property) => property.address1 !== data.message.model.address1
                    );
                    return [data.message.model, ...tempState];
                }
            });
        });

        // disconnect the socket when the component unmounts
        return () => propertySocket.off('property');
    }, []);

    return (
        <e.Container>
            <Map models={propertyData} />
            <Properties models={propertyData} />
        </e.Container>
    );
}

Pulse.propTypes = { models: PropTypes.array.isRequired };
