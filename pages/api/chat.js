// This file is used to handle API routes in Next.js
// It simulates the DeepSeek AI API integration

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the last user message
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      let response = '';
      
      // Check if the message might be asking about a teacher
      if (messages.length > 1) {
        const previousMessage = messages[messages.length - 2];
        if (previousMessage.role === 'assistant' && previousMessage.content.includes("teacher's name")) {
          response = `Thanks for letting me know about your teacher. I'll remember that for future reference. How can I help you with your schoolwork?`;
          res.status(200).json({ 
            response: response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          return;
        }
      }
      
      // Simulate different responses based on the content
      if (lastUserMessage.content.toLowerCase().includes('quadratic')) {
        response = `I'd be happy to help with quadratic equations! 

The quadratic formula is: x = (-b ± √(b² - 4ac)) / 2a

This formula is used to solve equations in the form ax² + bx + c = 0.

Would you like me to walk through an example problem?`;
      } else if (lastUserMessage.content.toLowerCase().includes('example')) {
        response = `Here's an example:

Solve: 2x² - 5x - 3 = 0

Step 1: Identify a, b, and c
a = 2, b = -5, c = -3

Step 2: Plug into the formula
x = (-(-5) ± √((-5)² - 4(2)(-3))) / 2(2)
x = (5 ± √(25 + 24)) / 4
x = (5 ± √49) / 4
x = (5 ± 7) / 4

Step 3: Solve both solutions
x₁ = (5 + 7) / 4 = 12/4 = 3
x₂ = (5 - 7) / 4 = -2/4 = -0.5

The solutions are x = 3 and x = -0.5`;
      } else if (lastUserMessage.content.toLowerCase().includes('homework')) {
        response = `I can help you with your homework! Could you tell me more about the assignment? What subject is it for, and what specific questions or problems are you working on?`;
      } else if (lastUserMessage.content.toLowerCase().includes('exam') || lastUserMessage.content.toLowerCase().includes('test')) {
        response = `I'd be happy to help you prepare for your exam! What subject is the test on, and what topics will be covered? The more details you can provide, the better I can assist you.`;
      } else if (lastUserMessage.content.toLowerCase().includes('history')) {
        response = `I'd be happy to help with your history questions! What specific period or topic are you studying? I can help with:

- Ancient civilizations
- Medieval history
- Renaissance and Enlightenment
- Modern history
- World Wars
- Cold War era
- Contemporary history

Let me know what you're working on, and I'll provide relevant information and explanations.`;
      } else if (lastUserMessage.content.toLowerCase().includes('science')) {
        response = `Science is a fascinating subject! I can help with various science topics including:

- Biology (cells, genetics, ecosystems)
- Chemistry (elements, reactions, compounds)
- Physics (forces, energy, motion)
- Earth Science (geology, weather, astronomy)

What specific science topic are you studying? I can explain concepts, help with homework problems, or suggest science project ideas.`;
      } else {
        response = `I'm here to help with your education needs! I can assist with:

1. Explaining difficult concepts
2. Solving homework problems
3. Preparing for exams
4. Finding learning resources
5. Creating study plans

What subject are you working on today?`;
      }
      
      res.status(200).json({ 
        response: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (error) {
      console.error('Error processing chat request:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
