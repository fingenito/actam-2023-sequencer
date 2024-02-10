import * as Tone from "tone";

class Sequencer{
  static players;
  static kits;
  static instruments;
  static rows;
  static subdivisions;
  static mainGain;
  static mainVolume;

  // Initializes variables
  static initSequencer(){
    this.players = new Map();
    this.kits = ['808', 'hiphop', '8bit'];
    this.instruments = ['kick','hihat','snare', 'openhat', 'perc']; /* Add clap/other sounds? */
    this.subdivisions = ['4', '8', '16']
    this.rows = this.makeGrid(this.instruments);

    // Effects
    // this.mainVolume = new Tone.Volume(0).toDestination()
    // this.mainGain = new Tone.Gain(1).connect(this.mainVolume)

    this.mainGain = new Tone.Gain(1).toDestination()
    this.mainVolume = new Tone.Volume(0).connect(this.mainGain)


    // Initializes kit
    this.loadKit(this.kits[0]);
  }

  // Loads kit based on selection
  static loadKit(kit){
    console.log('loadKit',kit)
    this.instruments.forEach((instr) => {
      // this.players.set(instr, new Tone.Player("src/assets/samples/" + kit + "/" + instr + ".wav").toDestination())
      this.players.set(instr, new Tone.Player("src/assets/samples/" + kit + "/" + instr + ".wav").connect(this.mainVolume))
    })
    console.log('players',this.players)

  }

  // Creates rows of buttons
  static makeGrid (instruments){
    console.log('makeGrid',instruments)

    const rows = []

    for (const instr in instruments) {
      console.log('instr',instruments[instr])
      const row = {instrument : instruments[instr],
        buttons : []}
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

  // Toggles button in position (row, col)
  static toggle(row, col, value){
    console.log('toggle')
    this.rows[row].buttons[col].isActive = value
  }

  // Returns this.rows
  static getRows(){
    console.log('getRows',this.rows)
    return this.rows
  }

  // Returns this.kits
  static getKits(){
    console.log('getKits', this.kits)
    return this.kits
  }

  // Returns this.subdivisions
  static getSubdivisions(){
    console.log('getSubdivisions', this.subdivisions)
    return this.subdivisions
  }

  // Returns this.players
  static getPlayers(){
    console.log('getPlayers', this.players)
    return this.players
  }

  // Starts loop
  static createLoop(time, beat) {
    this.rows.forEach((row,index) => {
      const instrument = this.players.get(row.instrument)
      const active = row.buttons[beat].isActive
      if(active){
        console.log('createLoop beat', beat)
        instrument.start(time, 0, '8n')
      }
    })
  };
}
export default Sequencer
