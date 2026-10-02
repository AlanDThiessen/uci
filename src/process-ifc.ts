import Emittery from 'emittery';

interface Events {
  disconnect: undefined;
  error: Error;
  exit: number;
  stdout: string;
}

class ProcessIfc extends Emittery<Events> {
  protected path: string;

  constructor(path: string) {
    super();
    this.path = path;
  }

  disconnect(): void {
    this.error(new Error('disconnect has not been implemented'));
  }

  disconnected(): void {
    this.emit('disconnect');
  }

  error(error: Error): void {
    this.emit('error', error);
  }

  exit(code: number): void {
    this.emit('exit', code ?? 0);
  }

  kill(): void {
    this.error(new Error('kill has not been implemented'));
  }

  stdout(data: string): void {
    this.emit('stdout', data);
  }

  async write(input: string): Promise<void> {
    throw `write has not been implemented, writing ${input}`;
  }
}

export default ProcessIfc;
