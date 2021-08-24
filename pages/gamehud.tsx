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

const Home: NextPage = () => {
    let hudRef:any = <HudUI uiData={new UIData()} />;
    useEffect(() => {
        let wndAny:any = global.window;
        wndAny.UpdateUI = function (uiData:UIData) {
            ReactDOM.render(<HudUI uiData={uiData} />, document.getElementById('__next'));
        }
    }, []);
  return hudRef;
}

function callout() {
    if(typeof window !== 'undefined') {
        var rootElement = document.getElementById('__next');
        console.log(rootElement);
        var uiData = new UIData();
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
                width: "33.3%"
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

        return (
            <div className={hudStyles.screen}>
                <div  className={hudStyles.topRow}>
                    {
                        _.times(4, (i:number) => {
                            const posStyle = charPosLeftArr[i];
                            return <CharInfo key={i} cardPosStyle={{left: posStyle}}><PercentageBar width={87} percentage={this.props.uiData.CharDatas[i].Health}/></CharInfo>;
                        })
                    }
                    <MatchInfo cardPosStyle={{left: "40%"}} matchData={this.props.uiData.MatchData}>Match Data</MatchInfo>
                </div>
                <div className={hudStyles.gameArea}>GAMEAREA</div>
                <div className={hudStyles.bottomRow}>
                    {
                        _.times(3, (i:number) => {
                            const posStyle = bottomPosStyleArr[i];
                            return <BottomInfo key={i} cardPosStyle={posStyle}>Bottom {i}</BottomInfo>
                        })
                    }
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
                  percent={this.props.percentage * 100}
                  width={this.props.width}
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

class CharInfo extends React.Component<{readonly cardPosStyle:any}> {

    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <div style={this.props.cardPosStyle} className={hudStyles.charInfo}>{this.props.children}</div>
        );
    }
}

class MatchInfo extends React.Component<{readonly cardPosStyle:any, readonly matchData:MatchData}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        const md = this.props.matchData;
        const formattedTime = (moment(md.MatchTime)).format("mm:ss");
        return (
          <div style={this.props.cardPosStyle} className={hudStyles.matchInfo}>Chamber {md.CurrentChamber} / {md.ChamberCount}<br/>{formattedTime}</div>
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

class UIData {
    public CharDatas: Array<CharData> = [
        new CharData(),
        new CharData(),
        new CharData(),
        new CharData(),
    ];
    public MatchData: MatchData = new MatchData();
}

class CharData {
    public Name:string = "";
    public Health:number = 0.99;
}

class ChamberData {
    public ChamberTime:Date = new Date();
}

class MatchData {
    public CurrentChamber:number = 0;
    public ChamberCount:number = 0;
    public MatchTime:Date = new Date();
}

export default Home
