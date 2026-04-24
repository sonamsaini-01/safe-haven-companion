
-- Add evidence_urls column to store uploaded media links
ALTER TABLE public.incident_reports
ADD COLUMN IF NOT EXISTS evidence_urls text[] DEFAULT '{}'::text[];

-- Create private storage bucket for incident evidence
INSERT INTO storage.buckets (id, name, public)
VALUES ('incident-evidence', 'incident-evidence', false)
ON CONFLICT (id) DO NOTHING;

-- Users can upload files inside their own user_id folder
CREATE POLICY "Users can upload their own evidence"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'incident-evidence'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own evidence
CREATE POLICY "Users can view their own evidence"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'incident-evidence'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all evidence
CREATE POLICY "Admins can view all evidence"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'incident-evidence'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Users can delete their own evidence
CREATE POLICY "Users can delete their own evidence"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'incident-evidence'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
