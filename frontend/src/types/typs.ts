interface UUIDItemProps {
    uuid: string;
}

interface StudentUser{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    password:string;
}

interface StudentRequest {
  userId: string;        
  address: string;       
  gender: "MALE" | "FEMALE" | "OTHER"; // enum-like string
  courseIds?: string[];   // array of UUIDs
}
