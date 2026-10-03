import Emittery from 'emittery';

import ProcessImplNode from './process-impl-node.js';

import type ProcessIfc from './process-ifc.js';

interface Events {
  disconnect: undefined;
  error: Error;
  exit: number;
  line: string;
}

class Process extends Emittery<Events> {
  private buffer = '';
  private child: ProcessIfc;

  constructor(path: string, processImpl?: ProcessIfc) {
    super();

    this.child = processImpl ?? new ProcessImplNode(path);

    this.child.on('disconnect', () => this.emit('disconnect'));
    this.child.on('error', (error) => this.emit('error', error.data));
    this.child.on('exit', (code) => this.emit('exit', code.data));
    this.child.on('stdout', (stdout) => {
      this.buffer += stdout.data;

      const lines = this.buffer.split('\n');
      this.buffer = lines.pop() ?? '';

      for (const line of lines) {
        this.emit('line', line);
      }
    });
  }

  disconnect(): void {
    this.child.disconnect();
  }

  kill(): void {
    this.child.kill();
  }

  async write(input: string): Promise<void> {
    return this.child.write(input);
  }
}

export default Process;
