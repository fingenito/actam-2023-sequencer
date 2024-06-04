# SQNCR
SQNCR è un'applicazione web-based progettata per la creazione di sequenze musicali. Permette di combinare e arrangiare suoni e ritmi in modo intuitivo e creativo grazie anche al facile utilizzo su dispositivi touch-screen. 
Ideale per musicisti, compositori e chiunque voglia esplorare il mondo della creazione musicale digitale.
Sviluppato in Vue.js, framework di JavaScript implementando l'uso di Tone.js, libreria per la sintesi audio, permette all'utente di combinare e arrangiare suoni e ritmi in modo intuitivo e creativo.
Implementa dentro di sè vari banchi di suoni, facilmente espandibili, per accontentare più gusti musicali possibili, essendo pensato come uno strumento versatile.

Progetto del corso universitario di Advanced Coding Tools and Methodologies, tenuto dal professor F. Bruschi, a.a. 2023/2024, Politecnico di Milano.

///METTI IMMAGINE 

## Features
Il cuore del sequencer implementa quattro righe di bottoni selezionabili, ognuna con un tipo di suono differente (kick, hithat, snare, openhat). 
è possibile selezionare il kit di suoni nel selettore nella parte sinistra dello strumento, dove si troveranno cinque tipi differenti di drumset. 
Nel momento in cui l'utente premerà quindi il tasto "play" il sequencer comincerà il loop, producendo il suono dei tasti selezionati. Con il tasto "pausa", invece, la sequenza verrà interrotta, facendo ripartire al play successivo il sequencer dal suo primo step. 
è possibile, inoltre, mutare un'intera riga del sequencer selezionando il tasto posizionato alla destra della relativa riga. 
In questo modo l'utente avrà la massima flessibilità sui suoni che verranno riprodotti. 

è possibile inoltre cambiare la velocità di scorrimento regolando i BPM (nel range 30-240 BPM) e la percentuale di swing con i relativi slider posizionati nella parte sinistra dello schermo. 
La modifica di questi parametri comporterà, non solo un cambiamento nel suono prodotto, ma anche la modifica dei relativi parametri nello schermo nero visibile nella parte a sinistra del sequencer. 
Sempre nello schermo nero è possibile visualizzare la forma d'onda prodotta dal suono creato durante l'utilizzo del sequencer. 
Con il secondo selettore verde sarà possibile cambiare la suddivisione della battuta. 

### Effects
Nella parte in basso a destra dello schermo si nota una grande sezione per gli effetti. Come già detto si possono applicare vari effetti al suono prodotto dallo strumento. 
In particolare si possono modificare con quattro knob indipendenti la proporzione di wet signal che verrà processata dall'effetto. 
I quattro effetti che possono essere regolati:
* Picth: Il knob invia un comando di controllo all'algoritmo DSP. Questo comando regola la frequenza fondamentale del suono in base alla rotazione del knob.
* Delay: Un effetto delay riproduce un segnale audio ritardato nel tempo, creando echi o raddoppi del suono originale. Più il ritardo è lungo, più l'eco è percettibile e crea un'atmosfera spaziale o ambigua.
* Reverb: simula la risposta acustica di un ambiente, come una stanza, un auditorium o una caverna. In pratica, aggiunge copie ritardate e attenuate del segnale audio originale, imitando il modo in cui il suono rimbalza sulle superfici e si attenua nel tempo. 
Questo crea un effetto di ampiezza e profondità, rendendo il suono più ricco e realistico.
* Phaser: effetto di modulazione che crea un suono "sussurrante" o "pulsante" attraverso lo sfasamento graduale delle frequenze del segnale audio. Nella pratica, un filtro all-pass viene applicato al segnale, ritardando leggermente diverse frequenze, un oscillatore a bassa frequenza (LFO) modula la quantità di ritardo applicato dal filtro all-pass. Infine, il segnale audio viene modificato con le variazioni di fase create dal filtro all-pass, generando il tipico effetto. 

Gli effetti sono applicabili in maniera indipendente ad ogni riga del sequencer, in modo tale che si possa modificare anche solo il suono di uno degli strumenti, portando all'utente una sempre maggiore flessibilità e versatilità d'utilizzo. 
Per ogni sezione relativa allo strumento, si ha anche un piccolo tasto di reset, in modo tale che durante l'esecuzione non si debba necessariamente regolare a zero ogni knob, ma il tasto lo fa in automatico per l'utente, risultando comodo ma soprattutto veloce da configurare. 


## Framework & Dependencies
The framework of choice is Vue. Developed using HTML, JavaScript and CSS.

* Tone.js - Web Audio Framework
* Vue.js - Web UI Framework
* Quasar - Web UI Framework

## Team
* Niccolò Galante - descrizione di che abbiamo fatto - niccolo.galanteo@mail.polimi.it
* Flavio Ingenito - descrizione di che abbiamo fatto - flavio.ingenito@mail.polimi.it




