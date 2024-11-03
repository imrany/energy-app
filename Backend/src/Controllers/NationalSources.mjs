import NationalSourceModel from '../Models/NationalSourceModel.mjs';

export const getNationalSources = async (req, res) => {
    try {
        const sources = await NationalSourceModel.getAll();
        res.json(sources);
    } catch (error) {
        console.error("Error fetching national sources:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
