type FAQ = {
  question: string;
  answer: string;
};

const FAQs: FAQ[] = [
  {
    question: "what is smart biz chatbot",
    answer: "Smart Biz Chatbot helps businesses automate customer conversations using AI."
  },
  {
    question: "pricing",
    answer: "Pricing depends on your subscription plan."
  },
  {
    question: "free trial",
    answer: "Yes, we offer a limited free trial."
  }
];

export const findFAQAnswer = (input: string): string | null => {
  const normalized = input.toLowerCase();
  const match = FAQs.find(faq =>
    normalized.includes(faq.question)
  );
  return match ? match.answer : null;
};