import { Db, ObjectId } from "mongodb";
import { NextApiHandler } from "next";
import { connectToDatabase } from "../../lib/db";
import { ProjectType } from "../../utils/types";

// interface RequestBody {
// 	title: string;
// 	body: string;
// 	github: string;
// 	liveSite: string;
// 	deskImgUrl?: string;
// 	tabletImgUrl?: string;
// 	mobileImgUrl?: string;
// 	alignLeft: boolean;
// 	techSelected: string[];
// }

const handler: NextApiHandler = async (req, res) => {
	if (req.method === "POST") {
		let {
			_id,
			title,
			body,
			github,
			liveSite,
			deskImgUrl,
			tabletImgUrl,
			mobileImgUrl,
			techSelected,
			alignLeft,
			featured,
			article
		}: ProjectType = req.body;
		let client;
		try {
			client = await connectToDatabase();
		} catch (error) {
			res.status(500).json({ message: "Could not connect to database!" });
			return;
		}

		const db: Db = client.db();
		const options = { upsert: true };
		const filter = { _id: new ObjectId(_id) };
		const data = {
			title,
			body,
			github,
			liveSite,
			deskImgUrl,
			tabletImgUrl,
			mobileImgUrl,
			techSelected,
			alignLeft,
			featured,
			article
		};

		try {
			_id
				? db.collection("projects").updateOne(filter, { $set: data }, options)
				: db.collection("projects").insertOne(data);
		} catch (error) {
			client.close();
			res.status(500).json({ message: "Storing project failed" });
		}

		res
			.status(201)
			.json({ message: "Successfully stored message!", project: req.body });
	}
	if (req.method === "GET") {
		let client;
		try {
			client = await connectToDatabase();
		} catch (error) {
			res.status(500).json({ message: "Could not connect to database!" });
			return;
		}

		const db: Db = client.db();
		let projects;
		try {
			projects = await db.collection("projects").find().toArray();
		} catch (err) {
			client.close();
			res.status(500).json({ message: "Retrieving failed" });
		}
		res.status(200).json(projects);
	}
};

export default handler;
