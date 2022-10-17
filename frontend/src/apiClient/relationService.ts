import axiosClient from ".";
import apiUrls from "../constants/apiUrls";

const checkRelationExists = async (followerId: number, followingId: number) => {
  return await axiosClient.get(`relation_exists?follower=${followerId}&following=${followingId}`);
};

const getRelation = async (followerId: number, followingId: number) => {
  return await axiosClient.get(`get_relation?follower=${followerId}&following=${followingId}`);
};

const followUser = async (followerId: number, followingId: number) => {
  return axiosClient.post(`${apiUrls.FOLLOW}`, {
    "follower_user": followerId,
    "following_user": followingId,
  });
};

const unfollowUser = async (followerId: number, followingId: number) => {
  const relationResponse = await getRelation(followerId, followingId);
  const relation = relationResponse.data;
  return axiosClient.delete(`${apiUrls.UNFOLLOW}${relation.id}`);
};

export {
  checkRelationExists,
  getRelation,
  followUser,
  unfollowUser,
};
