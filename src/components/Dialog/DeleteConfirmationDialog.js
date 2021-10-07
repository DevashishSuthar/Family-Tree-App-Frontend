import React from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const DeleteConfirmationDialog = ({ handleClose, handleSubmit, isOpen }) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this family?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        no
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DeleteConfirmationDialog;