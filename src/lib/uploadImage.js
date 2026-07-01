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
    const fileName =
      Date.now() +
      "-" +
      file.name.replaceAll(" ", "-");

    // UPLOAD DIRECTORY
    const uploadDir = path.join(
      process.cwd(),
      "public",
      folder
    );

    // CREATE FOLDER
    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    // FULL PATH
    const filePath = path.join(
      uploadDir,
      fileName
    );

    // SAVE FILE
    await fs.writeFile(filePath, buffer);

    // RETURN PUBLIC URL
    return `/${folder}/${fileName}`;

  } catch (error) {
    console.log(error);

    throw new Error("Image upload failed");
  }
}