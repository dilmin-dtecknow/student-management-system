package com.dilmin.backend.service.impl;

import com.dilmin.backend.entity.Course;
import com.dilmin.backend.repository.CourseRepository;
import com.dilmin.backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;

    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course getCourseById(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Course updateCourse(UUID id, Course updateCourse) {
        Course course = courseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found"));
        modelMapper.map(updateCourse, course);

        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(UUID id) {
        Course course = courseRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found"));
        courseRepository.delete(course);
    }
}
