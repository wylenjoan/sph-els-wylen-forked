import { Activity } from "../interfaces/activity";
import formatRelativeDate from "../utils/formatRelativeDate";
import Avatar from "./Avatar";

interface Props {
  activities: Activity[];
}

function ActivityList({ activities }: Props) {
  const renderActivities = activities && (
    activities.map(({
      id,
      userName,
      userAvatarUrl,
      followingRelationId,
      followingUserName,
      lessonId,
      lessonTitle,
      lessonScore,
      lessonTotal,
      updatedAt
    }) => (
      <div key={id} className="activity-container">
        <Avatar className="sm-avatar" avatarUrl={userAvatarUrl} />
        <div>
          {
            followingRelationId &&
            <p className="activity-detail">
              <strong>{userName}</strong> followed <strong>{followingUserName}</strong>
            </p>
          }
          {
            lessonId &&
            <p className="activity-detail">
              <strong>{userName}</strong> learned {lessonScore} of {lessonTotal} words in <strong>{lessonTitle}</strong>
            </p>
          }
          <p className="caption">
            {formatRelativeDate(updatedAt)}
          </p>
        </div>
      </div>
    ))
  );

  return (
    <div>
      {renderActivities}
    </div>
  );
}

export default ActivityList;
