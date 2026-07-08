package com.dilmin.backend.service;

import com.dilmin.backend.dto.request.StudentRequestDTO;
import com.dilmin.backend.entity.Student;

import java.util.List;
import java.util.UUID;

public interface StudentService {
    Student saveStudent(StudentRequestDTO student);
    List<Student> getStudents();
    Student getStudent(UUID id);
    Student updateStudent(UUID id,Student student);

    void deleteStudent(UUID id);
}
