import React, { useState } from 'react';
import { getIndexAsync } from 'apis';

type ShyftWxProps = {
    indexData?: ShyftIndex;
    indexUrl?: string;
};

export const ShyftWx: React.FC<ShyftWxProps> = ({ indexData, indexUrl }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState<ShyftIndex>();

    React.useEffect(() => {
        if (indexUrl) {
            getIndexAsync(indexUrl).then((data) => {
                setIndex(data);
                setLoading(false);
            });
        } else if (indexData) {
            setIndex(indexData);
            setLoading(false);
        } else {
            setError('No indexUrl or indexData provided.');
        }
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>LOADING</p>;
    }

    return <p>{JSON.stringify(index)}</p>;
};

export default ShyftWx;
