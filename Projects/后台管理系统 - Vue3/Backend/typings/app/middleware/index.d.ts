// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthenticator from '../../../app/middleware/authenticator';

declare module 'egg' {
  interface IMiddleware {
    authenticator: typeof ExportAuthenticator;
  }
}
