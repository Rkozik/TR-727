namespace App{
    export class Tempo{
        beats_per_minute: number;

        constructor() {
            this.beats_per_minute = 120;
        }

        getBeatsPerMinute(){
            return this.beats_per_minute;
        }

        increaseBeatsPerMinute(){
            if(this.beats_per_minute < TempoRange.MAXIMUM){
                this.beats_per_minute++;
            }
        }

        decreaseBeatsPerMinute(){
            if(this.beats_per_minute > TempoRange.MINIMUM){
                this.beats_per_minute--;
            }
        }
    }

    export enum TempoRange {
        MINIMUM = 1,
        MAXIMUM = 255
    }
}