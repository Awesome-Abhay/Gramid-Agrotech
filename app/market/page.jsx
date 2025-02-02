
import React from 'react';
import DistrictSelector from './DistrictSelector';

export default function Page() {

    return (
        <div style={{
            padding: '0.5rem'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.25rem'
            }}>
                <h1>Market 🛒</h1>
                <p>Know it before you buy it! 💡</p>
            </div>
            <DistrictSelector />
        </div>
    );
}