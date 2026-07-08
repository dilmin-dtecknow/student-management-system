package com.dilmin.backend.service;

import com.dilmin.backend.entity.Course;

import java.util.List;
import java.util.UUID;

public interface CourseService {
    Course addCourse(Course course);
    List<Course> getCourses();
    Course getCourseById(UUID id);
    Course updateCourse(UUID id, Course course);
    void deleteCourse(UUID id);
}
