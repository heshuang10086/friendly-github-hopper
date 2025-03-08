
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Resume } from "@/types/resume";

export const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isDeletingResume, setIsDeletingResume] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      const { data: resumeData, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && resumeData) {
        setResumes(resumeData);
      }
    };

    fetchResumes();
  }, []);

  const handleResumeView = async (resume: Resume) => {
    const { data } = await supabase.storage
      .from('resumes')
      .createSignedUrl(resume.file_path, 3600);

    if (data) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const handleResumeDelete = async (resume: Resume) => {
    if (!window.confirm('确定要删除这份简历吗？')) {
      return;
    }

    setIsDeletingResume(true);
    try {
      console.log("Deleting file from storage:", resume.file_path);
      
      // First delete the file from the storage bucket
      const { error: storageError, data: storageData } = await supabase.storage
        .from('resumes')
        .remove([resume.file_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        throw new Error('Failed to delete resume file from storage');
      }
      
      console.log("Storage deletion result:", storageData);

      // Then delete related data from other tables - using direct table references instead of a loop
      // Delete education records
      const { error: educationError } = await supabase
        .from('resume_education')
        .delete()
        .eq('resume_id', resume.id);
      
      if (educationError) {
        console.error('Error deleting education records:', educationError);
      }
      
      // Delete awards records
      const { error: awardsError } = await supabase
        .from('resume_awards')
        .delete()
        .eq('resume_id', resume.id);
      
      if (awardsError) {
        console.error('Error deleting awards records:', awardsError);
      }
      
      // Delete skills records
      const { error: skillsError } = await supabase
        .from('resume_skills')
        .delete()
        .eq('resume_id', resume.id);
      
      if (skillsError) {
        console.error('Error deleting skills records:', skillsError);
      }
      
      // Delete work experience records
      const { error: workError } = await supabase
        .from('resume_work_experience')
        .delete()
        .eq('resume_id', resume.id);
      
      if (workError) {
        console.error('Error deleting work experience records:', workError);
      }
      
      // Delete projects records
      const { error: projectsError } = await supabase
        .from('resume_projects')
        .delete()
        .eq('resume_id', resume.id);
      
      if (projectsError) {
        console.error('Error deleting projects records:', projectsError);
      }

      // Finally delete the resume record from the database
      const { error: dbError } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resume.id);

      if (dbError) {
        console.error('Database delete error:', dbError);
        throw dbError;
      }

      // Update local state after successful deletion
      setResumes(resumes.filter(r => r.id !== resume.id));
      toast.success("简历已成功删除");
    } catch (error) {
      console.error('Delete error:', error);
      toast.error("删除简历失败，请重试");
    } finally {
      setIsDeletingResume(false);
    }
  };

  return {
    resumes,
    isDeletingResume,
    handleResumeView,
    handleResumeDelete,
  };
};
