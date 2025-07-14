// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bjrtzxwokhhcuagonduz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqcnR6eHdva2hoY3VhZ29uZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0ODExNzQsImV4cCI6MjA2ODA1NzE3NH0.bnJapkGRtwCyU_OvEtVVHKXWYyDlX0d0AhrPV9HVEi8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)