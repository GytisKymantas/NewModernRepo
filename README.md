# Self-Service JAR Provider UI

## 📋 Aprašymas

Ši aplikacija yra modernizuotos Juridinių Asmenų Registro Informacinės Sistemos (JAR IS) dalis.
Savitarnos React UI microfrontend aplikacija, sukurta naudojant single-spa architektūrą.

## 🚀 Projekto paleidimas

### Priklausomybių diegimas

```bash
npm install
```

### Development režimas (Microfrontend)

```bash
npm run dev
```

Aplikacija bus pasiekiama: `http://localhost:9101`

### Standalone režimas

```bash
npm run dev:standalone
```

Standalone režimas leidžia paleisti aplikaciją nepriklausomai nuo kitų microfrontend'ų.

### Production build

```bash
npm run build
```

## 🛠️ Kodo kokybės užtikrinimas

### Pre-commit Hook

Projektas turi sukonfigūruotą pre-commit hook'ą, kuris automatiškai:

- ✅ Patikrina kodo kokybę su ESLint
- ✅ Patikrina kodo formatavimą su Prettier
- ✅ Blokuoja commit'us, jei yra klaidų

### Linting ir formatavimas

```bash
# Kodo kokybės tikrinimas
npm run lint

# Automatinis klaidų taisymas
npm run lint -- --fix

# Kodo formatavimo tikrinimas
npm run check-format

# Automatinis formatavimas
npm run format
```

### Testavimas

```bash
# Testų paleidimas
npm run test

# Testų stebėjimas
npm run watch-tests

# Coverage ataskaita
npm run coverage
```

## 📁 Projekto struktūra

```
src/
├── @types/                 # TypeScript tipų aprašai
├── assets/                 # Statiniai failai (ikonos, paveikslėliai)
├── components/             # React komponentai
│   ├── layout/            # Layout komponentai
│   ├── Service/           # Paslaugų komponentai
│   └── Signature/         # Parašo komponentai
├── pages/                 # Puslapių komponentai
├── theme/                 # MUI temos konfigūracija
└── styles.css            # Globalūs stiliai
```

## ⚙️ Technologijos

- **React 18** - UI biblioteka
- **TypeScript** - Type safety
- **Single-SPA** - Microfrontend architektūra
- **Material-UI (MUI)** - UI komponentų biblioteka
- **React Hook Form** - Formų valdymas
- **Webpack 5** - Bundling
- **ESLint + Prettier** - Kodo kokybė ir formatavimas

## 🔧 Konfigūracija

### Babel

- Automatic JSX runtime
- TypeScript support
- Plugin transform runtime

### ESLint

- Airbnb style guide
- React hooks rules
- TypeScript integration
- Prettier integration

### Prettier

- Single quotes
- 2 spaces indentation
- Line width: 90
- Import organization

## 🌐 Microfrontend Integration

### Host aplikacijos integracija

```javascript
// webpack.config.js externals konfigūracija
externals: {
  "@rc-ses/mfe-host": "@rc-ses/mfe-host"
}
```

### Standalone režimas

Standalone režime React ir kitos priklausomybės yra bundle'inamos į aplikaciją,
leidžiant paleisti ją nepriklausomai.

## 📦 Priklausomybės

### Pagrindinės

- `react`, `react-dom` - React biblioteka
- `@mui/material`, `@mui/x-date-pickers` - UI komponentai
- `@registrucentras/rc-ses-react-components` - RC SES komponentai
- `react-hook-form` - Formų valdymas
- `single-spa-react` - Microfrontend integration

### Development

- `eslint`, `prettier` - Kodo kokybė
- `typescript` - Type checking
- `webpack` - Bundling
- `babel` - Transpilation

## 🚨 Troubleshooting

### Dependency conflicts

Jei kyla priklausomybių konfliktų, naudokite:

```bash
npm install --legacy-peer-deps
```

### React is not defined (standalone mode)

Jei standalone režime atsiranda "React is not defined" klaida,
webpack konfigūracija automatiškai provide'ina React globally.

## 🤝 Contributing

1. Sukurkite feature branch
2. Atlikite pakeitimus
3. Pre-commit hook'as automatiškai patikrins kodo kokybę
4. Sukurkite pull request
