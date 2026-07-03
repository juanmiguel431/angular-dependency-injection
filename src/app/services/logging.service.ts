import { Service } from '@angular/core';

@Service()
export class LoggingService {

  public log(message: string): void {
    const timestamp = new Date().toLocaleDateString();
    console.log(`[${timestamp}]: ${message}`);
  }
}
