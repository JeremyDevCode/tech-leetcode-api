import yaml from 'js-yaml';
import { supabase } from '../config/supabase.js';
import { getYamlFile, listFiles } from './fileService.js';

export const getCompanies = async () => {
    try {
        const bucket = 'leetcode-yamls';
        const files = await listFiles(bucket);
        const companies = [];

        for (const file of files) {
            const { data, error } = await supabase.storage.from(bucket).download(file.name);
            if (!data || error) continue;

            const text = await data.text();
            const json = yaml.load(text);

            const { company: companyData, problems } = json;

            const easyCount = problems.easy.length;
            const mediumCount = problems.medium.length;
            const hardCount = problems.hard.length;

            companies.push({
                name: companyData.name,
                logo: companyData.logo,
                totalProblems: easyCount + mediumCount + hardCount,
                difficulties: { easy: easyCount, medium: mediumCount, hard: hardCount }
            });
        }
        return companies;
    } catch (error) {
        console.error('Error fetching companies:', error);
        throw new Error('Failed to fetch companies list');
    }
};

export const getCompanyYamlData = async (companyName) => {
    try {
        const data = await getYamlFile('leetcode-yamls', `${companyName}.yaml`);

        if (!data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching company YAML data:', error);
        throw new Error(`Failed to fetch data for company: ${companyName}`);
    }
};

export const getCompanyInfo = async (companyName) => {
    try {
        const yamlData = await getCompanyYamlData(companyName);

        if (!yamlData) {
            return null;
        }

        const jsonData = yaml.load(yamlData);
        return jsonData.company;
    } catch (error) {
        console.error('Error fetching company info:', error);
        throw new Error(`Failed to fetch company info: ${companyName}`);
    }
};
