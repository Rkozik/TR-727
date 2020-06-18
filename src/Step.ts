/// <reference path="./Samples/Sample.ts" />


namespace App{

    export class Step{
        row: number;
        position: number;
        track: Tracks;
        steps_repo: StepSamplesRepo;
        enabled: boolean;

        constructor(row: number, position: number, track: Tracks, steps_repo: StepSamplesRepo) {
            this.row = row;
            this.position = position;
            this.track = track;
            this.steps_repo = steps_repo;
            this.enabled = false;

            this.enableEvents();
        }

        getPosition(){
            return this.position;
        }

        getRow(){
            return this.row;
        }

        draw(container: HTMLElement){
            let step = document.createElement('div');
            step.className = "step";
            step.id = "step_" + this.row + "_" + this.position;
            container.append(step);
        }

        getDomElement(){
            return <Element>document.getElementById("step_" + this.row + "_" + this.position);
        }

        handleClick(){
            let self = this;
            this.getDomElement().addEventListener('click', function () {
                let name = self.track;
                let file = self.track + ".WAV";
                let sample = new Sample(file, name);
                if(!self.enabled){
                    self.steps_repo.add(self.position, sample);
                    self.enabled = true;
                    self.getDomElement().classList.add("step-enabled");
                } else {
                    self.steps_repo.remove(self.position, sample);
                    self.enabled = false;
                    self.getDomElement().classList.remove("step-enabled");
                }
            });
        }

        enableEvents(){
            let self = this;
            let check_for_dom = setInterval(function () {
                if(self.getDomElement() !== null){
                    self.handleClick();
                    clearInterval(check_for_dom);
                }
            }, 1000);
        }
    }
}