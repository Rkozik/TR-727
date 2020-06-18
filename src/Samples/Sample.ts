
namespace App{
    export class Sample{
        file: string;
        name: string;

        constructor(file: string, name: string) {
            this.file = file;
            this.name = name;
        }

        getFile(){
            return this.file;
        }

        getName(){
            return this.name;
        }

        // TODO: Implement parameters e.g. decay, attack, etc.
    }

    export enum Tracks{
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