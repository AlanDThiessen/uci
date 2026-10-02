import ProcessIfc from './process-ifc.js';

class ProcessImplTauri extends ProcessIfc {
  constructor(path: string) {
    super(path);

    this.error(new Error('Tauri is not implemented'));
  }
}

export default ProcessImplTauri;
