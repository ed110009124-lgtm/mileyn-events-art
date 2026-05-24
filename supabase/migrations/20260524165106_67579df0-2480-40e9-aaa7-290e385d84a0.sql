
CREATE TABLE public.site_content (
  id text PRIMARY KEY DEFAULT 'singleton',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT singleton_check CHECK (id = 'singleton')
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site content"
  ON public.site_content FOR SELECT
  USING (true);

CREATE POLICY "Public can insert site content"
  ON public.site_content FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update site content"
  ON public.site_content FOR UPDATE
  USING (true)
  WITH CHECK (true);

INSERT INTO public.site_content (id, data) VALUES ('singleton', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view site images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-images');

CREATE POLICY "Public can upload site images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Public can update site images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'site-images');

CREATE POLICY "Public can delete site images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'site-images');
