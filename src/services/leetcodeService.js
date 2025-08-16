import { config } from '../config/env.js';

export const getProblemData = async (problemSlug, company) => {
    try {
        const response = await fetch(`${config.LEETCODE_API_BASE}/problem/${problemSlug}`);

        if (!response.ok) {
            throw new Error(`LeetCode API returned status ${response.status}`);
        }

        const data = await response.json();

        let stats = {};
        try {
            stats = JSON.parse(data.stats || "{}");
        } catch {
            stats = {};
        }

        return {
            title: data.title || 'Untitled Problem',
            difficulty: data.difficulty || 'Unknown',
            likes: Number(data.likes) || 0,
            dislikes: Number(data.dislikes) || 0,
            acRate: stats.acRate || '',
            content: data.content || '<p>No content available.</p>',
            hints: data.hints || [],
            solution: data.solution?.content || '<p>No solution available.</p>',
            company,
            problemSlug
        };

    } catch (error) {
        console.error('Error fetching problem from LeetCode API:', error);
        throw new Error(`Failed to fetch problem data: ${error.message}`);
    }
};
