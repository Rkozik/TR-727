declare namespace App {
    class Sample {
        file: string;
        name: string;
        constructor(file: string, name: string);
        getFile(): string;
        getName(): string;
    }
    enum Tracks {
        LOWBONGO = "Low Bongo",
        HIGHBONGO = "High Bongo",
        LOWCONGA = "Low Conga",
        HIGHCONGAMUTE = "High Conga Mute",
        HIGHCONGAOPEN = "High Conga Open",
        HIGHTIMBALE = "High TimBale",
        LOWTIMBALE = "Low TimBale",
        QUIJADA = "Quijada",
        CABASA = "Cabasa",
        MARACAS = "Maracas",
        STARCHIME = "Star Chime",
        LONGWHISTLE = "Long Whistle",
        SHORTWHISTLE = "Short Whistle"
    }
}
declare namespace App {
    class Step {
        row: number;
        position: number;
        track: Tracks;
        steps_repo: StepSamplesRepo;
        enabled: boolean;
        constructor(row: number, position: number, track: Tracks, steps_repo: StepSamplesRepo);
        getPosition(): number;
        getRow(): number;
        draw(container: HTMLElement, fourth: number): void;
        getDomElement(): Element;
        handleClick(): void;
        enableEvents(): void;
    }
}
declare namespace App {
    class Application {
        step_samples_repo: StepSamplesRepo;
        step_delay: number;
        constructor();
        bootstrap(): void;
        sequence(): void;
        run(): void;
    }
}
declare namespace App {
    class StepSamplesRepo {
        steps_repo: Map<number, Array<Sample>>;
        constructor();
        add(step_number: number, sample: Sample): void;
        remove(step_number: number, sample: Sample): void;
        get(step_number: number): Sample[] | undefined;
    }
}
declare namespace App {
    class Tempo {
        beats_per_minute: number;
        constructor();
        getBeatsPerMinute(): number;
        increaseBeatsPerMinute(): void;
        decreaseBeatsPerMinute(): void;
    }
    enum TempoRange {
        MINIMUM = 1,
        MAXIMUM = 255
    }
}
