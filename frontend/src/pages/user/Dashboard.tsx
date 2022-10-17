import axios from "axios";
import { useEffect, useState } from "react";
import {
  getLessonsWordsLearned,
  listDashboardActivities
} from "../../apiClient/activityService";
import ActivityList from "../../components/ActivityList";
import Avatar from "../../components/Avatar";
import useAuth from "../../hooks/useAuth";
import { Activity } from "../../interfaces/activity";

function Dashboard() {
  const { user } = useAuth();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [lessonsLearned, setLessonsLearned] = useState<number>(0);
  const [wordsLearned, setWordsLearned] = useState<number>(0);

  useEffect(() => {
    async function listActivities() {
      try {
        const response = await listDashboardActivities(user.id);
        const activitiesData = response.data;

        for (let item of activitiesData) {
          setActivities(prevState => [
            ...prevState,
            {
              id: item.id,
              userId: item.user,
              userName: item.user_name,
              userAvatarUrl: item.user_avatar_url,
              followingRelationId: item.following_relation,
              followingUserName: item.following_user_name,
              lessonId: item.lesson,
              lessonTitle: item.lesson_title,
              lessonScore: item.lesson_score,
              lessonTotal: item.lesson_total,
              updatedAt: item.updated_at,
            }
          ]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }

    async function getLessonsWordsNumber() {
      try {
        const response = await getLessonsWordsLearned(user.id);
        setLessonsLearned(response.data.lessons_learned);
        setWordsLearned(response.data.words_learned);

      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }

    if (user.id > 0) {
      listActivities();
      getLessonsWordsNumber();
    }

  }, [user.id]);

  return (
    <div className="sm-container d-flex flex-column pt-5">
      <div className="d-flex align-items-center m-auto gap-5">
        <Avatar avatarUrl={user.avatar_url} className="sm-avatar" />
        <div className="d-flex flex-column">
          <h4>{user.first_name} {user.last_name}</h4>
          <span>Learned {wordsLearned} words from {lessonsLearned} lessons </span>
        </div>
      </div>

      <hr />

      <div className="flex-fill mt-3">
        <h2>Activities</h2>
        <ActivityList activities={activities} />
      </div>
    </div>
  );
}

export default Dashboard;
