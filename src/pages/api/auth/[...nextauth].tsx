// // import NextAuth from 'next-auth';
// import { authOptions } from '@/server/auth';

// // export default NextAuth(authOptions);

// import { NextApiHandler } from 'next';
// import NextAuth from 'next-auth';

// const authHandler: NextApiHandler = (req, res) =>
//   NextAuth(req, res, authOptions);
// export default authHandler;

import NextAuth from 'next-auth';
import { authOptions } from '@/server/auth';

export default NextAuth(authOptions);
