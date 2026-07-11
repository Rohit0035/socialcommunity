import path from "path";
import fs from "fs/promises";

export async function uploadImage(file, folder = "uploads") {
	try {
		if (!file || !file.name) {
			return null;
		}

		// FILE BUFFER
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// SAFE FILE NAME
		const fileName = Date.now() + "-" + file.name.replaceAll(" ", "-");

		// 1. CHOOSE THE BASE DIRECTORY AUTOMATICALLY
		const baseDir =
			process.env.NODE_ENV === "production"
				? process.env.UPLOAD_DIR
				: path.join(process.cwd(), "public");

		// 2. JOIN THE SUBFOLDER DYNAMICALLY
		const uploadDir = path.join(baseDir, folder);

		// CREATE FOLDER (fs.mkdir will automatically create the subfolder if it doesn't exist)
		await fs.mkdir(uploadDir, { recursive: true });

		// FULL PATH TO FILE
		const filePath = path.join(uploadDir, fileName);

		// SAVE FILE
		await fs.writeFile(filePath, buffer);

		// RETURN PUBLIC URL (Always uniform for your frontend)
		return `/${folder}/${fileName}`;

	} catch (error) {
		console.error(error);
		throw new Error("Image upload failed");
	}
}