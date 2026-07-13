package com.dilmin.backend.controller;

import com.dilmin.backend.dto.request.EnrollCourseRequestDTO;
import com.dilmin.backend.dto.request.StudentRequestDTO;
import com.dilmin.backend.dto.response.StudentResponseDTO;
import com.dilmin.backend.entity.Student;
import com.dilmin.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final ModelMapper modelMapper;

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping
    public Student saveStudent(@Valid @RequestBody StudentRequestDTO studentDto) {

//        Student student = modelMapper.map(studentDto, Student.class);

        return studentService.saveStudent(studentDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getStudents();
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable UUID id) {
        return studentService.getStudent(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PutMapping("/{id}")
    public Student updateStudent(@Valid @PathVariable UUID id, @RequestBody StudentRequestDTO studentDto) {
        Student student = modelMapper.map(studentDto, Student.class);

        return studentService.updateStudent(id,student);
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @PostMapping("/{studentId}/courses")
    public Student enrollCourse(@PathVariable UUID studentId, @RequestBody EnrollCourseRequestDTO dto) {
        return studentService.enrollCourse(studentId, dto.getCourseIds());
    }

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @DeleteMapping("/{studentId}/courses/{courseId}")
    public Student removeCourse(@PathVariable UUID studentId,@PathVariable UUID courseId) {
        return studentService.removeCourse(studentId, courseId);
    }

    @GetMapping("/my")
    public ResponseEntity<StudentResponseDTO> getMyProfile(Authentication authentication) {
        StudentResponseDTO student = studentService.getMyProfile(authentication.getName());
        return ResponseEntity.ok(student);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudent(id);
    }
}
