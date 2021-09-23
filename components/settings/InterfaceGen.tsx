import {SettingsSlider} from "./settingsSlider";
import React from "react";
import {TabPanel} from "./settingsTabs";
import PropTypes from "prop-types";


export class TabData 
{
    public video : videoSettings = new videoSettings;
    public audio : audioSettings = new audioSettings;
    public controls : controlsSettings = new controlsSettings;

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


class controlsSettings
{


}



export function VideoSettingsTab(props:any) {
    let handleChange = function() {
        
    };
    return (
            <SettingsSlider nameSpace="VideoSettingsTab" name="FpsCap" label={[ "FpsCap", <br/>, "VideoSettingsTab"]}  initialValue={0} handleChange={handleChange}/>
    );
}


export function AudioSettingsTab(props:any) {
    let tabIx = props.tabIx;
    let tabValue = props.tabValue;
    let handleChange = props.handleSettingChange;
    let data = props.audioData;
    let tabs = [
        <SettingsSlider nameSpace="audio" name="MasterVolume" label={[ "MasterVolume", <br/>, "AudioSettingsTab"]} initialValue={data.MasterVolume.value} handleChange={handleChange} />,
        <SettingsSlider nameSpace="audio" name="MusicVolume" label={[ "MusicVolume", <br/>, "AudioSettingsTab"]} initialValue={data.MusicVolume.value} handleChange={handleChange} />
    ]
    return (<TabPanel value={tabValue} index={tabIx}>
        {tabs}
    </TabPanel>);
}

AudioSettingsTab.propTypes = {
    tabIx: PropTypes.number.isRequired,
    tabValue: PropTypes.number.isRequired,
    handleSettingChange: PropTypes.func.isRequired, 
    audioData: PropTypes.any.isRequired,
} 


export function ControlsSettingsTab(props:any) {
    return (<br/>
    );
}



