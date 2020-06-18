/// <reference path="./Samples/Sample.ts" />
/// <reference path="./Step.ts" />

namespace App{
    export class Application{
        step_samples_repo: StepSamplesRepo;
        constructor() {
            this.step_samples_repo = new StepSamplesRepo();
        }

        bootstrap(){
            let sequences = document.createElement('div');
            sequences.id = "sequence-container";
            document.body.append(sequences);

            let sequence_container = <Element>document.getElementById('sequence-container');


            // Construct a 16 beat sequence for each track
            let i=1;
            for(let track in Tracks){
                let new_track = document.createElement('div');
                new_track.className = "track";

                // @ts-ignore
                let track_name = Tracks[track];
                let track_label = document.createElement('p');
                track_label.innerText = track_name;

                for(let j=1; j<17; j++){
                    let new_step = new Step(i, j, track_name, this.step_samples_repo);
                    new_step.draw(new_track);
                }
                new_track.prepend(track_label);
                sequence_container.append(new_track);
                i++;
            }
        }

        sequence(){
            let self = this;
            for(let k=1;k<17;k++){
                setTimeout(function () {
                    let samples = self.step_samples_repo.get(k);
                    if(samples){
                        for(let l=0;l<samples.length;l++){
                            new Audio("res/samples/"+samples[l].getFile()).play();
                        }
                    }
                    if(k === 16){
                        self.sequence();
                    }
                }, 187.5 * k)
            }
        }

        run(){
            this.bootstrap();
            this.sequence();
        }
    }
}