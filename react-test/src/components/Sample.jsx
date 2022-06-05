import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getSamples } from "../Services/sample-service";
import { play_sample } from "../Services/magenta-service";
import { download_sample } from "../Services/magenta-service";
import { likeSample } from "../Services/sample-service";

function Sample(props) {
    return (
        <Card sx={{display: 'flex'}}>
            <Box className={"SampleCard"} sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component="div" className={"SampleTitle"}>
                        {props.sample.name}
                    </Typography>
                    <Typography color="text.secondary" component="div" className={"SampleAuthor"}>
                        Mac Miller
                    </Typography>
                </CardContent>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton aria-label="play/pause" onClick={async () => {
                        await play_sample(props.sample)
                    }}>
                        <PlayArrowIcon sx={{height: 38, width: 38}}/>
                    </IconButton>
                    <IconButton aria-label="download" onClick={async () => {
                        await download_sample(props.sample)
                    }}>
                        <DownloadIcon sx={{height: 38, width: 38}}/>
                    </IconButton>
                    <IconButton aria-label="like" onClick={async () => {
                        await likeSample(props.sample).then(() => getSamples())
                    }}>
                        <ThumbUpIcon sx={{height: 28, width: 28}}/>
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}

export default Sample
