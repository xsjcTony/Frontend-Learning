import { Application } from 'egg'

class AppBootHook {
  public app: Application

  public constructor(app: Application) {
    this.app = app
  }

  public async willReady(): Promise<void> {
    // willReady
  }

}

module.exports = AppBootHook
