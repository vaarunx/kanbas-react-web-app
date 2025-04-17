/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enroll`;

export const getEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENT_API}`);
  return response.data;
};

export const enrollCourse = async (user: any, course: any) => {
  const data  = await axios.put(`${ENROLLMENT_API}/${user}/${course}`);
  return data.data;
};

export const unenrollCourse = async (user: any, course: any) => {
  const { data } = await axios.delete(`${ENROLLMENT_API}/${user}/${course}`);
  return data;
};

