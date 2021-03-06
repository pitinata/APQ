import React from 'react';

export default function NumberValue({digitPerNumber, isMixDigit, max}){
    let text;

    if(max && digitPerNumber > max){
        text = (<div className="text-gray-200">Exceeded maximum number</div>);
    }
    else if(digitPerNumber > 0){
        text = (isMixDigit ? '1' : Math.pow(10, digitPerNumber-1))+"-"+(Math.pow(10, digitPerNumber)-1);
    }
    else{
        text = (<div className="text-gray-200">N/A</div>);
    }
    return(
        <span>
            { text }
        </span>
    )
}
