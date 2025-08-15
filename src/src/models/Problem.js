
export class Problem {
    constructor(data) {
        this.title = data.title || 'Untitled Problem';
        this.difficulty = data.difficulty || 'Unknown';
        this.likes = Number(data.likes) || 0;
        this.dislikes = Number(data.dislikes) || 0;
        this.acRate = data.acRate || '';
        this.content = data.content || '<p>No content available.</p>';
        this.hints = data.hints || [];
        this.solution = data.solution || '<p>No solution available.</p>';
        this.company = data.company || '';
        this.problemSlug = data.problemSlug || '';
    }

    getDifficultyColor() {
        const colors = {
            'Easy': 'bg-green-100 text-green-700',
            'Medium': 'bg-yellow-100 text-yellow-700',
            'Hard': 'bg-red-100 text-red-700'
        };
        return colors[this.difficulty] || 'bg-gray-100 text-gray-700';
    }

    isValid() {
        return this.title && this.problemSlug;
    }
}

export const createProblemFromApi = (apiData, company, problemSlug) => {
    let stats = {};
    try {
        stats = JSON.parse(apiData.stats || "{}");
    } catch {
        stats = {};
    }

    return new Problem({
        title: apiData.title,
        difficulty: apiData.difficulty,
        likes: apiData.likes,
        dislikes: apiData.dislikes,
        acRate: stats.acRate,
        content: apiData.content,
        hints: apiData.hints,
        solution: apiData.solution?.content,
        company,
        problemSlug
    });
};
