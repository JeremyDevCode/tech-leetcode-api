
export const API_ENDPOINTS = {
    LEETCODE_BASE: 'https://leetcode-api-pied.vercel.app',
    LEETCODE_PROBLEM: '/problem'
};

export const DIFFICULTY_LEVELS = {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard'
};

export const DIFFICULTY_COLORS = {
    [DIFFICULTY_LEVELS.EASY]: 'bg-green-100 text-green-700',
    [DIFFICULTY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-700',
    [DIFFICULTY_LEVELS.HARD]: 'bg-red-100 text-red-700'
};

export const STORAGE_BUCKETS = {
    LEETCODE_YAMLS: 'leetcode-yamls'
};

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
    COMPANY_NOT_FOUND: 'Company data not found',
    PROBLEM_LOAD_ERROR: 'Failed to load problem data',
    YAML_GENERATION_ERROR: 'Failed to generate YAML',
    FILE_UPLOAD_ERROR: 'Failed to upload file',
    API_ERROR: 'External API error'
};
