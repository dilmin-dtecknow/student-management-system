package com.dilmin.backend.service.impl;

import com.dilmin.backend.dto.request.StudentRequestDTO;
import com.dilmin.backend.entity.Course;
import com.dilmin.backend.entity.Student;
import com.dilmin.backend.entity.User;
import com.dilmin.backend.enums.Gender;
import com.dilmin.backend.repository.CourseRepository;
import com.dilmin.backend.repository.StudentRepository;
import com.dilmin.backend.repository.UserRepository;
import com.dilmin.backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Override
    public Student saveStudent(StudentRequestDTO studentDto) {

        User user = userRepository.findById(studentDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student  = new Student();
        student.setGender(Gender.valueOf(studentDto.getGender()));
        student.setUser(user);
        student.setAddress(studentDto.getAddress());

        if (studentDto.getCourseIds() != null && !studentDto.getCourseIds().isEmpty()) {
            Set<Course> courses = new HashSet<>(courseRepository.findAllById(studentDto.getCourseIds()));
            student.setCourses(courses);
        }

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

        modelMapper.map(student, existingStudent);
//        existingStudent.setAddress(student.getAddress());
//        existingStudent.setUser(student.getUser());
//        existingStudent.setGender(student.getGender());
//        existingStudent.setCourses(student.getCourses());


        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(UUID id) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Student not found"));

        studentRepository.delete(existingStudent);
    }
}
