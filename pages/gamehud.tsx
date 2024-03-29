import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import hudStyles from '../styles/Hud.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash";
import {tSArrayType} from '@babel/types';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import moment from 'moment';
import {any} from 'prop-types';
import { useEffect } from 'react';
import {UIData, CharData, MatchData} from "../components/interface/InterfaceGen";

const Home: NextPage = () => {
    let hudRef:any = <HudUI uiData={new UIData([
        new CharData("n1", 0.1),
        new CharData("n2", 0.22),
        new CharData("n3", 0.333),
        new CharData("n4", 0.4444)
    ], new MatchData(0, 0, new Date(), new Date(), 0, 0, 0 ,0))} />;
    useEffect(() => {
        let wndAny:any = global.window;
        wndAny.UpdateUI = function (uiData:UIData) {
            ReactDOM.render(<HudUI uiData={uiData} />, document.getElementById('__next'));
        }
    }, []);
  return hudRef
}

function callout() {
    if(typeof window !== 'undefined') {
        var rootElement = document.getElementById('__next');
        console.log(rootElement);
        var uiData = new UIData([
            new CharData("n1", 11.1),
            new CharData("n2", 22.22),
            new CharData("n3", 33.333),
            new CharData("n4", 44.4444)
        ], new MatchData(0, 0, new Date(),new Date(), 0, 0, 0, 0));
        uiData.MatchData.ChamberCount = 12;
        uiData.MatchData.CurrentChamber = 4;
        let wndAny:any = global.window;
        //ReactDOM.render(wndAny.HudUIInstance, document.getElementById('root'));
        ReactDOM.render(<HudUI uiData={uiData} />, rootElement);
    }
}

class HudUI extends React.Component<{ readonly uiData:UIData}> {
    constructor(props:any) {
        super(props);
        if(global.window) {
            var wndAny:any = window;
            wndAny.HudUIInstance = this;
        }
    }

    render() {
        const charPosLeftArr = [
            "0%",
            "20%",
            "60%",
            "80%"
        ];
        const bottomPosStyleArr = [
            {
                width: "33.3%",
            },
            {
                left: "33.3%",
                width: "33.4%",
            },
            {
                left: "66.7%",
                width: "33.3%",
            },

        ];
        let uiData = this.props.uiData;
        let matchData = uiData.MatchData;
        let matchAccuracy = Math.round(matchData.MatchAccuracy * 10) / 10;
        let matchHSAccuracy = Math.round(matchData.MatchHSAccuracy * 10) / 10;
        let chamberAccuracy = Math.round(matchData.ChamberAccuracy * 10) / 10;
        let chamberHSAccuracy = Math.round(matchData.ChamberHSAccuracy * 10) / 10;

        return (
            <div className={hudStyles.container}>
                <Head>
                    <title>Create Next App</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@500&display=swap" rel="stylesheet"/>
                </Head>
                <div className={hudStyles.screen}>
                    <div  className={hudStyles.topRow}>
                        {
                            _.times(4, (i:number) => {
                                const posStyle = charPosLeftArr[i];
                                const charData = this.props.uiData.CharDatas[i];
                                if(charData.Name)
                                    return <CharInfo key={i} cardPosStyle={{left: posStyle }} CharData={charData}/>;
                            })
                        }
                        <MatchInfo cardPosStyle={{left: "40%" }} matchData={this.props.uiData.MatchData} />
                    </div>
                    <div className={hudStyles.gameArea}></div>
                    <div className={hudStyles.bottomRow}>
                        <BottomInfo cardPosStyle={bottomPosStyleArr[2]}>Chamber Acc: {chamberAccuracy}%<br/>Chamber HS: {chamberHSAccuracy}%<br/>Match Acc: {matchAccuracy}%<br/>Match HS: {matchHSAccuracy}%</BottomInfo>
                    </div>
                </div>
            </div>
        );
    }
}

class PercentageBar extends React.Component<{ readonly percentage:number, readonly width:number}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
              <Progress
                  type="circle"
                  percent={this.props.percentage}
                  width={this.props.width}
                  strokeWidth={50}
                  symbolClassName={hudStyles.percentageBar}
                  theme={{
                      success: {
                          color: 'rgb(223, 105, 180)'

                      },
                      active: {
                          color: 'red',
                          trailColor: 'pink'
                      },
                      default: {
                          color: 'rgb(225, 105, 180)'
                      },
                  }}
              />
        );
    }
}

class ChamberInfo extends React.Component<{readonly cardPosStyle:any}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
          <div style={this.props.cardPosStyle} className={hudStyles.chamberInfo}>{this.props.children}</div>
        );
    }
}

class CharInfo extends React.Component<{readonly cardPosStyle:any, readonly CharData:CharData}> {

    constructor(props:any) {
        super(props);
    }
    render() {
        const charData = this.props.CharData;
        return (
            <div style={this.props.cardPosStyle} className={hudStyles.charInfo}><PercentageBar width={87} percentage={Math.round(charData.HealthPct * 100)}/><br/>{charData.Name}</div>
        );
    }
}

class MatchInfo extends React.Component<{readonly cardPosStyle:any, readonly matchData:MatchData}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        const md = this.props.matchData;
        const formattedChamberTime = (moment(md.ChamberTime)).format("mm:ss");
        const formattedMatchTime = (moment(md.MatchTime)).format("mm:ss");
        return (
          <div style={this.props.cardPosStyle} className={hudStyles.matchInfo}>Chamber {md.CurrentChamber} / {md.ChamberCount}<br/>{formattedChamberTime} / {formattedMatchTime}</div>
        );
    }
}

class BottomInfo extends React.Component<{readonly cardPosStyle:any}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.cardPosStyle} className={hudStyles.bottomInfo}>{this.props.children}</div>
        );
    }
}

/*
class UIData {
    public CharDatas: Array<CharData> = [
        {Name: "Kalmox", Health: 0.7},
        {Name: "", Health: 0 },
        {Name: "KyleBot", Health: 0.7},
        {Name: "KyleBot", Health: 0.7}
    ];
    public MatchData: MatchData = new MatchData();
}

class CharData {
    public Name:string = "";
    public Health:number = 0.70;
}

class ChamberData {
    public ChamberTime:Date = new Date();
}

class MatchData {
    public CurrentChamber:number = 0;
    public ChamberCount:number = 0;
    public MatchTime:Date = new Date();
}
*/

/*
function InitializeUIData():UIData {
    let charDatas:Array<CharData> = [
        new CharData("n1", 0),
        new CharData("n2", 0),
        new CharData("n3", 0),
        new CharData("n4", 0)
    ];
    return new UIData(charDatas, new MatchData(0, 0, new Date()))
}
*/

export default Home
