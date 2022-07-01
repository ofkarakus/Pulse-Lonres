import PropTypes from 'prop-types';
import * as e from './styles';
import dynamic from 'next/dynamic';

const Property = dynamic(() => import('@app/Property'), {
    ssr: false,
});

export default function Properties({ models }) {
    return (
        <e.Container>
            {models.map((model) => (
                <Property key={model.address1} model={model} />
            ))}
        </e.Container>
    );
}

Properties.propTypes = { models: PropTypes.array.isRequired };
