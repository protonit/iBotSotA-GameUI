import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Menu.module.css'
import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import {tSArrayType} from '@babel/types';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import moment from 'moment';
import PropTypes, {any} from 'prop-types';
import { useEffect } from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Button } from '@material-ui/core';
import {red} from '@material-ui/core/colors';
import common from '../common/commonImports';
import { SettingsDialog  } from '../components/settings/settingsDialog';
import {SettingsData} from "../components/interface/InterfaceGen";
import {type} from "os";

function SetupCallFunctions() {
    useEffect(() => {
        let wndAny:any = global.window;
        wndAny.UpdateStartMenu = function (menuData:StartMenuData) {
            ReactDOM.render(<StartMenu MenuData={menuData} />, document.getElementById('__next'));
        }
    }, []);
}

const Home: NextPage = () => {
    SetupCallFunctions();
    return (<StartMenu MenuData={new StartMenuData()} />);
}

class StartMenu extends React.Component<{MenuData:StartMenuData}>
{
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <Head>
                    <title>Start Menu</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@500&display=swap" rel="stylesheet"/>
                </Head>
                <div className={styles.screen}>
                    <div  className={styles.topRow}>top</div>
                        <div className={styles.gameArea}>
                            <GraphPanel posStyle={{left: "0%"}} />
                            <MenuButtons posStyle={{left: "35%"}} SettingsData={new SettingsData()} />
                            <div style={{left: "70%"}} className={styles.menuPanel}>right</div>
                        </div>
                    <div className={styles.bottomRow}>bottom</div>
                </div>
            </div>
        );
    }
}

class GraphPanel extends React.Component<{posStyle:any}>
{
    
    constructor(props:any) {
        super(props);
    }

    render() {
        // We'll use some mock data from `@visx/mock-data` for this.
        const data = letterFrequency;

        // Define the graph dimensions and margins
        const width = 500;
        const height = 500;
        const margin = { top: 20, bottom: 20, left: 20, right: 20 };

        // Then we'll create some bounds
        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;

        // We'll make some helpers to get at the data we want
        const x = (d:any) => d.letter;
        const y = (d:any) => +d.frequency * 100;

        // And then scale the graph by our data
        const xScale = scaleBand({
            range: [0, xMax],
            round: true,
            domain: data.map(x),
            padding: 0.4,
        });
        const yScale = scaleLinear({
            range: [yMax, 0],
            round: true,
            domain: [0, Math.max(...data.map(y))],
        });

        // Compose together the scale and accessor functions to get point functions
        const compose = (scale:any, accessor:any) => (data:any) => scale(accessor(data));
        const xPoint = compose(xScale, x);
        const yPoint = compose(yScale, y);

        var fillColor = "#ffffaa"

        return (
            <div style={this.props.posStyle} className={styles.menuPanel}>
                <svg width={width} height={height}>
                    {data.map((d, i) => {
                        const barHeight = yMax - yPoint(d);
                        return (
                            <Group key={`bar-${i}`}>
                                <Bar
                                    x={xPoint(d)}
                                    y={yMax - barHeight}
                                    height={barHeight}
                                    width={xScale.bandwidth()}
                                    fill={fillColor}
                                />
                            </Group>
                        );
                    })}
                </svg>
            </div>
        );
    }
}

function OnStartClick() {
    if(global.window) {
        let wndAny:any = global.window;
        let playAudio = new Audio(common.clickOpenAudio);
        //clickAudio.play();
        playAudio.play();
        setTimeout(wndAny.OnStartClick, 1000);
    }
}

function OnSettingsClick() {
    if(global.window) {
        let wndAny:any = global.window;
        let playAudio = new Audio(common.clickOpenAudio);
        playAudio.play();
        let isGameRunning:boolean = true;
        if(isGameRunning)
            setTimeout(wndAny.OnSettingsClick, 100);
        else {
            setTimeout(() => {
                wndAny.OpenSettingsDialog(new SettingsData());
            }, 100);
        }
    }
}

function MenuButtons(props:any) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [data, setData] = React.useState(props.SettingsData)
    //let wndAny:any = global.window;
    //let data = wndAny.SettingData;

    if(global.window) {
        let wndAny:any = global.window;
        wndAny.OpenSettingsDialog = function(settingsData:SettingsData) {
            setData(settingsData);
            setOpen(true);
        }

    }
    
    const handleClose = (selectedValue:any, isApplied:boolean) => {
        let playAudio = new Audio(common.clickCloseAudio);
        playAudio.play();
        setTimeout(() => {
            setOpen(false);
        }, 100);
        setSelectedValue(selectedValue);
        if(isApplied && global.window) {
            let wndAny:any = global.window;
            wndAny.SetSettingData(data);
        }
    };
    
    return (<div style={props.posStyle} className={styles.menuPanel}>
        <Button color={'primary'} classes={{label: styles.menuButtonLabel, root: styles.menuButtonRoot }} onClick={OnSettingsClick}>Settings</Button>
        <br/>
        <Button color={'primary'} classes={{label: styles.menuButtonLabel, root: styles.menuButtonRoot }} onClick={OnStartClick}>Start</Button>
        <SettingsDialog open={open} onClose={handleClose} selectedValue={1} data={data} />
    </div> );

}

MenuButtons.propTypes = {
    SettingsData: PropTypes.instanceOf<SettingsData>(SettingsData).isRequired,
    posStyle: PropTypes.any
}


class StartMenuData
{

}


export default Home
