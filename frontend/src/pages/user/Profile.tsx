import axios from "axios";
import { useMemo, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { listActivitiesByUser } from "../../apiClient/activityService";
import { checkRelationExists, followUser, unfollowUser } from "../../apiClient/relationService";
import { getUserProfile } from "../../apiClient/userService";
import ActivityList from "../../components/ActivityList";
import Avatar from "../../components/Avatar";
import FollowListModal from "../../components/FollowListModal";
import useAuth from "../../hooks/useAuth";
import { Activity } from "../../interfaces/activity";
import { UserProfileRelations } from "../../interfaces/user";


function Profile() {
  const { user } = useAuth();

  let [searchParams] = useSearchParams();
  const userParamsId = Number(searchParams.get("user"));

  const [showFollowerListModal, setShowFollowerListModal] = useState<boolean>(false);
  const [showFollowingListModal, setShowFollowingListModal] = useState<boolean>(false);

  const [profile, setProfile] = useState<UserProfileRelations>({
    id: 0,
    full_name: '',
    avatar_url: '',
    following_number: 0,
    following_relation: [],
    follower_number: 0,
    follower_relation: [],
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const handleCloseFollowerListModal = () => setShowFollowerListModal(false);
  const handleShowFollowerListModal = () => setShowFollowerListModal(true);

  const handleCloseFollowingListModal = () => setShowFollowingListModal(false);
  const handleShowFollowingListModal = () => setShowFollowingListModal(true);

  useMemo(() => {
    async function listActivities() {
      try {
        const response = await listActivitiesByUser(userParamsId);
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

    async function getProfile() {
      try {
        const response = await getUserProfile(userParamsId);
        const profileData = response.data;
        setProfile(profileData);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }

    listActivities();
    getProfile();
  }, [userParamsId]);

  useMemo(() => {
    async function checkFollowing() {
      try {
        const response = await checkRelationExists(user.id, userParamsId);
        const exists = response.data.exists;
        setIsFollowing(exists);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`);
        }
      }
    }
    checkFollowing();
  }, [user.id, userParamsId]);

  async function handleFollow() {
    try {
      const response = await followUser(user.id, userParamsId);
      if (response.status === 201) {
        setIsFollowing(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  async function handleUnfollow() {
    try {
      const response = await unfollowUser(user.id, userParamsId);
      if (response.status === 204) {
        setIsFollowing(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  const renderButton = user.id !== userParamsId && (
    isFollowing ? (
      <button
        className="btn btn-sm btn-primary"
        onClick={handleUnfollow}
      >
        Unfollow
      </button>
    ) : (
      <button
        className="btn btn-sm btn-primary"
        onClick={handleFollow}
      >
        Follow
      </button>
    )
  );

  return (
    <div className="sm-container d-flex flex-column pt-5">
      <div className="d-flex align-items-start m-auto gap-5">
        <Avatar avatarUrl={profile.avatar_url} className="sm-avatar" />
        <div className="d-flex flex-column">
          <h4>{profile.full_name}</h4>
          <div className="d-flex gap-2 align-items-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={handleShowFollowerListModal}
            >
              {profile.follower_number} {profile.follower_number > 1 ? 'followers' : 'follower'}
            </button>
            <span>•</span>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleShowFollowingListModal}
            >
              {profile.following_number} following
            </button>
          </div>
        </div>
        {renderButton}
      </div>

      <hr />

      <div className="flex-fill mt-3">
        <h2>Activities</h2>
        <ActivityList activities={activities} />
      </div>

      <FollowListModal
        title="Followers"
        show={showFollowerListModal}
        handleClose={handleCloseFollowerListModal}
      >
        {profile.follower_relation.length > 0 ?
          (
            <ListGroup>
              {profile.follower_relation.map(({ id, follower_user_name }) => (
                <ListGroup.Item key={id}>
                  {follower_user_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : <p className="fst-italic text-center">No followers</p>
        }
      </FollowListModal>

      <FollowListModal
        title="Following"
        show={showFollowingListModal}
        handleClose={handleCloseFollowingListModal}
      >
        {profile.following_relation.length > 0 ?
          (
            <ListGroup>
              {profile.following_relation.map(({ id, following_user_name }) => (
                <ListGroup.Item key={id}>
                  {following_user_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : <p className="fst-italic text-center">No followers</p>
        }
      </FollowListModal>

    </div>
  );

}

export default Profile;
