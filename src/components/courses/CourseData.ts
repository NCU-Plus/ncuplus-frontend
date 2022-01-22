export interface CourseData {
  id: number;
  year: number;
  // 上 / 下
  semester: string;
  serialNo: number;
  classNo: string;
  title: string;
  credit: number;
  passwordCard: string;
  teachers: string;
  classTimes: string;
  limitCnt: number;
  admitCnt: number;
  waitCnt: number;
  collegeName: string;
  departmentName: string;
  courseType: string;
}
