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
                    <Button variant="outlined" onClick={handleClose} color="secondary">
                        no
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="secondary" autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DeleteConfirmationDialog;