/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (AssignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${AssignmentId}`);
  return response.data;
};

export const updateAssignment = async (Assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${Assignment._id}`, Assignment);
    return data;
  };