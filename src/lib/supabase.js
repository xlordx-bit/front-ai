import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vvoeugmnprttrmcolenj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2b2V1Z21ucHJ0dHJtY29sZW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNjg0MTAsImV4cCI6MjA3MDg0NDQxMH0.vxc67YnPzzv-hrPkI7X4OIGr5OGle3Fg4gMLfOZYDpM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
