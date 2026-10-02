import * as process from 'node:child_process';

import ProcessIfc from './process-ifc.js';

class ProcessImplNode extends ProcessIfc {
  private child: process.ChildProcessWithoutNullStreams;

  constructor(path: string) {
    super(path);

    this.child = process.spawn(this.path);

    this.child.on('disconnect', () => this.disconnected());
    this.child.on('error', (error) => this.error(error));
    this.child.on('exit', (code) => this.exit(code ?? 0));
    this.child.stdout.on('data', (data) => this.stdout(data.toString()));
    this.child.stderr.on('data', (data) =>
      this.error(new Error(data.toString().trim())),
    );
  }

  override disconnect(): void {
    this.child.disconnect();
  }

  override kill(): void {
    this.child.kill();
  }

  override async write(input: string): Promise<void> {
    return new Promise((ok, ko) => {
      this.child.stdin.write(input, 'utf8', (error) => {
        if (error) {
          return ko(error);
        }
        ok();
      });
    });
  }
}

export default ProcessImplNode;
