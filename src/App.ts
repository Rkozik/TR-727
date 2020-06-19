/// <reference path="./Sample.ts" />
/// <reference path="./Step.ts" />

namespace App{
    export class Application{
        step_samples_repo: StepSamplesRepo;
        step_delay: number;
        constructor() {
            this.step_samples_repo = new StepSamplesRepo();
            this.step_delay = 187.5;
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
                    let fourth = 1;
                    if(j < 5){
                        fourth = 1;
                    } else if(j>=5 && j<9){
                        fourth = 2;
                    } else if(j>=9 && j<13){
                        fourth = 3;
                    } else {
                        fourth = 4;
                    }
                    new_step.draw(new_track,fourth);
                }
                new_track.prepend(track_label);
                sequence_container.append(new_track);
                i++;
            }
        }

        sequence(){
            let self = this;
            for(let k=1;k<17;k++){
                // Highlight beat
                setTimeout(function () {
                    let l = 1;
                    for(let track in Tracks){
                        let this_step = <HTMLElement>document.getElementById("step_"+l+"_"+k);
                        this_step.classList.add('active');
                        setTimeout(function () {
                            this_step.classList.remove('active');
                        }, self.step_delay);

                        l++;
                    }
                }, self.step_delay * k);

                // Play beat
                setTimeout(function () {
                    let samples = self.step_samples_repo.get(k);
                    if(samples){
                        for(let l=0;l<samples.length;l++){
                            let audio = new Audio();
                            audio.src = "res/samples/"+samples[l].getFile();
                            audio.play().then();
                        }
                    }
                    if(k === 16){
                        self.sequence();
                    }
                }, self.step_delay * k)
            }
        }

        run(){
            this.bootstrap();
            this.sequence();
        }
    }
}