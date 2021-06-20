import React from 'react';
import { decode } from 'html-entities';

export default function QuestionStructure({totalNumber = 1, isPositiveOnly}){
    let quizStructure;

    if(totalNumber > 1){
        quizStructure = "N1";
        for(let i = 1; i<totalNumber; i++){
            quizStructure = quizStructure + " * N"+(i+1);
        }

        if(isPositiveOnly){
            quizStructure = quizStructure + decode(' &#8805; 0');
        }
        else{
            quizStructure = quizStructure + " = Any Value";
        }

    }
    else{
        quizStructure = "Undefined Data Structure.";
    }

    return(
        <span>{quizStructure}</span>
    )
}
