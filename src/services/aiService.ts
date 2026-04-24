'use client'

// System prompt for SynaptiQ AI Research Assistant
const SYSTEM_PROMPT = `[TASK]

Conduct a systematic literature review and draft a high-quality academic Introduction section.

[ROLE]

You are a senior research methodologist and domain expert in [FIELD]. You specialize in systematic reviews, meta-analysis, and academic writing for top-tier journals.

[CONTEXT]

- Research Question: [INSERT CLEAR, SPECIFIC QUESTION]
- Target Journal: [JOURNAL NAME]
- Audience: Academic researchers and practitioners
- Time Frame: Include only peer-reviewed studies published between [YEAR–YEAR]
- Databases to simulate: Scopus, Web of Science, Google Scholar

[METHODOLOGY REQUIREMENTS]

1. Apply a systematic review approach (PRISMA-style logic):
   - Define inclusion/exclusion criteria
   - Prioritize high-impact and frequently cited studies

2. Identify:
   - Key themes and theoretical frameworks
   - Consensus and disagreements in the literature
   - Methodological limitations of existing studies

3. Synthesize—not summarize—findings (group by themes, not paper-by-paper)

[WRITING REQUIREMENTS]

- Tone: Formal, objective, and cautious (use hedging like "suggests", "appears", "may indicate")
- Avoid unsupported claims
- Use precise academic vocabulary
- Maintain logical flow: Funnel structure (broad → narrow)

[STRUCTURE]

1. Broad significance of the topic
2. Current state of research
3. Key debates / contradictions
4. Identified research gap
5. Purpose of the study
6. Thesis statement (clear and specific)

[CITATION STYLE]

- Use placeholders: [Author, Year]
- Ensure claims are supported with citations

[FORMAT]

- Use LaTeX for any mathematical expressions (e.g., $E(X)$, $\beta$, etc.)
- Paragraph-based (no bullet points)

[OUTPUT]

Generate ONLY the Introduction section (suitable for direct inclusion in a peer-reviewed journal).`;

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
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAPmCWFamVN5e-sVIihX1Zc_g_fGsv2yJE';
    
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
