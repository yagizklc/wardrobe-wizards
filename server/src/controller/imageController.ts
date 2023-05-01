import { Request, Response } from "express"
import path from "path";
import fs from 'fs';

// Function to recursively read directory contents
const getImagesRecursively = (dir: string): string[] => {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let filePaths: string[] = [];

    files.forEach((file) => {
        if (file.isDirectory()) {
            filePaths = [...filePaths, ...getImagesRecursively(path.join(dir, file.name))];
        } else {
            filePaths.push(path.join(dir, file.name));
        }
    });

    return filePaths;
};

const imagesDirectory = 'src/images';

const getImages = async (req: Request, res: Response) => {
    try {
        const images = getImagesRecursively(imagesDirectory);

        // Replace the local file path with the appropriate URL path
        const imageURLs = images.map((imagePath) => imagePath.replace(imagesDirectory, '/images'));
        res.json({ images: imageURLs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server error" });
    }
};

// Serve all items in a specific subfolder
const getImagesByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const imagesDir = path.join(imagesDirectory, category);

    if (!fs.existsSync(imagesDir)) {
        res.status(404).json({ error: 'Subfolder not found' });
        return;
    }

    const images = getImagesRecursively(imagesDir);
    const imageURLs = images.map((imagePath) => imagePath.replace(imagesDir, `/images/${category}`));

    res.json({ images: imageURLs });
};

// Serve a specific item within a specific subfolder
const getImagesByName = (req: Request, res: Response) => {
    const { category, id } = req.params;
    const itemPath = path.resolve(path.join(imagesDirectory, category, id));

    if (!fs.existsSync(itemPath)) {
        res.status(404).json({ error: 'Item not found' });
        return;
    }

    res.sendFile(itemPath);
};


export default { getImages, getImagesByCategory, getImagesByName }