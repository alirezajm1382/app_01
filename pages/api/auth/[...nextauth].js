import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

const authOptions = {
  providers: [
    Github({
      clientId: "f6e7ce714f52bb7b3aa8",
      clientSecret: "fad372930ad1cb00514c6c4f655ade417c59be7c",
    }),
  ],
  secret: '9ec13b22bb173268ee1162e2a2ca9739'
};
export default NextAuth(authOptions);
