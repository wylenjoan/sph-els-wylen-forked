import axiosClient from "."

const listActivitiesByUser = async (userId: number) => {
  return await axiosClient.get(`activities?user=${userId}`)
}

export {
  listActivitiesByUser,
}
