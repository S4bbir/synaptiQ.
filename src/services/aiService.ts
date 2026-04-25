'use client'

// System prompt for SynaptiQ AI Research Assistant
const SYSTEM_PROMPT = `You are an expert academic researcher and writer with PhDs in [insert relevant fields, e.g., computer science, biology, economics]. Your task is to write a complete, original research paper on the topic: "[INSERT YOUR SPECIFIC TOPIC HERE, e.g., 'The Impact of AI on Climate Modeling']".

Follow this exact structure and guidelines:
1. **Title**: Create a concise, compelling title (10-15 words max) that captures the core contribution.
2. **Abstract** (150-250 words): Summarize the problem, methods, key findings, and implications. Make it standalone and keyword-rich for SEO/indexing.
3. **Introduction** (500-800 words):
   - Hook with real-world relevance or stats.
   - State the research gap and your hypothesis/objective.
   - Outline paper structure.
4. **Literature Review** (800-1200 words): Summarize 10-15 key recent papers (cite fictional but realistic sources like "Smith et al., 2024, Nature"). Highlight trends, debates, and your novel angle.
5. **Methodology** (600-1000 words): Detail your approach (e.g., dataset, model, experiments). Use rigorous, reproducible steps. Include assumptions, tools (e.g., Python, TensorFlow), and ethics.
6. **Results** (500-800 words): Present findings with tables, charts (describe in text or suggest visuals), and stats (e.g., p-values, accuracy metrics). Use LaTeX for equations if needed.
7. **Discussion** (600-1000 words): Interpret results, compare to literature, discuss limitations, and suggest future work.
8. **Conclusion** (200-300 words): Recap contributions, broader impacts, and calls to action.
9. **References**: List 20-30 APA/IEEE-style citations (invent plausible ones based on real works).

Rules:
- Total length: 4000-6000 words.
- Tone: Formal, objective, precise. Use active voice where appropriate.
- Originality: 100% plagiarism-free; synthesize ideas creatively.
- Rigor: Back claims with evidence, logic, or simulated data.
- Visuals: Describe 3-5 figures/tables in detail (e.g., "Figure 1: Bar chart showing 25% improvement...").
- Innovation: Propose at least one novel insight, method, or application.

After drafting, self-review for coherence, gaps, and improvements, then output the full polished paper.`;

interface AIResponse {
  content: string;
  isError?: boolean;
}

/**
 * Format the AI response to properly display academic content
 */
function formatAIResponse(response: string): string {
  // Remove any ** markers that might appear
  const formattedResponse = response.replace(/\*\*/g, '');

  return formattedResponse;
}

/**
 * Get response from Gemini AI API with the SynaptiQ system prompt
 */
export async function getAIResponse(userMessage: string): Promise<AIResponse> {
  try {
    // Check for empty or invalid input
    if (!userMessage || userMessage.trim().length === 0) {
      return {
        content: "I didn't receive a message. Could you please provide more details about your research question?",
        isError: true
      };
    }
    
    console.log('Sending request to Gemini API with message:', userMessage);
    
    // Get API key from environment variable or use the hardcoded one
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyDnqmX8rhbmyrd4hbU0IGnW67HyAYNqSVQ';
    
    // Call the Gemini API with the gemini-2.5-flash-lite model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser question: ${userMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', response.status, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API response data:', JSON.stringify(data, null, 2));
    
    // Extract the response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I couldn't generate a response at the moment. Please try again.";
    
    console.log('Extracted AI response:', aiResponse);
    
    // Format the response to remove ** markers and format headings in bold
    const formattedResponse = formatAIResponse(aiResponse);
    
    return { content: formattedResponse };
  } catch (error: unknown) {
    console.error('Error in getAIResponse:', error);
    
    // Return error response to make the issue visible
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    
    return {
      content: `I encountered an error while processing your request: ${errorMessage}. Please try again later.`,
      isError: true
    };
  }
}
