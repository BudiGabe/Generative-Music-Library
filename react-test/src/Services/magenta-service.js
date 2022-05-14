import * as mm from '@magenta/music'

let music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
let Player = new mm.Player();
music_vae.initialize();
let music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
music_rnn.initialize();

function combine_sample(sample1, sample2, percentage){

    const numInterpolations=11;
    const track1 = mm.sequences.quantizeNoteSequence(sample1, 4);
    const track2 = mm.sequences.quantizeNoteSequence(sample2, 4);
    //const star = mm.sequences.quantizeNoteSequence(TWINKLE_TWINKLE, 4);
    //const jump = mm.sequences.quantizeNoteSequence(JUMP_SONG, 4);
    //const ascending = mm.sequences.quantizeNoteSequence(ASCENDING_DESCENDING, 4);

    let interpolatedMelodies =
        music_vae.interpolate([track1,track2],numInterpolations)
            .then((samples) =>{
       // return samples[numInterpolations/2];
                return samples[percentage];
    });
    return interpolatedMelodies;
}

function continue_sample(sample,rnn_steps,rnn_temperature){
    const qns = mm.sequences.quantizeNoteSequence(sample, 4);

    let continueSample =
        music_rnn.continueSequence(qns,rnn_steps,rnn_temperature)
            .then((sample) => {
                return sample;
                });
    return continueSample;
}

function play_sample(sample){
    if(Player.isPlaying()){
        Player.stop()
    }
    else
    {
        Player.start(sample);
    }
}

function download_sample(sample){

    const sample1=mm.sequences.quantizeNoteSequence(sample,4);
    sample1.notes.forEach(n => n.velocity=80)
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

export {combine_sample,play_sample,download_sample,continue_sample}