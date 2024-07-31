import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
const handler = handleAuth();

export { handler as GET, handler as POST };
