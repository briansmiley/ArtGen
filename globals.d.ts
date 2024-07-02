//extend the NextApiRequest interface to include a User type from our prisma client
import { User } from "@prisma/client";

declare module "next" {
  interface NextApiRequest {
    user?: User;
  }
}
