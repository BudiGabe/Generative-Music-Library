import * as mm from "@magenta/music";
import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {saveSample} from "../Services/sample-service";
import {getSamplesTop} from "../Services/sample-service";
import {likeSample} from "../Services/sample-service";

async function Sample() {
    let music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
    music_rnn.initialize();
    let music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
    music_vae.initialize();
    const JUMP_SONG = {
        name: "abcd",
        notes: [
            {pitch: 62, startTime: 0.5, endTime: 0.75},
            {pitch: 64, startTime: 1.25, endTime: 1.5},
            {pitch: 60, startTime: 2.0, endTime: 2.25},
            {pitch: 60, startTime: 2.75, endTime: 3.0},
            {pitch: 62, startTime: 3.25, endTime: 3.5},
            {pitch: 62, startTime: 3.75, endTime: 4.5},
            {pitch: 64, startTime: 4.5, endTime: 4.75},
            {pitch: 60, startTime: 5.25, endTime: 5.5},
            {pitch: 57, startTime: 5.75, endTime: 6.25},
            {pitch: 55, startTime: 6.25, endTime: 6.75},
            {pitch: 55, startTime: 6.75, endTime: 8.0},
        ],
        totalTime: 8
    };
    const TWINKLE_TWINKLE = {
        name: "test",
        notes: [
            {pitch: 60, startTime: 0.0, endTime: 0.5},
            {pitch: 60, startTime: 0.5, endTime: 1.0},
            {pitch: 67, startTime: 1.0, endTime: 1.5},
            {pitch: 67, startTime: 1.5, endTime: 2.0},
            {pitch: 69, startTime: 2.0, endTime: 2.5},
            {pitch: 69, startTime: 2.5, endTime: 3.0},
            {pitch: 67, startTime: 3.0, endTime: 4.0},
            {pitch: 65, startTime: 4.0, endTime: 4.5},
            {pitch: 65, startTime: 4.5, endTime: 5.0},
            {pitch: 64, startTime: 5.0, endTime: 5.5},
            {pitch: 64, startTime: 5.5, endTime: 6.0},
            {pitch: 62, startTime: 6.0, endTime: 6.5},
            {pitch: 62, startTime: 6.5, endTime: 7.0},
            {pitch: 60, startTime: 7.0, endTime: 8.0},
        ],
        totalTime: 8
    };
    const player = new mm.Player()

    function play_sample(sample) {
        if (player.isPlaying()) {
            player.stop()
        } else {
            player.start(sample);
        }
    }

    function continue_sample(sample, rnn_steps, rnn_temperature) {
        const qns = mm.sequences.quantizeNoteSequence(sample, 4);

        let continueSample =
            music_rnn.continueSequence(qns, rnn_steps, rnn_temperature)
                .then((sample) => {
                    return sample;
                });
        return continueSample;
        //console.log(continueSample);
        // player.start(continueSample);
        //console.log("test");
    }

    function download_sample(sample) {

        const sample1 = mm.sequences.quantizeNoteSequence(sample, 4);
        sample1.notes.forEach(n => n.velocity = 80)
        const midi = mm.sequenceProtoToMidi(sample1);
        const file = new Blob([midi], {type: 'audio/midi'});

        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'interp.mid';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    async function continue_sample_2(sample, rnn_steps, rnn_temperature) {
        let sampl = await continue_sample(sample, rnn_steps, rnn_temperature);
        //continue_sample(sample,rnn_steps,rnn_temperature);
        //sampl=mm.sequences.quantizeNoteSequence(sampl,4);
        player.start(sampl);
        //console.log(sampl);
    }


    function combine_sample(sample1, sample2, percentage) {

        const numInterpolations = 11;
        const track1 = mm.sequences.quantizeNoteSequence(sample1, 4);
        const track2 = mm.sequences.quantizeNoteSequence(sample2, 4);
        //const star = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
        //const jump = mm.sequences.quantizeNoteSequence(JUMP_SONG, 4);
        //const ascending = mm.sequences.quantizeNoteSequence(ASCENDING_DESCENDING, 4);

        let interpolatedMelodies =
            music_vae.interpolate([track1, track2], numInterpolations)
                .then((samples) => {
                    // return samples[numInterpolations/2];
                    return samples[percentage];
                });
        return interpolatedMelodies;
    }

    const theme = useTheme();
    let samples = await getSamplesTop();
    console.log(samples);
    return (
        samples.map((sample)=>
            <Card sx={{display: 'flex'}}>
                <Box className={"SampleCard"} sx={{display: 'flex', flexDirection: 'column'}}>
                    <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" className={"SampleTitle"}>
                            sample.name
                        </Typography>
                        <Typography color="text.secondary" component="div" className={"SampleAuthor"}>
                            Test
                        </Typography>
                    </CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton aria-label="play/pause"  onClick={() => {
                            play_sample(sample)
                        }}>
                            <PlayArrowIcon sx={{height: 38, width: 38}}/>
                        </IconButton>
                        <IconButton aria-label="download"  onClick={() => {
                            download_sample(sample)
                        }}>
                            <DownloadIcon sx={{height: 38, width: 38}}/>
                        </IconButton>
                        <IconButton aria-label="like"  onClick={() => {
                            likeSample(sample.id)
                        }}>
                            <ThumbUpIcon sx={{height: 28, width: 28}}/>
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        )
    );
}

export default Sample