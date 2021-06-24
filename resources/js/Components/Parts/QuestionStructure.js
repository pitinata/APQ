import React from 'react';
import { decode } from 'html-entities';

export default function QuestionStructure({totalNumber = 1, isPositiveOnly, max}){
    let quizStructure;

    if(max && totalNumber>max){
        quizStructure = (<div className="text-gray-200">Exceeded maximum number</div>);
    }
    else if(totalNumber > 1){
        quizStructure = "N1";
        for(let i = 1; i<totalNumber; i++){
            quizStructure = quizStructure + " * N"+(i+1);
        }

        if(isPositiveOnly){
            quizStructure = quizStructure + decode(' &#8805; 0');
        }
        else{
            quizStructure = quizStructure + " = Any";
        }

    }
    else{
        quizStructure = (<div className="text-gray-200">N/A</div>);
    }

    return(
        <span>
             { quizStructure }
        </span>

    )
}
