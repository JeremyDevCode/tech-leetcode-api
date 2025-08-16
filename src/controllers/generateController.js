import { generateCompanyYamlData } from '../services/generateService.js';
import { uploadFile } from '../services/fileService.js';

export const generateCompanyYaml = async (req, res) => {
    try {
        const { company } = req.params;

        const rawYaml = await generateCompanyYamlData(company);

        await uploadFile('leetcode-yamls', `${company}.yaml`, rawYaml);

        res.json({
            status: 200,
            message: 'YAML file generated and uploaded successfully',
            company,
            filename: `${company}.yaml`
        });

    } catch (error) {
        console.error('Error generating YAML:', error);
        res.status(500).json({
            error: 'Failed to generate YAML',
            details: error.message
        });
    }
};
