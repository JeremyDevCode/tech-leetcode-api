import { getCompanies } from '../services/companyService.js';
import { getProblemData } from '../services/leetcodeService.js';
import { getCompanyYamlData } from '../services/companyService.js';
import yaml from 'js-yaml';

export const getInterviewsPage = async (req, res) => {
    try {
        const companies = await getCompanies();
        res.render('interviews', { companies });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).render('error', {
            error: 'Failed to load companies',
            message: error.message
        });
    }
};

export const getCompanyProblemsPage = async (req, res) => {
    try {
        const companyName = req.params.company;
        const yamlData = await getCompanyYamlData(companyName);

        if (!yamlData) {
            return res.status(404).render('error', {
                error: 'Company Not Found',
                message: `No data found for company: ${companyName}`
            });
        }

        const jsonData = yaml.load(yamlData);
        const { company, problems } = jsonData;

        res.render('company', {
            companyName: company.name,
            problems
        });

    } catch (error) {
        console.error('Error loading company data:', error);
        res.status(500).render('error', {
            error: 'Failed to load company data',
            message: error.message
        });
    }
};

export const getProblemPage = async (req, res) => {
    const { company, problem } = req.params;

    try {
        const problemData = await getProblemData(problem, company);
        res.render('problem', { problem: problemData });
    } catch (error) {
        console.error('Error fetching problem:', error);
        const problemData = {
            title: 'Error loading problem',
            difficulty: '',
            likes: 0,
            dislikes: 0,
            acRate: '',
            content: '<p>There was an error loading this problem.</p>',
            hints: [],
            solution: '<p>No solution available.</p>',
            company,
            problemSlug: problem
        };
        res.render('problem', { problem: problemData });
    }
};
