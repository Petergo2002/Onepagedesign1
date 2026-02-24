# Demo hemsida

Denna doc ar bara for demo-lage och kall-samtal.

## 1. Demo brancher och profiler

1. Branch: `demo-template-tak`
   Profil: `demo-tak`
   Nisch: Taklaggare
2. Branch: `demo-template-bygg`
   Profil: `demo-bygg`
   Nisch: Byggfirma
3. Branch: `demo-template-el`
   Profil: `demo-el`
   Nisch: Elektriker

## 2. Exakt kommando per demo

Tak-demo:

```bash
git checkout demo-template-tak
APP_MODE=mockup TEMPLATE_PROFILE=demo-tak npm run dev
```

Bygg-demo:

```bash
git checkout demo-template-bygg
APP_MODE=mockup TEMPLATE_PROFILE=demo-bygg npm run dev
```

El-demo:

```bash
git checkout demo-template-el
APP_MODE=mockup TEMPLATE_PROFILE=demo-el npm run dev
```

## 3. Inför kundmöte (snabb rutin)

1. Valj nisch (tak/bygg/el).
2. Starta ratt branch + profil enligt ovan.
3. Byt bara:
   - `brandName`
   - `phoneDisplay`
   - `email`
4. Hard refresh i browser efter andring.

## 4. Vanligaste fel

Om fel tjanst visas eller hydration-varning dyker upp:

1. Stoppa servern med `Ctrl + C`.
2. Starta om med samma kommando igen.
3. Kontrollera att branch och `TEMPLATE_PROFILE` matchar.

## 5. Regel

1. Demo branch = mall-version.
2. Profile = kundens demo-data.
3. Workflow C anvands bara nar du vill skriva over copy for ny persona.
