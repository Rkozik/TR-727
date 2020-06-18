namespace App{
    export class StepSamplesRepo{
        steps_repo: Map<number, Array<Sample>>;
        constructor() {
            this.steps_repo = new Map<number, Array<Sample>>()
        }

        add(step_number: number, sample: Sample){
            let step = this.steps_repo.get(step_number);
            if(step){
                if(step.filter(e => e.name === sample.getName()).length === 0) {
                    step.push(sample);
                    this.steps_repo.set(step_number, step);
                }
            } else {
                this.steps_repo.set(step_number, [sample]);
            }
        }

        remove(step_number: number, sample: Sample){
            let step = this.steps_repo.get(step_number);
            if(step && step.filter(e => e.name === sample.getName()).length > 0){
                // @ts-ignore
                step.splice(step.findIndex(x => x.name === sample.getName()), 1);
                if(step.length !== 0){
                    this.steps_repo.set(step_number, step);
                } else {
                    this.steps_repo.delete(step_number);
                }
            }
        }

        get(step_number: number){
            return this.steps_repo.get(step_number);
        }
    }
}