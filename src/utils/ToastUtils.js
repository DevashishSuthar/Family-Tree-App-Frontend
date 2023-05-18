import { Notyf } from 'notyf';

import 'notyf/notyf.min.css';

const notyf = new Notyf({
    dismissible: true,
    duration: 3000,
    position: {
        x: 'right',
        y: 'top'
    }
});

export const showSuccessToastMessage = (message) => {
    return notyf.success(message);
};

export const showErrorToastMessage = (message) => {
    return notyf.error(message);
};