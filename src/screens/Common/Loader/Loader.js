import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import OverlayLoader from 'react-loading-overlay';

const Loader = (props) => {
    const isLoading = useSelector(state => state.loaderData.isLoading);

    return (
        <Fragment>
            <OverlayLoader active={isLoading}
                styles={{
                    overlay: (base) => ({
                        ...base,
                        background: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1400
                    })
                }}
                spinner={<BeatLoader size={30} margin={2} color={'#9d48be'} />}
                {...props}
            />
        </Fragment>
    );
};

export default Loader;