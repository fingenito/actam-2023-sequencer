import * as Tone from "tone";

class Sequencer{
  static players;
  static kits;
  static instruments;
  static rows;
  static initSequencer(){
    this.players = new Map();
    this.kits = ['808', 'hiphop', '8bit'];
    // this.instruments = ['kick','hihat','rim', 'openhat', 'cowbell', 'tom', 'snare', 'clap'];
    this.instruments = ['kick','hihat','snare', 'openhat', 'perc'];
    this.rows = this.makeGrid(this.instruments);
    this.loadKit(this.kits[0]);

  }
  static loadKit(kit){
    console.log('loadKit',kit)
    this.instruments.forEach((instr) => {
      this.players.set(instr, new Tone.Player("src/assets/samples/" + kit + "/" + instr + ".wav").toDestination())
    })
    console.log('players',this.players)

  }
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
  static toggle(row,col,value){
    console.log('toggle')
    this.rows[row].buttons[col].isActive = value
  }
  static getRows(){
    console.log('getRows',this.rows)
    return this.rows
  }
  static getKits(){
    console.log('getKits', this.kits)
    return this.kits
  }
  static createLoop(time,beat) {
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

