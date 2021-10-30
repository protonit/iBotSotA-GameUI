


import {SettingsSlider} from "./settingsSlider";
import React from "react";
import {TabPanel} from "./settingsTabs";
import PropTypes from "prop-types";
import {AspectRatio, Mouse, VolumeUp} from "@material-ui/icons";

export class SettingsData 
{
    public video : videoSettings = new videoSettings;
    public audio : audioSettings = new audioSettings;
    public control : controlSettings = new controlSettings;
}


class videoSettings
{
    public FpsCap:number = 0;
}


class audioSettings
{
    public MasterVolume:number = 0;
    public MusicVolume:number = 0;
}


class controlSettings
{
    public Sensitivity:number = 0;
}



export function VideoSettingsTab(props:any) {
    let tabIx = props.tabIx;
    let tabValue = props.tabValue;
    let handleSettingChange = props.handleSettingChange;
    let data = props.videoData;
    let tabs = [
            <SettingsSlider key={1} nameSpace="video" name="FpsCap" label={[ "FpsCap", <br key={1}/>, "video"]} icon={<AspectRatio/>} initialValue={data.FpsCap} step={1} min={60} max={800} handleChange={handleSettingChange}/>, 
    ];
    return (
        <TabPanel value={tabValue} index={tabIx}>
            {tabs}
        </TabPanel>
    );
}

VideoSettingsTab.propTypes = {
    tabIx: PropTypes.number.isRequired,
    tabValue: PropTypes.number.isRequired,
    handleSettingChange: PropTypes.func.isRequired, 
    videoData: PropTypes.any.isRequired,
} 

export function AudioSettingsTab(props:any) {
    let tabIx = props.tabIx;
    let tabValue = props.tabValue;
    let handleSettingChange = props.handleSettingChange;
    let data = props.audioData;
    let tabs = [
            <SettingsSlider key={1} nameSpace="audio" name="MasterVolume" label={[ "MasterVolume", <br key={1}/>, "audio"]} icon={<VolumeUp/>} initialValue={data.MasterVolume} step={1} min={0} max={100} handleChange={handleSettingChange}/>, 
            <SettingsSlider key={2} nameSpace="audio" name="MusicVolume" label={[ "MusicVolume", <br key={1}/>, "audio"]} icon={<VolumeUp/>} initialValue={data.MusicVolume} step={1} min={0} max={100} handleChange={handleSettingChange}/>, 
    ];
    return (
        <TabPanel value={tabValue} index={tabIx}>
            {tabs}
        </TabPanel>
    );
}

AudioSettingsTab.propTypes = {
    tabIx: PropTypes.number.isRequired,
    tabValue: PropTypes.number.isRequired,
    handleSettingChange: PropTypes.func.isRequired, 
    audioData: PropTypes.any.isRequired,
} 

export function ControlSettingsTab(props:any) {
    let tabIx = props.tabIx;
    let tabValue = props.tabValue;
    let handleSettingChange = props.handleSettingChange;
    let data = props.controlData;
    let tabs = [
            <SettingsSlider key={1} nameSpace="control" name="Sensitivity" label={[ "Sensitivity", <br key={1}/>, "control"]} icon={<Mouse/>} initialValue={data.Sensitivity} step={0.01} min={0} max={30} handleChange={handleSettingChange}/>, 
    ];
    return (
        <TabPanel value={tabValue} index={tabIx}>
            {tabs}
        </TabPanel>
    );
}

ControlSettingsTab.propTypes = {
    tabIx: PropTypes.number.isRequired,
    tabValue: PropTypes.number.isRequired,
    handleSettingChange: PropTypes.func.isRequired, 
    controlData: PropTypes.any.isRequired,
} 

