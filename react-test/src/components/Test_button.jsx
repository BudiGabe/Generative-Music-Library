import React from 'react';
import {upload_sample} from "../Services/magenta-service";
import {play_sample} from "../Services/magenta-service";
import {Button} from "@mui/material";

function Test_button(){

    //return upload_sample("testare.mid");
    return(
        <Button onClick={() => {
         //   console.log(upload_sample("testare.mid"));
        }}>

        </Button>
    )
}

export default Test_button