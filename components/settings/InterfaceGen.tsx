import {SettingsSlider} from "./settingsSlider";
import React from "react";
import {TabPanel} from "./settingsTabs";


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
    let handleChange = function() {

    };
    let tabs = [
        <SettingsSlider nameSpace="AudioSettingsTab" name="MasterVolume" label={[ "MasterVolume", <br/>, "AudioSettingsTab"]} initialValue={0} handleChange={handleChange} />,
        <SettingsSlider nameSpace="AudioSettingsTab" name="MusicVolume" label={[ "MusicVolume", <br/>, "AudioSettingsTab"]} initialValue={0} handleChange={handleChange} />
    ]
    let tabIx = 0;
    let tabValue = "";
    return (<TabPanel value={tabValue} index={tabIx}>
        {tabs}
    </TabPanel>);
}


export function ControlsSettingsTab(props:any) {
    return (<br/>
    );
}



