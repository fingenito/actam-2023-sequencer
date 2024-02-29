import * as Tone from "tone";

class Sequencer{
  static players;
  static kits;
  static instruments;
  static rows;
  static subdivisions;

  // static pitchShifts;
  // static phasers;
  // static delays;
  // static reverbs;
  // static gains;
  // static masterVolume;

  // Initializes variables
  static initSequencer(){
    // this.players = new Map();
    // this.kits = ['808', 'hiphop', '8bit'];
    this.instruments = ['kick','hihat','snare', 'openhat', 'perc']; /* Add clap/other sounds? */
    // this.subdivisions = ['4', '8', '16']
    this.rows = this.makeGrid(this.instruments);

    // Initializes effects
    // this.configFX();
    //
    // // Initializes kit
    // this.loadKit(this.kits[0]);
  }

  // Loads kit based on selection
  // static loadKit(kit){
  //   // console.log('loadKit',kit)
  //   this.instruments.forEach((instr, index) => {
  //     this.players.set(instr, new Tone.Player("src/assets/samples/" + kit + "/" + instr + ".wav").chain(this.pitchShifts[index], this.phasers[index], this.delays[index], this.reverbs[index], this.gains[index], this.masterVolume, Tone.Destination));
  //   })
  //   // console.log('players',this.players)
  //
  // }

  // Creates rows of buttons
  static makeGrid (instruments){
    // console.log('makeGrid',instruments)

    const rows = []

    for (const instr in instruments) {
      // console.log('instr', instruments[instr])
      const row = {
        instrument : instruments[instr],
        buttons : []
      }
      for (let i = 0; i < 8; i++) {
        row.buttons.push({
          id: instruments[instr],
          isActive: false
        });
      }
      rows.push(row);
    }
    return rows;
  };

  // Initializes effects
  static configFX(numInstr){
    const pitchShifts = [];
    const phasers = [];
    const delays = [];
    const reverbs = [];
    const gains = [];
    // this.volumes = [];
    const masterVolume = new Tone.Volume(0)

    for(let i = 0; i < numInstr; i++){
      const ps = new Tone.PitchShift();
      const phaser = new Tone.Phaser({
        frequency: 0.5, // phasing speed (in hertz)
        octaves: 2, // octaves of the effect (must be >= 0)
        baseFrequency: 1000 // base filter frequency
      });
      const delay = new Tone.FeedbackDelay("8n", 0.3);
      const rev = new Tone.JCReverb(0.4);
      const gain = new Tone.Gain();


      ps.pitch = 0;
      phaser.wet.value = 0;
      delay.wet.value = 0;
      rev.wet.value = 0;

      pitchShifts.push(ps);
      phasers.push(phaser);
      delays.push(delay);
      reverbs.push(rev);
      gains.push(gain);

    }
    return [pitchShifts, delays, reverbs, phasers, gains]
  }

  // Toggles button in position (row, col)
  static toggle(row, col, value){
    this.rows[row].buttons[col].isActive = value
  }

  // Returns this.rows
  static getRows(){
    return this.rows
  }

  // Returns this.kits
  static getKits(){
    // console.log('getKits', this.kits)
    return this.kits
  }

  // Returns this.subdivisions
  static getSubdivisions(){
    // console.log('getSubdivisions', this.subdivisions)
    return this.subdivisions
  }

  // Returns this.players
  static getPlayers(){
    // console.log('getPlayers', this.players)
    return this.players
  }

  // Starts loop
  static createLoop(time, beat) {
    this.rows.forEach((row,index) => {
      const instrument = this.players.get(row.instrument)
      const active = row.buttons[beat].isActive
      if(active){
        // console.log('createLoop beat', beat)
        instrument.start(time + 0.05, 0, '4n')
      }
    })
  };
}
export default Sequencer
