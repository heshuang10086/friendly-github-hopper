export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          applicant_id: string
          created_at: string
          id: string
          job_id: string
          resume_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          applicant_id: string
          created_at?: string
          id?: string
          job_id: string
          resume_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          applicant_id?: string
          created_at?: string
          id?: string
          job_id?: string
          resume_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_history: {
        Row: {
          created_at: string
          id: string
          message: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_name: string
          created_at: string
          description: string
          id: string
          location: string | null
          recruiter_id: string
          requirements: string | null
          salary_range: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          description: string
          id?: string
          location?: string | null
          recruiter_id: string
          requirements?: string | null
          salary_range?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          description?: string
          id?: string
          location?: string | null
          recruiter_id?: string
          requirements?: string | null
          salary_range?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      resume_awards: {
        Row: {
          award_name: string
          award_year: string | null
          created_at: string
          id: string
          resume_id: string
          updated_at: string
        }
        Insert: {
          award_name: string
          award_year?: string | null
          created_at?: string
          id?: string
          resume_id: string
          updated_at?: string
        }
        Update: {
          award_name?: string
          award_year?: string | null
          created_at?: string
          id?: string
          resume_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_awards_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_education: {
        Row: {
          created_at: string
          education_level: string | null
          id: string
          major: string
          resume_id: string
          school: string
          study_period: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          education_level?: string | null
          id?: string
          major: string
          resume_id: string
          school: string
          study_period?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          education_level?: string | null
          id?: string
          major?: string
          resume_id?: string
          school?: string
          study_period?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_education_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_projects: {
        Row: {
          created_at: string
          id: string
          project_description: string | null
          project_name: string
          project_period: string | null
          responsibilities: string | null
          resume_id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_description?: string | null
          project_name: string
          project_period?: string | null
          responsibilities?: string | null
          resume_id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          project_description?: string | null
          project_name?: string
          project_period?: string | null
          responsibilities?: string | null
          resume_id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_projects_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_skills: {
        Row: {
          created_at: string
          description: string | null
          id: string
          proficiency: string | null
          resume_id: string
          skill_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          proficiency?: string | null
          resume_id: string
          skill_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          proficiency?: string | null
          resume_id?: string
          skill_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_skills_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_work_experience: {
        Row: {
          company_name: string
          created_at: string
          department: string | null
          id: string
          job_description: string | null
          position: string | null
          resume_id: string
          updated_at: string
          work_period: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          department?: string | null
          id?: string
          job_description?: string | null
          position?: string | null
          resume_id: string
          updated_at?: string
          work_period?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          department?: string | null
          id?: string
          job_description?: string | null
          position?: string | null
          resume_id?: string
          updated_at?: string
          work_period?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_work_experience_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          candidate_name: string | null
          created_at: string
          email: string | null
          enhanced_content: string | null
          file_name: string
          file_path: string
          id: string
          parse_status:
            | Database["public"]["Enums"]["resume_parse_status"]
            | null
          parsed_content: string | null
          phone_number: string | null
          preferred_location: string | null
          preferred_position: string | null
          self_introduction: string | null
          updated_at: string
          user_id: string
          work_years: string | null
        }
        Insert: {
          candidate_name?: string | null
          created_at?: string
          email?: string | null
          enhanced_content?: string | null
          file_name: string
          file_path: string
          id?: string
          parse_status?:
            | Database["public"]["Enums"]["resume_parse_status"]
            | null
          parsed_content?: string | null
          phone_number?: string | null
          preferred_location?: string | null
          preferred_position?: string | null
          self_introduction?: string | null
          updated_at?: string
          user_id: string
          work_years?: string | null
        }
        Update: {
          candidate_name?: string | null
          created_at?: string
          email?: string | null
          enhanced_content?: string | null
          file_name?: string
          file_path?: string
          id?: string
          parse_status?:
            | Database["public"]["Enums"]["resume_parse_status"]
            | null
          parsed_content?: string | null
          phone_number?: string | null
          preferred_location?: string | null
          preferred_position?: string | null
          self_introduction?: string | null
          updated_at?: string
          user_id?: string
          work_years?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      resume_parse_status: "pending" | "processing" | "completed" | "failed"
      user_role: "job_seeker" | "recruiter" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
