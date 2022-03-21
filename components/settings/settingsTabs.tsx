import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";
import {SettingsSlider} from "./settingsSlider";
import {VolumeUp} from "@material-ui/icons";
import PropTypes from "prop-types";
import {SettingsDialog} from "./settingsDialog";
import _ from "lodash";
import {AudioSettingsTab, ControlSettingsTab, VideoSettingsTab} from "../interface/InterfaceGen";

export function TabPanel(props:any) {
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


export function SettingsTabs(props:any) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    let data = props.data;
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setTabValue(newValue);
    };

    const handleSettingChange = (event: any, nameSpace:string, name:string, value:any) => {
        let settingType = data[nameSpace];
        settingType[name] = value;
    }
    
    let keys = Object.keys(data);
    let tabs = keys.map((value, index, array) => <Tab label={value} {...a11yProps({index})} key={index} />); 

    let values = Object.values(data);
    //var Object.values()
    
    let tabIx = 0;
    let tabPanels = [
        <VideoSettingsTab tabIx={tabIx++} tabValue={tabValue} handleSettingChange={handleSettingChange} videoData={data.video} key={1} />,
        <AudioSettingsTab tabIx={tabIx++} tabValue={tabValue} handleSettingChange={handleSettingChange} audioData={data.audio} key={2} />,
        <ControlSettingsTab tabIx={tabIx++} tabValue={tabValue} handleSettingChange={handleSettingChange} controlData={data.control} key={3} /> 
    ];

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example" key={tabValue}>
                    {tabs}
                </Tabs>
            </AppBar>
            {tabPanels}
        </div>
    );
}

SettingsTabs.propTypes = {
    data: PropTypes.any.isRequired,
    handleChange: PropTypes.func,
};
