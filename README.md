# Kumamori

Sitio web de **Kumamori**, cafetería inspirada en Japón para disfrutar, estudiar o trabajar.
Construido a partir del manual de marca (v1.0, 2026) y de la maqueta de Figma.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4 (tokens de marca en `src/styles/global.css`)
- Motion (Framer Motion 13) para interacción y transiciones
- GSAP + ScrollTrigger para las animaciones ligadas al scroll
- Lenis para el scroll suave
- React Router 8
- Tipografías autoalojadas: Red Hat Display, Gaegu y Zen Maru Gothic (solo para el kanji)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173/Kumamori/
npm run build    # genera dist/
```

## Estructura

- `src/content/site.ts`: TODO el texto del sitio (copys, menú, zonas, experiencias, opciones del formulario). Es el único archivo que hay que tocar para cambiar contenido.
- `src/brand/paths.ts`: vectores del manual (logo en sus variantes, oso por partes e iconos dibujados a mano). Se genera desde el `.ai`; no editar a mano.
- `src/brand/`: `Bear` (oso con ojos que siguen al puntero), `Logo`, `Icon`.
- `src/pages/`: Inicio, Nuestro espacio, Reservas, Nueva reserva, Experiencias, Nosotros.
- `src/lib/reservas.ts`: envío de reservas. Hoy guarda en el navegador; cuando exista el backend se cambia solo `enviarReserva`.
- `public/photos/`: fotos del manual en WebP.

## Pendientes de la marca

Marcados como `PENDIENTE` en `src/content/site.ts`: dirección, correo, TikTok y WhatsApp.
Las reservas no envían correo todavía (se guardan en el navegador y se pueden agregar al calendario).

## Despliegue

Cada push a `main` publica en GitHub Pages con `.github/workflows/deploy.yml` (base `/Kumamori/`).
Para un dominio propio: `BASE_PATH=/ npm run build`.
