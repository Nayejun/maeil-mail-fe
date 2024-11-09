import BASE_URL from "./baseUrl";

export const getSubscriberCount = async () => {
  const response = await fetch(`${BASE_URL}/statistics/subscribe`);

  if (!response.ok) {
    throw new Error("getSubscriberCount api 에러가 발생했습니다.");
  }

  const { cumulativeCount } = await response.json();

  return cumulativeCount;
};