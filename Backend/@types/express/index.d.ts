/** @format */

import { Entrepreneur } from "../../src/entities/User";

declare global {
  namespace Express {
    interface Request {
      currentUser: User | undefined;
    }
  }
}
