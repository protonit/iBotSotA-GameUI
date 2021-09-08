import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {AppBar, Box, Tab, Tabs, Typography} from "@material-ui/core";
import {SettingsSlider} from "./settingsSlider";
import {VolumeUp} from "@material-ui/icons";
import PropTypes from "prop-types";

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


export function SettingsTabs() {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }));


    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    const handleSettingChange = (event: any, label:string, newValue:any) => {
        //alert("new value: " + newValue);
        console.log(label + ": " + event + " " + newValue);
    }

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
                <SettingsSlider label="Volume" icon={<VolumeUp/>} initialValue={20} handleChange={handleSettingChange}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Controls Settings
            </TabPanel>
        </div>
    );
}