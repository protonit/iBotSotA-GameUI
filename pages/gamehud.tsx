import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import hudStyles from '../styles/Hud.module.css'
import React from 'react';
import {tSArrayType} from '@babel/types';

const Home: NextPage = () => {
  if(global.window) {
    var wndAny:any = window;
    wndAny.HelloWorld = function (stringValue:string, numberValue:number) {
      alert("kukka " + stringValue + " " + numberValue);
    }
  }
  return (
    <div className={hudStyles.screen}>
          <div  className={hudStyles.topRow}>
              <CharInfo cardPosStyle={hudStyles.card1Pos}>Char #1</CharInfo>
              <CharInfo cardPosStyle={hudStyles.card2Pos}>Char #2</CharInfo>
            <div className={[hudStyles.chamberInfo, hudStyles.chamberPos].join(' ')}>Chamber Data</div>
              <CharInfo cardPosStyle={hudStyles.card3Pos}>Char #3</CharInfo>
              <CharInfo cardPosStyle={hudStyles.card4Pos}>Char #4</CharInfo>
          </div>
          <div className={hudStyles.gameArea}>GAMEAREA</div>
          <div className={hudStyles.bottomRow}>
              <BottomInfo posStyles={[hudStyles.bottomInfo, hudStyles.bottomInfo1Pos]}>Bottom left</BottomInfo>
              <BottomInfo posStyles={[hudStyles.bottomMid, hudStyles.bottomMidPos]}>Bottom mid</BottomInfo>
              <BottomInfo posStyles={[hudStyles.bottomInfo, hudStyles.bottomInfo2Pos]}>Bottom right</BottomInfo>
          </div>
    </div>
  )
}

class CharInfo extends React.Component<{readonly cardPosStyle:any}> {

    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <div className={[hudStyles.charInfo, this.props.cardPosStyle].join(' ')}>{this.props.children}</div>
        );
    }
}

class BottomInfo extends React.Component<{readonly posStyles:any}> {
    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.posStyles.join(' ')}>{this.props.children}</div>
        );
    }
}

export default Home
