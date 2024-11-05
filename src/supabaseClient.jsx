import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvuixmfkixjkahmqdriq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dWl4bWZraXhqa2FobXFkcmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1MjkyMTEsImV4cCI6MjA0NTEwNTIxMX0.XCu38JlPPtSaKf0JpS-O7YG--AAOBelstDxDPRfzWOk'; // Zadej zde svůj veřejný API klíč
export const supabase = createClient(supabaseUrl, supabaseKey);