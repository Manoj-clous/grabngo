'use server';

/**
 * @fileOverview A flow that suggests menu updates and ingredient re-order based on current inventory and sales data.
 *
 * - suggestMenuUpdates - A function that handles the menu update suggestions.
 * - SuggestMenuUpdatesInput - The input type for the suggestMenuUpdates function.
 * - SuggestMenuUpdatesOutput - The return type for the suggestMenuUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMenuUpdatesInputSchema = z.object({
  inventoryData: z.string().describe('Current inventory levels for all ingredients.'),
  salesData: z.string().describe('Recent sales data for all menu items.'),
  menu: z.string().describe('The current menu.'),
});
export type SuggestMenuUpdatesInput = z.infer<typeof SuggestMenuUpdatesInputSchema>;

const SuggestMenuUpdatesOutputSchema = z.object({
  menuSuggestions: z.string().describe('Suggestions for menu updates, including new items, removed items, and price adjustments.'),
  ingredientReorderSuggestions: z.string().describe('Suggestions for which ingredients to reorder and in what quantities.'),
});
export type SuggestMenuUpdatesOutput = z.infer<typeof SuggestMenuUpdatesOutputSchema>;

export async function suggestMenuUpdates(input: SuggestMenuUpdatesInput): Promise<SuggestMenuUpdatesOutput> {
  return suggestMenuUpdatesFlow(input);
}

const suggestMenuUpdatesPrompt = ai.definePrompt({
  name: 'suggestMenuUpdatesPrompt',
  input: {schema: SuggestMenuUpdatesInputSchema},
  output: {schema: SuggestMenuUpdatesOutputSchema},
  prompt: `You are a menu optimization expert. Given the following inventory data, sales data, and current menu, suggest menu updates and ingredient re-order suggestions.

Inventory Data:
{{{inventoryData}}}

Sales Data:
{{{salesData}}}

Current Menu:
{{{menu}}}

Menu Suggestions:
Ingredient Reorder Suggestions:`, // The content of the prompt is filled below
});

const suggestMenuUpdatesFlow = ai.defineFlow(
  {
    name: 'suggestMenuUpdatesFlow',
    inputSchema: SuggestMenuUpdatesInputSchema,
    outputSchema: SuggestMenuUpdatesOutputSchema,
  },
  async input => {
    const {output} = await suggestMenuUpdatesPrompt(input);
    return output!;
  }
);
