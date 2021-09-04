import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Menu.module.css'
//import styles from '../settings/settings.css'
import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import {tSArrayType} from '@babel/types';
import moment from 'moment';
import {any} from 'prop-types';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, 
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,
    FormControl,
    AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props:any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index:any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function SettingsTabs() {
    const classes = useTabStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event:any, newValue:any) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Video" {...a11yProps(0)} />
                    <Tab label="Audio" {...a11yProps(1)} />
                    <Tab label="Controls" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Video Settings
            </TabPanel>
            <TabPanel value={value} index={1}>
                Audio Settings
            </TabPanel>
            <TabPanel value={value} index={2}>
                Controls Settings
            </TabPanel>
        </div>
    );
}

const useDialogStyles = makeStyles((theme) => ({
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

function SettingsDialog(props:any) {
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

    return (
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can set my maximum width and whether to adapt or not.
                    </DialogContentText>
                    <SettingsTabs />
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
};

export {
    SettingsDialog,
}