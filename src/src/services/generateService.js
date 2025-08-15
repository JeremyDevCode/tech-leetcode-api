import { config } from '../config/env.js';

export const generateCompanyYamlData = async (companyName) => {
    try {
        const rawYaml = await generatePerCompany(companyName);
        return rawYaml;
    } catch (error) {
        console.error('Error generating YAML for company:', error);
        throw new Error(`Failed to generate YAML for company: ${companyName}`);
    }
};

const generatePerCompany = async (company) => {
    const prompt = `
Generate **only one valid YAML document** with real LeetCode problems that are asked at ${company}. Do not include any text, explanation, or Markdown—just the YAML.  

Structure:
company:
  name: "the name of the company, in this case it is: ${company}"
  logo: "the logo of ${company} in SVG format"
problems:
  easy:
    - title: "Example Problem Title"
      slug: "example-problem-title-slug"
      production_use: "Example production use"
      advices:
        - "Practical advice 1"
        - "Practical advice 2"
      common_pattern:
        - "Algorithm pattern"
  medium:
    - title: "Example Problem Title"
      slug: "example-problem-title-slug"
      production_use: "Example production use"
      advices:
        - "Practical advice 1"
        - "Practical advice 2"
      common_pattern:
        - "Algorithm pattern"
  hard:
    - title: "Example Problem Title"
      slug: "example-problem-title-slug"
      production_use: "Example production use"
      advices:
        - "Practical advice 1"
        - "Practical advice 2"
      common_pattern:
        - "Algorithm pattern"

Requirements:

1. Include exactly one company.
2. For each difficulty level ("easy", "medium", "hard"), list **at least 15 real LeetCode problems**.
3. Each problem must include:
   - title: exact LeetCode title
   - slug: exact LeetCode titleSlug
   - production_use: one real-world production use in big tech companies
   - advices: array of practical advice (at least one item)
   - common_pattern: array of algorithmic patterns (at least one item)
4. Output **only valid YAML**, fully parseable:
   - No Markdown, explanations, or extra text.
   - All indentation, lists, and mappings must be correct.
   - No trailing commas.
5. Return the YAML as **one single block**, properly formatted for YAML parsing.
6. Don't add additional information.
7. Use English.
8. Ensure all lists and mappings are properly indented and valid YAML.
    `;

    const res = await fetch(`${config.OLLAMA_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: config.OLLAMA_MODEL,
            prompt,
            stream: false
        })
    });

    const data = await res.json();
    return data.response;
};
