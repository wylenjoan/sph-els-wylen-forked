import axiosClient from ".";

const listActivitiesByUser = async (userId: number) => {
  return await axiosClient.get(`activities?user=${userId}`);
};

const listDashboardActivities = async (userId: number) => {
  return await axiosClient.get(`dashboard?user=${userId}`);
};

const getLessonsWordsLearned = async (userId: number) => {
  return await axiosClient.get(`get_lessons_words_learned?user=${userId}`);
};

export {
  listActivitiesByUser,
  listDashboardActivities,
  getLessonsWordsLearned,
};
