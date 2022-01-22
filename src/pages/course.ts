import { CourseData } from "@/components/courses/CourseData";
import axios from "axios";

export async function mapCourseData(coursesData: any[]): Promise<CourseData[]> {
  const mappedCoursesData: CourseData[] = [];
  const departmentMap = new Map<string, string>();
  const collegeMap = new Map<string, string>();
  const departments = axios.get(
    import.meta.env.VITE_APP_API_URL + "/departments"
  );
  const colleges = axios.get(import.meta.env.VITE_APP_API_URL + "/colleges");
  for (const department of (await departments).data.data)
    departmentMap.set(department.departmentId, department.departmentName);
  for (const college of (await colleges).data.data)
    collegeMap.set(college.collegeId, college.collegeName);

  for (const courseData of coursesData.map((course) => {
    return {
      ...course,
      collegeName: collegeMap.get(course.collegeId),
      departmentName: departmentMap.get(course.departmentId),
      classTimes: (JSON.parse(course.classTimes) as string[]).join(", "),
      teachers: (JSON.parse(course.teachers) as string[]).join(", "),
    };
  })) {
    mappedCoursesData.push(courseData);
  }
  return mappedCoursesData;
}
