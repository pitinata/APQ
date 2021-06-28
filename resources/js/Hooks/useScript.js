import {useEffect} from 'react';

export default function useScript(url, classItemToShow = null){
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        if(classItemToShow != null){
            const itemToShow = document.querySelector('.'+classItemToShow);
            if(itemToShow != null){
                itemToShow.style.visibility = 'visible';
            }
        }


        return () =>{
            document.body.removeChild(script);

            if(classItemToShow != null){
                const itemToShow = document.querySelector('.'+classItemToShow);
                if(itemToShow != null){
                    itemToShow.style.visibility = 'hidden';
                }
            }
        }
    }, [url]);
};

