-- AprovaZap — Schema (idempotent: pode rodar múltiplas vezes)

create extension if not exists "uuid-ossp";

-- Enum (drop e recria com segurança)
do $$ begin
  create type post_status as enum ('pending', 'approved', 'rejected');
exception
  when duplicate_object then null;
end $$;

-- Clients
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  created_at timestamptz default now()
);

-- Posts
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  date date not null,
  theme text not null,
  description text not null,
  hashtags text default '',
  media_url text,
  docs_url text,
  status post_status default 'pending',
  created_at timestamptz default now()
);

-- Approval tokens (link de aprovação)
create table if not exists approval_tokens (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  token text not null unique default uuid_generate_v4()::text,
  expires_at timestamptz default now() + interval '7 days',
  used boolean default false,
  created_at timestamptz default now()
);

-- Approval codes (código WhatsApp)
create table if not exists approval_codes (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  code text not null,
  expires_at timestamptz default now() + interval '10 minutes',
  used boolean default false,
  created_at timestamptz default now()
);

-- Approvals (decisões do cliente)
create table if not exists approvals (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  status post_status not null,
  note text,
  approved_at timestamptz default now()
);

-- Settings (configurações da ferramenta)
create table if not exists app_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- Seed das keys de settings (ignora se já existe)
insert into app_settings (key, value) values
  ('evolution_api_url', ''),
  ('evolution_api_key', ''),
  ('evolution_instance', '')
on conflict (key) do nothing;

-- Indexes (if not exists via DO block)
create index if not exists posts_client_id_idx on posts(client_id);
create index if not exists posts_status_idx on posts(status);
create index if not exists approval_tokens_token_idx on approval_tokens(token);
create index if not exists approval_codes_client_idx on approval_codes(client_id, used);

-- RLS
alter table clients enable row level security;
alter table posts enable row level security;
alter table approval_tokens enable row level security;
alter table approval_codes enable row level security;
alter table approvals enable row level security;
alter table app_settings enable row level security;

-- Políticas (drop e recria para idempotência)
do $$ begin
  drop policy if exists "allow_all" on clients;
  drop policy if exists "allow_all" on posts;
  drop policy if exists "allow_all" on approval_tokens;
  drop policy if exists "allow_all" on approval_codes;
  drop policy if exists "allow_all" on approvals;
  drop policy if exists "allow_all" on app_settings;
end $$;

create policy "allow_all" on clients for all using (true);
create policy "allow_all" on posts for all using (true);
create policy "allow_all" on approval_tokens for all using (true);
create policy "allow_all" on approval_codes for all using (true);
create policy "allow_all" on approvals for all using (true);
create policy "allow_all" on app_settings for all using (true);
