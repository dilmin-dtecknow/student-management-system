package com.dilmin.backend.controller;

import com.dilmin.backend.dto.request.CourseRequestDTO;
import com.dilmin.backend.dto.response.CourseResponseDTO;
import com.dilmin.backend.entity.Course;
import com.dilmin.backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    private final ModelMapper modelMapper;

    @PostMapping
    public Course saveCourse(@RequestBody @Valid CourseRequestDTO courseDto) {
        Course course = modelMapper.map(courseDto, Course.class);
        return courseService.addCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable UUID id) {
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    public Course updateCourseById(@PathVariable UUID id, @RequestBody @Valid CourseRequestDTO courseDto) {
        Course course = modelMapper.map(courseDto, Course.class);
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourseById(@PathVariable UUID id) {
        courseService.deleteCourse(id);
    }
}
