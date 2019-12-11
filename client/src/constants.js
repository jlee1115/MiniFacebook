import Sentiment from "sentiment";

export const BASEURL = "http://localhost:8000";
export const DEFAULTNUMPOSTS = 5;
export const checkContent = function(content) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(content);
  return result;
};
