import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import hudStyles from '../styles/Hud.module.css'

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
            <div className={[hudStyles.charInfo, hudStyles.card1Pos].join(' ')}>Char #1 Data</div>
            <div className={[hudStyles.charInfo, hudStyles.card2Pos].join(' ')}>Char #2 Data</div>
            <div className={[hudStyles.chamberInfo, hudStyles.chamberPos].join(' ')}>Chamber Data</div>
            <div className={[hudStyles.charInfo, hudStyles.card3Pos].join(' ')}>Char #3 Data</div>
            <div className={[hudStyles.charInfo, hudStyles.card4Pos].join(' ')}>Char #4 Data</div>
          </div>
          <div className={hudStyles.gameArea}>GAMEAREA</div>
          <div className={hudStyles.bottomRow}>
            <div className={[hudStyles.bottomInfo, hudStyles.bottomInfo1Pos].join(' ')}>Bottom left </div>
            <div className={[hudStyles.bottomMid, hudStyles.bottomMidPos].join(' ')}>Bottom Mid</div>
            <div className={[hudStyles.bottomInfo, hudStyles.bottomInfo2Pos].join(' ')}>Bottom Right</div>
          </div>
    </div>
  )
}

export default Home
