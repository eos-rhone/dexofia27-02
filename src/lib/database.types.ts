export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ai_tools: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          category_id: string
          image_url: string | null
          website_url: string
          is_verified: boolean
          is_featured: boolean
          average_rating: number
          total_reviews: number
          monthly_users: number
          total_views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          category_id: string
          image_url?: string | null
          website_url: string
          is_verified?: boolean
          is_featured?: boolean
          average_rating?: number
          total_reviews?: number
          monthly_users?: number
          total_views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          category_id?: string
          image_url?: string | null
          website_url?: string
          is_verified?: boolean
          is_featured?: boolean
          average_rating?: number
          total_reviews?: number
          monthly_users?: number
          total_views?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          tool_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      tool_features: {
        Row: {
          id: string
          tool_id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      tool_pricing: {
        Row: {
          id: string
          tool_id: string
          plan_name: string
          price: number | null
          billing_period: string | null
          features: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          plan_name: string
          price?: number | null
          billing_period?: string | null
          features?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          plan_name?: string
          price?: number | null
          billing_period?: string | null
          features?: string[] | null
          created_at?: string
        }
      }
      tool_stats: {
        Row: {
          id: string
          tool_id: string
          date: string
          views: number
          clicks: number
          unique_visitors: number
          created_at: string
        }
        Insert: {
          id?: string
          tool_id: string
          date?: string
          views?: number
          clicks?: number
          unique_visitors?: number
          created_at?: string
        }
        Update: {
          id?: string
          tool_id?: string
          date?: string
          views?: number
          clicks?: number
          unique_visitors?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
