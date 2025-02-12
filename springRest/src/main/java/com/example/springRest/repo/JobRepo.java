package com.example.springRest.repo;

import com.example.springRest.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface JobRepo extends JpaRepository<JobPost,Integer> {


    List<JobPost> findAllByPostNameContainingOrPostDescContaining(String keyword, String keyword1);
}




//
//List<JobPost> jobs = new ArrayList<>();
//
//
//
//// constructor->injecting objects into ArrayList defined above.
//public JobRepo() {
//
//    // Java Developer Job Post
//    jobs.add(new JobPost(1, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
//            List.of("Core Java", "J2EE", "Spring Boot", "Hibernate")));
//
//    // Frontend Developer Job Post
//    jobs.add(new JobPost(2, "Frontend Developer", "Experience in building responsive web applications using React",
//            3, List.of("HTML", "CSS", "JavaScript", "React")));
//
//    // Data Scientist Job Post
//    jobs.add(new JobPost(3, "Data Scientist", "Strong background in machine learning and data analysis", 4,
//            List.of("Python", "Machine Learning", "Data Analysis")));
//
//
//
//}
//
//
//
//// method to return all JobPosts
//public List<JobPost> returnAllJobPosts() {
//    return jobs;
//}
//
//// method to save a job post object into arrayList
//public void addJobPost(JobPost job) {
//    System.out.println(job);
//    jobs.add(job);
//
//}
//
//public JobPost getJob(int postId) {
//
//    for(JobPost job : jobs) {
//        if (job.getPostId() == postId)
//            return job;
//    }
//
//    return null;
//}
//
//public void updateJob(JobPost jobPost) {
//    for(JobPost jobPost1 : jobs){
//        if(jobPost1.getPostId()==jobPost.getPostId()){
//
//            jobPost1.setPostName(jobPost.getPostName());
//            jobPost1.setPostDesc(jobPost.getPostDesc());
//            jobPost1.setReqExperience(jobPost.getReqExperience());
//            jobPost1.setTechStack(jobPost.getTechStack());
//        }
//    }
//
//}
//
//public void deleteJob(int postId) {
//    for(JobPost jobPost : jobs){
//        if(jobPost.getPostId() == postId){
//            jobs.remove(jobPost);
//        }
//    }
//}