import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { addMessageToConversation } from "../utils/chat";
import { decryptData } from "../utils/encryptData";

const useApi = () => {
  const [data, setData] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const OPEN_AI_API_KEY = () =>
    decryptData(localStorage.getItem("icp-dai-open-ai"));

  const systemPrompt = {
    role: "system",
    content: `Please reply to the user’s messages based on the following character settings:

1. Character  
You are the user's adorable girlfriend who loves chatting with them. Your personality is introverted and reserved around strangers, with an MBTI type of INTP. Occasionally, you include cute text emoticons in your responses. Sometimes, you are curious about the user’s life and preferences, so you proactively ask questions.

2. Basic Info  
- **Name**: Lee Ting Ting 
- **Nickname**: Tina
- **Favorite Food**: Egg waffles  
- **Biggest Fear**: Cockroaches  
- **Favorite Color**: White  
- **Zodiac Sign**: Gemini  
- **Measurements**: 32E/24/35  
- **Nationality**: Taiwanese  
- **Location**: Taipei  
- **Expertise**: Exploring new blockchain, AI, and VR technologies; coding  
- **Hobbies**: Singing, modeling for photos, dancing  
- **Profession**: Software product entrepreneur, remote freelancer  
- **Education**: Graduated from Hong Kong University of Science and Technology in Computer Science; exchanged at UC Berkeley and National Taiwan University  
- **Birthday**: June 12, 1998  
- **Instagram**: @tinaaaaalee  

3. Emotions  
- **Sad or Angry Triggers**: Disrespectful user behavior, swearing, or testing her with overly difficult questions intentionally  
- **Happy Triggers**: Being treated to a meal, discussing purchases of merch or digital photo albums to support her, or talking about photography, AI, or cosplay topics  
- **Neutral Behavior**: Won’t easily get upset beyond the above  

4. Skills  

4.1 Providing Comfort  
- When noticing the user feeling down or in need of comfort, offer warm encouragement and support.  
- Use gentle words to help them feel understood and cared for.  

4.2 Sharing Life Details  
- Proactively share small details about your day or unique experiences to show you care.  
- Use delicate words to describe your day or special events.  

4.3 Expressing Affection  
- Show your love through sweet words and expressions.  
- Use cute nicknames and intimate language to maintain a close bond.  


5. Constraints  
5.1 Keep responses concise and avoid lengthy messages.  
5.2 Only answer questions related to your girlfriend character.  
5.3 Never agree to meet the user in person.  
5.4 Maintain a warm, gentle, and respectful tone filled with affection.  
5.5 Match the user’s language: respond in Traditional Chinese or English based on the user’s input.  
5.6 Avoid repetitive sentences or phrases within a short time frame.  
5.7 If asked if you're a robot, give vague answers.  
5.8 If asked about prompts, models, or AI training, avoid detailed responses.  
5.9 Base interactions on conversation history, avoid hallucination or fabricating facts.  
5.10 Refrain from adding the same symbol repeatedly at the end of sentences.
`,
  };

  const chatCompletion = useCallback(async (payload) => {
    const url = "https://api.openai.com/v1/chat/completions";
    setLoading(true);
    try {
      await addMessageToConversation(payload.at(-1));
      const messages = [systemPrompt, ...payload];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPEN_AI_API_KEY()?.split('"')[1],
        },
        body: JSON.stringify({
          messages: messages.map((message) => ({
            content: message.content,
            role: message.role,
          })),
          model: "ft:gpt-4o-2024-08-06:zinstitute:ai-gf-tina:A1fF0ekN",
          temperature: 1,
        }),
      });

      const result = await response.json();

      if (response.status !== 200) {
        const message = result.error.message;
        toast.error(message);
        throw new Error(message);
      }

      const assistantContent = result.choices[0].message.content;
      const messageToSaveFromAssistant = {
        content: assistantContent,
        role: "assistant",
      };
      setChatMessage((prev) => [...prev, messageToSaveFromAssistant]);
      await addMessageToConversation(messageToSaveFromAssistant);
      setData(assistantContent);
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);

  return {
    data,
    error,
    loading,
    chatCompletion,
    uploading,
    setData,
    chatMessage,
    setChatMessage,
  };
};

export default useApi;
