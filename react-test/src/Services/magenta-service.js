import * as mm from '@magenta/music'

const STEPS_PER_QUARTER = 24;
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

function upload_sample(file, doneCallback, failCallback) {
    let reader = new FileReader();
    reader.onerror = e => {
        failCallback('Unable to read MIDI file.');
    }
    reader.onload = e => {
        let seq;
        try {
            seq = mm.midiToSequenceProto(reader.result);
        } catch(e) {
            failCallback('Unable to parse MIDI file.');
            return;
        }

        let quantizedSeq;
        try {
            quantizedSeq = mm.sequences.quantizeNoteSequence(seq, STEPS_PER_QUARTER);
        } catch(e) {
            failCallback('Unable to quantize MIDI file, possibly due to tempo or time signature changes.');
            return;
        }

        const quartersPerBar = 4 *  quantizedSeq.timeSignatures[0].numerator / quantizedSeq.timeSignatures[0].denominator;
        if (quartersPerBar !== 4) {
            failCallback('Time signatures other than 4/4 not supported.');
            return;
        }

        if (quantizedSeq.totalQuantizedSteps > 4 * STEPS_PER_QUARTER) {
            failCallback('Imported MIDI file must be a single bar.');
            return;
        }

        music_vae.encode([quantizedSeq])
            .then(z => {
                z.data().then(zArray => {
                    z.dispose();
                    doneCallback(zArray);
                    //return z; //am adaugat eu asta, nush daca e bine
                });
            });
        //return result;
    }

    reader.readAsBinaryString(file);
    return doneCallback;
}

export {combine_sample,play_sample,download_sample,continue_sample,upload_sample}