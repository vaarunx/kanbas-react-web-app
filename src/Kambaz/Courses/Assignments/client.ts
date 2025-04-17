/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (AssignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${AssignmentId}`
  );
  return response.data;
};

export const updateAssignment = async (Assignment: any) => {
  console.log("Assignment", Assignment);
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${Assignment._id}`,
    Assignment
  );
  return data;
};
