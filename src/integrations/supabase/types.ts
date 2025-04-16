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
      image_bank: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          is_favorite: boolean | null
          name: string
          tags: string[] | null
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          name: string
          tags?: string[] | null
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          name?: string
          tags?: string[] | null
          url?: string
        }
        Relationships: []
      }
      participant_answers: {
        Row: {
          answered_at: string | null
          id: string
          participant_id: string | null
          question_id: string | null
          selected_options: string[]
        }
        Insert: {
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
          selected_options: string[]
        }
        Update: {
          answered_at?: string | null
          id?: string
          participant_id?: string | null
          question_id?: string | null
          selected_options?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "participant_answers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_options: {
        Row: {
          created_at: string | null
          id: string
          image_url: string | null
          image_urls: string[] | null
          option_order: number
          question_id: string | null
          score: number
          style_id: string
          text: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          option_order: number
          question_id?: string | null
          score?: number
          style_id: string
          text: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string | null
          image_urls?: string[] | null
          option_order?: number
          question_id?: string | null
          score?: number
          style_id?: string
          text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_participants: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          email: string
          id: string
          ip_address: string | null
          name: string
          primary_style: string | null
          quiz_id: string | null
          secondary_styles: string[] | null
          started_at: string | null
          style_scores: Json | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          email: string
          id?: string
          ip_address?: string | null
          name: string
          primary_style?: string | null
          quiz_id?: string | null
          secondary_styles?: string[] | null
          started_at?: string | null
          style_scores?: Json | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          email?: string
          id?: string
          ip_address?: string | null
          name?: string
          primary_style?: string | null
          quiz_id?: string | null
          secondary_styles?: string[] | null
          started_at?: string | null
          style_scores?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_participants_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          columns_count: number
          created_at: string | null
          display_type: string
          id: string
          image_size: string
          question_order: number
          quiz_id: string | null
          required_selections: number
          subtitle: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          columns_count?: number
          created_at?: string | null
          display_type: string
          id?: string
          image_size?: string
          question_order: number
          quiz_id?: string | null
          required_selections?: number
          subtitle?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          columns_count?: number
          created_at?: string | null
          display_type?: string
          id?: string
          image_size?: string
          question_order?: number
          quiz_id?: string | null
          required_selections?: number
          subtitle?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_settings: {
        Row: {
          created_at: string | null
          id: string
          meta_pixel_id: string | null
          quiz_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meta_pixel_id?: string | null
          quiz_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meta_pixel_id?: string | null
          quiz_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_settings_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: true
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          cover_image: string | null
          cover_settings: Json | null
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          cover_settings?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          cover_settings?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      style_results: {
        Row: {
          created_at: string
          id: string
          participant_id: string
          primary_style: string
          quiz_id: string
          secondary_styles: string[]
          style_counts: Json
        }
        Insert: {
          created_at?: string
          id?: string
          participant_id: string
          primary_style: string
          quiz_id: string
          secondary_styles: string[]
          style_counts: Json
        }
        Update: {
          created_at?: string
          id?: string
          participant_id?: string
          primary_style?: string
          quiz_id?: string
          secondary_styles?: string[]
          style_counts?: Json
        }
        Relationships: [
          {
            foreignKeyName: "style_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "style_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      style_types: {
        Row: {
          description: string
          id: string
          image_url: string | null
          name: string
        }
        Insert: {
          description: string
          id: string
          image_url?: string | null
          name: string
        }
        Update: {
          description?: string
          id?: string
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_style_result: {
        Args: { p_participant_id: string; p_quiz_id: string }
        Returns: {
          created_at: string
          id: string
          participant_id: string
          primary_style: string
          quiz_id: string
          secondary_styles: string[]
          style_counts: Json
        }[]
      }
      insert_style_result: {
        Args: {
          p_participant_id: string
          p_quiz_id: string
          p_primary_style: string
          p_secondary_styles: string[]
          p_style_counts: Json
        }
        Returns: string
      }
      update_style_result: {
        Args: {
          p_id: string
          p_primary_style: string
          p_secondary_styles: string[]
          p_style_counts: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
