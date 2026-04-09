# AprovaZap — Arquitetura

## Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Styles**: Tailwind CSS (dark mode via class)
- **Backend**: Next.js API Routes (serverless)
- **DB**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Deploy**: Vercel

## Fluxos

### Admin
```
Login → Dashboard → Clientes → Criar Posts → Enviar Link WhatsApp → Ver Status
```

### Cliente
```
Abrir Link → Ver Posts → Aprovar/Rejeitar → Receber Código WhatsApp → Confirmar
```

## Estrutura de Pastas
```
aprovazap/
├── app/
│   ├── (admin)/           # Área admin (requer session)
│   │   ├── dashboard/
│   │   ├── clients/
│   │   └── posts/
│   ├── (public)/          # Área pública (sem login)
│   │   └── approve/[token]/
│   ├── api/
│   │   ├── approve/       # Aprovar/rejeitar post
│   │   ├── verify-code/   # Verificar código
│   │   └── send-code/     # Enviar código WhatsApp
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                # Primitivos (Button, Badge, Card...)
│   ├── admin/             # Componentes da área admin
│   └── client/            # Componentes da área cliente
├── lib/
│   ├── supabase/          # Cliente Supabase
│   ├── whatsapp.ts        # Integração WhatsApp (Evolution/Zapi)
│   └── utils.ts
├── types/
│   └── index.ts
└── UI_GUIDELINES.md
```

## Banco de Dados (Supabase)

### clients
| Campo       | Tipo    | Descrição           |
|-------------|---------|---------------------|
| id          | uuid PK |                     |
| name        | text    | Nome do cliente     |
| phone       | text    | WhatsApp (+55...)   |
| created_at  | timestamp |                   |

### posts
| Campo        | Tipo    | Descrição                  |
|--------------|---------|----------------------------|
| id           | uuid PK |                            |
| client_id    | uuid FK |                            |
| date         | date    | Data do post               |
| theme        | text    | Tema do post               |
| description  | text    | Texto/descritivo           |
| hashtags     | text    | Hashtags                   |
| media_url    | text    | Link pasta de mídias       |
| docs_url     | text    | Link descritivos           |
| status       | enum    | pending/approved/rejected  |
| created_at   | timestamp |                          |

### approval_tokens
| Campo       | Tipo    | Descrição                  |
|-------------|---------|----------------------------|
| id          | uuid PK |                            |
| client_id   | uuid FK |                            |
| token       | text    | UUID único do link         |
| expires_at  | timestamp |                          |
| used        | boolean |                            |

### approval_codes
| Campo       | Tipo    | Descrição                  |
|-------------|---------|----------------------------|
| id          | uuid PK |                            |
| client_id   | uuid FK |                            |
| code        | text    | 6 dígitos                  |
| expires_at  | timestamp | 10 minutos               |
| used        | boolean |                            |

### approvals
| Campo       | Tipo    | Descrição                  |
|-------------|---------|----------------------------|
| id          | uuid PK |                            |
| post_id     | uuid FK |                            |
| client_id   | uuid FK |                            |
| status      | enum    | approved/rejected          |
| note        | text    | Obs do cliente (opcional)  |
| approved_at | timestamp |                          |
