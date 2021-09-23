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
        let settingType:Array<any> = data[nameSpace];
        let setting = settingType.find(item => item.name == name);
        if(setting)
            setting.value = value;
    }
    let keys = Object.keys(data);
    let tabs = keys.map((value, index, array) => <Tab label={value} {...a11yProps({index})} />); 

    let values = Object.values(data);
    //var Object.values()
    
    let tabPanels = keys.map((tabItem, tabIx, array) => {
        let settingsArr:Array<any> = values[tabIx] as Array<any>;
        let tabs = settingsArr.map((settingItem, settingIx, settingArray) => {
            let settingName = settingItem.name;
            let settingValue = settingItem.value;
            let settingLabel = settingItem.label ?? _.startCase(settingName);
            settingLabel = settingLabel.replace(" ", "|<br/>|");
            let nameSpace = tabItem;
            let settingLabelParts:Array<string> = settingLabel.split("|").map((labelValue:string) => labelValue == "<br/>" ? <br/> : labelValue);
            switch(settingItem.type) {
                case "number":
                    return (
                        <SettingsSlider nameSpace={nameSpace} name={settingName} label={settingLabelParts} icon={<VolumeUp/>} initialValue={settingValue} step={0.4} min={10} max={110} handleChange={handleSettingChange}/>
                    );
            } 
        });
        
        return(
            <TabPanel value={tabValue} index={tabIx}>
                {tabs}
            </TabPanel>);
    });
    tabPanels.push(<VideoSettingsTab />)
    tabPanels.push(<AudioSettingsTab />)
    tabPanels.push(<ControlsSettingsTab />)


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
