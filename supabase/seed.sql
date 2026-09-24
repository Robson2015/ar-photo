-- Données d'exemple pour démarrer le portfolio

insert into public.categories (name, slug, image, description)
values
  ('Mariage', 'mariage', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80', 'Séances de mariage au cœur des moments les plus précieux.'),
  ('Portrait', 'portrait', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', 'Portraits élégants, naturels et authentiques.'),
  ('Famille', 'famille', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80', 'Des souvenirs familiaux capturés dans la simplicité.'),
  ('Événement', 'evenement', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80', 'Reportages dynamiques pour les événements marquants.'),
  ('Paysage', 'paysage', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', 'Paysages immersifs et lumineux, au fil de la nature.')
on conflict (slug) do nothing;

insert into public.about (title, image, content_1, content_2, content_3)
values (
  'La photographie, une passion avant tout',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  'Je ne suis pas photographe professionnel : je photographie par passion et par envie de garder une trace des beaux instants.',
  'Je capture mes images avec mon téléphone ou mon appareil photo numérique, selon le moment, la lumière et l’inspiration.',
  'À travers chaque photo, je cherche à transmettre une émotion, une ambiance et un souvenir authentique.'
)
on conflict do nothing;

-- Met à jour le contenu si la ligne About existe déjà dans la base.
update public.about
set
  title = 'La photographie, une passion avant tout',
  content_1 = 'Je ne suis pas photographe professionnel : je photographie par passion et par envie de garder une trace des beaux instants.',
  content_2 = 'Je capture mes images avec mon téléphone ou mon appareil photo numérique, selon le moment, la lumière et l’inspiration.',
  content_3 = 'À travers chaque photo, je cherche à transmettre une émotion, une ambiance et un souvenir authentique.'
where id = (select id from public.about order by id limit 1);

-- Exemple de photo si vous voulez tester la galerie.
-- Remplacez les noms de fichiers par vos vrais fichiers uploadés dans le bucket "photos".
insert into public.photos (title, description, filename, category)
values
  ('Portrait en studio', 'Séance portrait élégante et lumineuse.', 'portrait-1.jpg', 'portrait'),
  ('Cérémonie de mariage', 'Un moment précieux dans un cadre romantique.', 'mariage-1.jpg', 'mariage'),
  ('Séance famille', 'Des images spontanées et pleines d’émotion.', 'famille-1.jpg', 'famille'),
  ('Événement festif', 'L’énergie du moment capturée en images.', 'evenement-1.jpg', 'evenement'),
  ('Paysage au lever du soleil', 'Une scène calme et immersive.', 'paysage-1.jpg', 'paysage')
on conflict (filename) do nothing;
