# AprovaZap — UI Guidelines

## Conceito Visual

Minimalista, moderno, premium. Inspirado em apps SaaS de alta conversão.
Sensação de app nativo — fluido, responsivo, sem fricção.

---

## Paleta de Cores

### Base (Dark Mode — padrão)
| Token              | Hex       | Uso                        |
|--------------------|-----------|----------------------------|
| `bg-primary`       | `#0D0E14` | Fundo principal            |
| `bg-secondary`     | `#13141C` | Cards, painéis             |
| `bg-tertiary`      | `#1A1C27` | Inputs, hover              |
| `border`           | `#252736` | Bordas sutis               |
| `text-primary`     | `#F0F0F5` | Títulos                    |
| `text-secondary`   | `#8B8FA8` | Subtexto, labels           |
| `text-muted`       | `#4B4F68` | Placeholders               |

### Base (Light Mode)
| Token              | Hex       | Uso                        |
|--------------------|-----------|----------------------------|
| `bg-primary`       | `#F8F9FC` | Fundo principal            |
| `bg-secondary`     | `#FFFFFF` | Cards, painéis             |
| `bg-tertiary`      | `#F0F2F8` | Inputs, hover              |
| `border`           | `#E2E5F0` | Bordas sutis               |
| `text-primary`     | `#0D0E14` | Títulos                    |
| `text-secondary`   | `#5A5E78` | Subtexto                   |
| `text-muted`       | `#9B9FB8` | Placeholders               |

### Acentos (ambos os temas)
| Token          | Hex       | Uso                              |
|----------------|-----------|----------------------------------|
| `accent`       | `#6366F1` | Principal (indigo)               |
| `accent-hover` | `#4F46E5` | Hover                            |
| `accent-light` | `#818CF8` | Texto com acento, ícones         |
| `success`      | `#22C55E` | Aprovado                         |
| `success-bg`   | `#14532D` | Badge aprovado (dark)            |
| `danger`       | `#EF4444` | Rejeitado                        |
| `danger-bg`    | `#7F1D1D` | Badge rejeitado (dark)           |
| `warning`      | `#F59E0B` | Pendente                         |
| `warning-bg`   | `#78350F` | Badge pendente (dark)            |

---

## Tipografia

Font family: **Inter** (Google Fonts)

| Estilo       | Size     | Weight | Uso                     |
|--------------|----------|--------|-------------------------|
| Display      | 28–32px  | 700    | Títulos de página       |
| Heading      | 20–24px  | 600    | Títulos de seção        |
| Subheading   | 16–18px  | 600    | Cards, labels           |
| Body         | 14–16px  | 400    | Corpo de texto          |
| Caption      | 12px     | 400    | Labels, metadados       |
| Code         | 20–24px  | 700    | Código de aprovação     |

---

## Espaçamento

Base: 4px (rem: 0.25rem)

| Token  | px   | Uso típico              |
|--------|------|-------------------------|
| `xs`   | 4px  | Ícones internos         |
| `sm`   | 8px  | Gap entre elementos     |
| `md`   | 16px | Padding de cards        |
| `lg`   | 24px | Padding de seções       |
| `xl`   | 32px | Margens de página       |
| `2xl`  | 48px | Espaço entre seções     |

---

## Border Radius

| Token   | px    | Uso                     |
|---------|-------|-------------------------|
| `sm`    | 6px   | Badges, tags            |
| `md`    | 10px  | Inputs, botões          |
| `lg`    | 16px  | Cards                   |
| `xl`    | 20px  | Modais, painéis         |
| `full`  | 9999  | Avatars, toggles        |

---

## Componentes Base

### Botão Primário
```
bg: accent (#6366F1)
hover: accent-hover (#4F46E5)
text: white
radius: 10px
padding: 14px 24px
font: 15px / 600
shadow: 0 4px 12px rgba(99,102,241,0.3)
```

### Botão Secundário
```
bg: bg-tertiary
border: 1px border
hover: accent/10
text: text-primary
```

### Botão Aprovar (grande, mobile)
```
bg: success (#22C55E)
text: white
width: 100%
height: 56px
radius: 14px
font: 16px / 700
shadow: 0 4px 16px rgba(34,197,94,0.25)
```

### Botão Rejeitar (grande, mobile)
```
bg: danger (#EF4444)
text: white
width: 100%
height: 56px
radius: 14px
```

### Card de Post
```
bg: bg-secondary
border: 1px border
radius: 16px
padding: 20px
shadow: sutil
```

### Badge de Status
```
Aprovado:  bg success-bg, text success, radius full, px 10 py 4
Rejeitado: bg danger-bg,  text danger
Pendente:  bg warning-bg, text warning
```

### Input de Código
```
bg: bg-tertiary
border: 1.5px accent (focus)
radius: 10px
text: 24px / 700 / centrado (tracking-widest)
height: 56px
```

---

## Estados

| Estado     | Comportamento visual                                  |
|------------|-------------------------------------------------------|
| Default    | Opacidade 100%, border sutil                          |
| Hover      | bg levemente mais claro, border accent               |
| Focus      | border accent 1.5px, ring accent/20                  |
| Active     | Scale 0.98, sombra menor                              |
| Aprovado   | Borda verde, badge verde, ícone check                 |
| Rejeitado  | Borda vermelha, badge vermelho, ícone X               |
| Pendente   | Borda laranja/amarela, badge warning                  |
| Loading    | Skeleton shimmer ou spinner accent                    |
| Disabled   | Opacidade 40%, cursor not-allowed                     |

---

## Calendário Mobile

Inspirado em apps de agenda premium:
- Grid 7 colunas (Dom–Sab)
- Célula: 40px × 40px
- Dia com post: ponto accent ou bg accent/20
- Dia selecionado: bg accent, text white, radius full
- Mês atual: text-primary; outros meses: text-muted
- Swipe horizontal entre meses

---

## Dark Mode Toggle

Posição: canto superior direito (fixo no header)
- Ícone 🌙 → dark (padrão)
- Ícone ☀️ → light
- Transição: 200ms ease

Implementação via `class="dark"` no `<html>` + localStorage.

---

## Animações

| Tipo        | Duração | Easing         |
|-------------|---------|----------------|
| Transição   | 150ms   | ease-in-out    |
| Entrada     | 200ms   | ease-out       |
| Scale/hover | 200ms   | ease           |
| Skeleton    | 1.5s    | pulse          |

Evitar animações pesadas — priorizar fluidez.

---

## Mobile First

- Breakpoint base: 375px (iPhone SE)
- Stack vertical em mobile, grid em desktop
- Mínimo de tap target: 44px × 44px
- Padding lateral: 16px (mobile), 24px (tablet+)
- Sem hover states obrigatórios em mobile
