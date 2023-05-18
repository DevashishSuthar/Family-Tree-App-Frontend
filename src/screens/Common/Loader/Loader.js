import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import OverlayLoader from 'react-loading-overlay';

const Loader = (props) => {
    const isLoading = useSelector(state => state.loaderData.isLoading);

    return (
        <Fragment>
            <OverlayLoader active={isLoading}
                // styles={{
                //     overlay: (base) => ({
                //         ...base,
                //     })
                // }}
                spinner={<BeatLoader size={30} margin={2} color={'#fff'} />}
                {...props}
            />
        </Fragment>
    );
};

export default Loader;