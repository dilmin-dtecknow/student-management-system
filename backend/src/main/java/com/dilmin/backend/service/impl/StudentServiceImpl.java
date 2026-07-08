package com.dilmin.backend.service.impl;

import com.dilmin.backend.entity.Student;
import com.dilmin.backend.repository.StudentRepository;
import com.dilmin.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudent(UUID id) {
        return studentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Student not found"));
    }

    @Override
    public Student updateStudent(UUID id, Student student) {

        Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found"));

        existingStudent.setAddress(student.getAddress());
        existingStudent.setUser(student.getUser());
        existingStudent.setGender(student.getGender());
        existingStudent.setCourses(student.getCourses());


        return null;
    }

    @Override
    public void deleteStudent(UUID id) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found"));

        studentRepository.delete(existingStudent);
    }
}
