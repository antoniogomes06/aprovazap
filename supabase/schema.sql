-- AprovaZap — Schema

create extension if not exists "uuid-ossp";

-- Clients
create table clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  created_at timestamptz default now()
);

-- Posts
create type post_status as enum ('pending', 'approved', 'rejected');

create table posts (
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
create table approval_tokens (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  token text not null unique default uuid_generate_v4()::text,
  expires_at timestamptz default now() + interval '7 days',
  used boolean default false,
  created_at timestamptz default now()
);

-- Approval codes (código WhatsApp)
create table approval_codes (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  code text not null,
  expires_at timestamptz default now() + interval '10 minutes',
  used boolean default false,
  created_at timestamptz default now()
);

-- Approvals (decisões do cliente)
create table approvals (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references posts(id) on delete cascade,
  client_id uuid references clients(id) on delete cascade,
  status post_status not null,
  note text,
  approved_at timestamptz default now()
);

-- Indexes
create index on posts(client_id);
create index on posts(status);
create index on approval_tokens(token);
create index on approval_codes(client_id, used);

-- RLS: enable but keep permissive for MVP
alter table clients enable row level security;
alter table posts enable row level security;
alter table approval_tokens enable row level security;
alter table approval_codes enable row level security;
alter table approvals enable row level security;

-- Allow all for now (lock down later with auth)
create policy "allow_all" on clients for all using (true);
create policy "allow_all" on posts for all using (true);
create policy "allow_all" on approval_tokens for all using (true);
create policy "allow_all" on approval_codes for all using (true);
create policy "allow_all" on approvals for all using (true);
