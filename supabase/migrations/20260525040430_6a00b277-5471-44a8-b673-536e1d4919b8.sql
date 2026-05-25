
-- site_content: keep public read, restrict writes to authenticated users
DROP POLICY IF EXISTS "Public can update site content" ON public.site_content;
DROP POLICY IF EXISTS "Public can insert site content" ON public.site_content;

CREATE POLICY "Authenticated can insert site content"
  ON public.site_content FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can update site content"
  ON public.site_content FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- storage.objects for site-images bucket: drop listing + restrict writes to authenticated
DROP POLICY IF EXISTS "Public can view site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can update site images" ON storage.objects;
DROP POLICY IF EXISTS "Public can delete site images" ON storage.objects;

CREATE POLICY "Authenticated can upload site images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated can update site images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images') WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated can delete site images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-images');
