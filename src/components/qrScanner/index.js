import React from 'react';
import "./QrReader.css";

const QrReader = ({handleClickAdvanced, display}) =>{

    return(
        <>
            <div className="qr-parent bg">
                <div className={display?"d-none":'qr-reader-container'}>
                    <div id="reader" style={{width:"300px"}}/>
                </div>
                <button className='button-styles' onClick={()=>handleClickAdvanced()} 
                    style={display?{visibility:"visible"}:{display:"none"}}
                    >
                        Scan
                </button>
            </div>
        </>
    )
}

export default QrReader;