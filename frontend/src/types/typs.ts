export interface UUIDItemProps {
  uuid: string;
}

export interface StudentUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface StudentRequest {
  userId: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  courseIds?: string[];
}

export interface CreateCourse {
  courseName: string;
  description?: string;
  duration: string;
  fee: number;
  status: "ACTIVE" | "INACTIVE";
}