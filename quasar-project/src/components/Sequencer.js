import * as Tone from "tone";

class Sequencer{
  static players;
  static kits;
  static seqInstruments;
  static rows;
  static subdivisions;

  // Initializes variables
  static initSequencer(){
    // this.players = new Map();
    // this.kits = ['808', 'hiphop', '8bit'];
    // this.instruments = ['kick','hihat','snare', 'openhat', 'perc']; /* Add clap/other sounds? */
    this.seqInstruments = ['kick','hihat','snare', 'openhat'];
    // this.subdivisions = ['4', '8', '16']
    this.rows = this.makeGrid(this.seqInstruments);

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

  // Disposes players
  // static disposePlayers(players) {
  //   // Dispose of all players
  //   for (const player in players._players) {
  //     if (players._players.hasOwnProperty(player)) {
  //       players._players[player].dispose();
  //     }
  //   }
  //   // Clear the players object
  //   players.dispose();
  // }

  // Initializes effects
  static configFX(numInstr){
    const pitchShifts = [];
    const phasers = [];
    const delays = [];
    const reverbs = [];
    const gains = [];

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

  // static configPlayers(players, instruments, previousKit, kit, pitchShifts, phasers, delays, reverbs, gains, mainVolume, init) {
  //   if (init === 0) {
  //     instruments.forEach((instr) => {
  //       players.player(instr + '_' + previousKit).dispose();
  //     })
  //   }
  //   instruments.forEach((instr, index) => {
  //     players.add(instr + '_' + kit, "src/assets/samples/" + kit + "/" + instr + ".wav");
  //     console.log("Added player:", instr);
  //     players.player(instr + '_' + kit).chain(pitchShifts[index], phasers[index], delays[index], reverbs[index],
  //       gains[index], mainVolume, Tone.Destination);
  //
  //   })
  //   console.log("(configPlayers) Players successfully added");
  // }

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

}
export default Sequencer
