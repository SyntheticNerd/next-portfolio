//[...nextauth] is a catch all slug for requests sent to the auth api
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

interface Credentials {
	username: { label?: string; type?: string; placeholder?: string };
	password: { label?: string; type?: string };
}

export default NextAuth({
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 60 * 60 * 24 * 30,
	},
	//sessions is a setting used by next auth here we can tell it to use json web tokens
	secret: process.env.AUTH_SECRET,
	providers: [
		CredentialsProvider({
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			// @typescript-eslint/ban-ts-comment
			// @ts-ignore
			async authorize(credentials) {
				const client = await connectToDatabase();

				const usersCollection = client.db().collection("users");
				const user = await usersCollection.findOne({
					username: credentials!.username,
				});
				//check the database to see isf the user logging in exists
				if (!user) {
					client.close();
					return false;
					// throw new Error("No user found!");
				}

				const isValid = await verifyPassword(
					credentials!.password,
					user.password
				);

				if (!isValid) {
					client.close();
					// throw new Error("Could not log in!");
					return false;
				}
				client.close();
				return { username: user.username };
			},
		}),
	],
});
