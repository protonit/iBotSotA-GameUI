import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";
import {SettingsSlider} from "./settingsSlider";
import {VolumeUp} from "@material-ui/icons";
import PropTypes from "prop-types";
import {SettingsDialog} from "./settingsDialog";
import _ from "lodash";
import {AudioSettingsTab, ControlsSettingsTab, VideoSettingsTab} from "./InterfaceGen";

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
        /*
        let settingType:Array<any> = data[nameSpace];
        let setting = settingType.find(item => item.name == name);
        if(setting) {
            setting.value = value;
            console.log("Setting: " + nameSpace + "." + name + " to: " + value);
        } else
            console.log("Cannot find setting: " + nameSpace + "." + name);
         */
        let settingType = data[nameSpace];
        let setting = settingType[name];
        if(setting) {
            setting.value = value;
            //console.log("Setting: " + nameSpace + "." + name + " to: " + value);
        } else
            console.log("Cannot find setting: " + nameSpace + "." + name);
    }
    let keys = Object.keys(data);
    let tabs = keys.map((value, index, array) => <Tab label={value} {...a11yProps({index})} />); 

    let values = Object.values(data);
    //var Object.values()
    
    let tabIx = 0;
    let tabPanels = [];
    tabPanels.push(
        <TabPanel index={tabIx++} value={tabValue}>
            <VideoSettingsTab />
        </TabPanel>);
    tabPanels.push(
            <AudioSettingsTab tabIx={tabIx++} tabValue={tabValue} handleSettingChange={handleSettingChange} audioData={data.audio} />
    );
    tabPanels.push(
        <TabPanel index={tabIx++} value={tabValue}>
            <ControlsSettingsTab />
        </TabPanel>
    );


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
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
