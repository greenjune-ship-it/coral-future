import React, { useContext } from 'react';
// Internal imports
import { BioSamplesFilterContext } from 'contexts/BioSamplesFilterContext'

const CustomerCart = () => {
    const { filteredBioSamples } = useContext(BioSamplesFilterContext);

    return (
        <div>
            <h1>Customer Cart</h1>
            {filteredBioSamples.map((sample) => (
                <div key={sample.id}>
                    <h4>Sample ID: {sample.id}</h4>
                    <p>Country: {sample.country}, {sample.species} {sample.collection_date}</p>
                </div>
            ))}
        </div>
    );
};

export default CustomerCart;
