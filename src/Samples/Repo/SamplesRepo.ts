/// <reference path="../Sample.ts" />

namespace App{
    export class SamplesRepo{
        sample_repo: Map<Tracks, Sample>;

        constructor() {
            this.sample_repo = new Map<Tracks, Sample>();
        }

        add(name: Tracks, sample: Sample){
            this.sample_repo.set(name, sample);
        }

        remove(name: Tracks){
            this.sample_repo.delete(name);
        }

        get(name: Tracks){
            return this.sample_repo.get(name);
        }

        getAll(){
            return this.sample_repo;
        }
    }
}