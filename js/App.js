"use strict";
var App;
(function (App) {
    var Sample = (function () {
        function Sample(file, name) {
            this.file = file;
            this.name = name;
        }
        Sample.prototype.getFile = function () {
            return this.file;
        };
        Sample.prototype.getName = function () {
            return this.name;
        };
        return Sample;
    }());
    App.Sample = Sample;
    var Tracks;
    (function (Tracks) {
        Tracks["LOWBONGO"] = "Low Bongo";
        Tracks["HIGHBONGO"] = "High Bongo";
        Tracks["LOWCONGA"] = "Low Conga";
        Tracks["HIGHCONGAMUTE"] = "High Conga Mute";
        Tracks["HIGHCONGAOPEN"] = "High Conga Open";
        Tracks["HIGHTIMBALE"] = "High TimBale";
        Tracks["LOWTIMBALE"] = "Low TimBale";
        Tracks["QUIJADA"] = "Quijada";
        Tracks["CABASA"] = "Cabasa";
        Tracks["MARACAS"] = "Maracas";
        Tracks["STARCHIME"] = "Star Chime";
        Tracks["LONGWHISTLE"] = "Long Whistle";
        Tracks["SHORTWHISTLE"] = "Short Whistle";
    })(Tracks = App.Tracks || (App.Tracks = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Step = (function () {
        function Step(row, position, track, steps_repo) {
            this.row = row;
            this.position = position;
            this.track = track;
            this.steps_repo = steps_repo;
            this.enabled = false;
            this.enableEvents();
        }
        Step.prototype.getPosition = function () {
            return this.position;
        };
        Step.prototype.getRow = function () {
            return this.row;
        };
        Step.prototype.draw = function (container, fourth) {
            var step = document.createElement('div');
            step.className = "step";
            step.id = "step_" + this.row + "_" + this.position;
            if (fourth % 2) {
                step.classList.add('even-fourth');
            }
            container.append(step);
        };
        Step.prototype.getDomElement = function () {
            return document.getElementById("step_" + this.row + "_" + this.position);
        };
        Step.prototype.handleClick = function () {
            var self = this;
            this.getDomElement().addEventListener('click', function () {
                var name = self.track;
                var file = self.track + ".WAV";
                var sample = new App.Sample(file, name);
                if (!self.enabled) {
                    self.steps_repo.add(self.position, sample);
                    self.enabled = true;
                    self.getDomElement().classList.add("step-enabled");
                    console.log(self.getDomElement());
                }
                else {
                    self.steps_repo.remove(self.position, sample);
                    self.enabled = false;
                    self.getDomElement().classList.remove("step-enabled");
                }
            });
        };
        Step.prototype.enableEvents = function () {
            var self = this;
            var check_for_dom = setInterval(function () {
                if (self.getDomElement() !== null) {
                    self.handleClick();
                    clearInterval(check_for_dom);
                }
            }, 1000);
        };
        return Step;
    }());
    App.Step = Step;
})(App || (App = {}));
var App;
(function (App) {
    var Application = (function () {
        function Application() {
            this.step_samples_repo = new App.StepSamplesRepo();
            this.step_delay = 187.5;
        }
        Application.prototype.bootstrap = function () {
            var sequences = document.createElement('div');
            sequences.id = "sequence-container";
            document.body.append(sequences);
            var sequence_container = document.getElementById('sequence-container');
            var i = 1;
            for (var track in App.Tracks) {
                var new_track = document.createElement('div');
                new_track.className = "track";
                var track_name = App.Tracks[track];
                var track_label = document.createElement('p');
                track_label.innerText = track_name;
                for (var j = 1; j < 17; j++) {
                    var new_step = new App.Step(i, j, track_name, this.step_samples_repo);
                    var fourth = 1;
                    if (j < 5) {
                        fourth = 1;
                    }
                    else if (j >= 5 && j < 9) {
                        fourth = 2;
                    }
                    else if (j >= 9 && j < 13) {
                        fourth = 3;
                    }
                    else {
                        fourth = 4;
                    }
                    new_step.draw(new_track, fourth);
                }
                new_track.prepend(track_label);
                sequence_container.append(new_track);
                i++;
            }
        };
        Application.prototype.sequence = function () {
            var self = this;
            var _loop_1 = function (k) {
                setTimeout(function () {
                    var l = 1;
                    var _loop_2 = function (track) {
                        var this_step = document.getElementById("step_" + l + "_" + k);
                        this_step.classList.add('active');
                        setTimeout(function () {
                            this_step.classList.remove('active');
                        }, self.step_delay);
                        l++;
                    };
                    for (var track in App.Tracks) {
                        _loop_2(track);
                    }
                }, self.step_delay * k);
                setTimeout(function () {
                    var samples = self.step_samples_repo.get(k);
                    if (samples) {
                        for (var l = 0; l < samples.length; l++) {
                            var audio = new Audio();
                            audio.src = "res/samples/" + samples[l].getFile();
                            audio.play().then();
                        }
                    }
                    if (k === 16) {
                        self.sequence();
                    }
                }, self.step_delay * k);
            };
            for (var k = 1; k < 17; k++) {
                _loop_1(k);
            }
        };
        Application.prototype.run = function () {
            this.bootstrap();
            this.sequence();
        };
        return Application;
    }());
    App.Application = Application;
})(App || (App = {}));
var App;
(function (App) {
    var StepSamplesRepo = (function () {
        function StepSamplesRepo() {
            this.steps_repo = new Map();
        }
        StepSamplesRepo.prototype.add = function (step_number, sample) {
            var step = this.steps_repo.get(step_number);
            if (step) {
                if (step.filter(function (e) { return e.name === sample.getName(); }).length === 0) {
                    step.push(sample);
                    this.steps_repo.set(step_number, step);
                }
            }
            else {
                this.steps_repo.set(step_number, [sample]);
            }
        };
        StepSamplesRepo.prototype.remove = function (step_number, sample) {
            var step = this.steps_repo.get(step_number);
            if (step && step.filter(function (e) { return e.name === sample.getName(); }).length > 0) {
                step.splice(step.findIndex(function (x) { return x.name === sample.getName(); }), 1);
                if (step.length !== 0) {
                    this.steps_repo.set(step_number, step);
                }
                else {
                    this.steps_repo.delete(step_number);
                }
            }
        };
        StepSamplesRepo.prototype.get = function (step_number) {
            return this.steps_repo.get(step_number);
        };
        return StepSamplesRepo;
    }());
    App.StepSamplesRepo = StepSamplesRepo;
})(App || (App = {}));
var App;
(function (App) {
    var Tempo = (function () {
        function Tempo() {
            this.beats_per_minute = 120;
        }
        Tempo.prototype.getBeatsPerMinute = function () {
            return this.beats_per_minute;
        };
        Tempo.prototype.increaseBeatsPerMinute = function () {
            if (this.beats_per_minute < TempoRange.MAXIMUM) {
                this.beats_per_minute++;
            }
        };
        Tempo.prototype.decreaseBeatsPerMinute = function () {
            if (this.beats_per_minute > TempoRange.MINIMUM) {
                this.beats_per_minute--;
            }
        };
        return Tempo;
    }());
    App.Tempo = Tempo;
    var TempoRange;
    (function (TempoRange) {
        TempoRange[TempoRange["MINIMUM"] = 1] = "MINIMUM";
        TempoRange[TempoRange["MAXIMUM"] = 255] = "MAXIMUM";
    })(TempoRange = App.TempoRange || (App.TempoRange = {}));
})(App || (App = {}));
//# sourceMappingURL=App.js.map