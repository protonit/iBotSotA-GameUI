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
import { Button, Dialog, DialogTitle, AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function SettingsTabs() {
    const classes = useStyles();
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


class SettingsDialog extends React.Component<{open:boolean}> {

    public currentTab:any;
    constructor(props:any) {
        super(props);
    }
    
    handleDialogClose = () => {
        
    };

    render() {
        return (
            <Dialog onClose={this.handleDialogClose} open={this.props.open} aria-labelledby="simple-dialog-title">
                <DialogTitle>Settings</DialogTitle>
                <SettingsTabs />
            </Dialog>);
    }
}


export default SettingsDialog;