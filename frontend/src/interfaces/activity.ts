export interface Activity {
  id: number;
  userId: number,
  userName: string,
  userAvatarUrl: string,
  followingRelationId?: number,
  followingUserName?: string,
  lessonId?: number,
  lessonTitle?: string,
  lessonScore?: number,
  lessonTotal?: number,
  updatedAt: string,
}
