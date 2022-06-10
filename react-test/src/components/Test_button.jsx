import React from 'react';
import {upload_sample} from "../Services/magenta-service";
import {play_sample} from "../Services/magenta-service";

function Test_button(){

    //return upload_sample("testare.mid");
    return(
        <button type="button" value="testare" onClick={() => {
           console.log(upload_sample("testare.mid"));
        }}>
            Testare
        </button>
    )
}

export default Test_button