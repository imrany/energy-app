import fs from 'fs/promises';
import path from 'path';

export const getAll = async () => {
    try {
        const filePath = path.join(process.cwd(), 'Data', 'energySources.json');
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading energy sources data:", error);
        throw error;
    }
};
