//import styles from '../settings/settings.css'
import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {SettingsTabs} from "./settingsTabs";


function SettingsDialog(props:any) {
    const useStyles = makeStyles((theme) => ({
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
    }));
    const classes = useStyles();
    let data = props.data;

    const { onClose, selectedValue, open } = props;
    //const classes = useDialogStyles();
    //const [open, setOpen] = React.useState(initialState);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleMaxWidthChange = (event:any) => {
        setMaxWidth(event.target.value);
    };

    const handleFullWidthChange = (event:any) => {
        setFullWidth(event.target.checked);
    };
    
    const handleChange = () => {
        let currData = JSON.stringify(data);
        console.log(currData);
    }

    return (
            <Dialog className={classes.form}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <SettingsTabs data={data} handleChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Apply
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
    );
}

SettingsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.any.isRequired,
    data: PropTypes.any.isRequired,
};

export {
    SettingsDialog,
}