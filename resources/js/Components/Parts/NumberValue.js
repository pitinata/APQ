import React from 'react';

export default function NumberValue({digitPerNumber = 1, isMixDigit}){
    return(
        <span>
        { isMixDigit ? '1' : Math.pow(10, digitPerNumber-1) }
        -
        { Math.pow(10, digitPerNumber)-1 }
        </span>
    )
}
