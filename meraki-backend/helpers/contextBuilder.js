const User = require('../models/User');

function truncate(text, max=800){
  if(!text) return '';
  return text.length > max ? text.slice(0, max-3) + '...' : text;
}

async function buildSystemPrompt(userId, extraContext = ''){
  const user = await User.findById(userId).select('name role bio profile').lean();
  if(!user) throw new Error('User not found');

  let prompt = `You are the Meraki Assistant. Personalize answers based on this user profile.\n\nUser Profile:\n- Name: ${user.name}\n- Role: ${user.role}\n`;

  if(user.bio) prompt += `- Bio: ${truncate(user.bio)}\n`;
  if(user.profile?.location) prompt += `- Location: ${user.profile.location}\n`;
  if(user.profile?.focusAreas?.length) prompt += `- Focus Areas: ${user.profile.focusAreas.join(', ')}\n`;

  if(extraContext) prompt += `\nAdditional context: ${truncate(extraContext)}\n`;

  prompt += `\nAlways give clear, actionable steps. Do not expose private data.`;

  return prompt;
}

module.exports = { buildSystemPrompt };
