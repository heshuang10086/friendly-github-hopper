
export interface Resume {
  id: string;
  file_name: string;
  file_path: string;
  parsed_content?: string | null;
  enhanced_content?: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  parse_status?: 'pending' | 'processing' | 'completed' | 'failed';
  candidate_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  preferred_position?: string | null;
  preferred_location?: string | null;
  work_years?: string | null;
  self_introduction?: string | null;
}
