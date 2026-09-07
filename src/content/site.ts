// Todo el texto del sitio vive acá para que se pueda editar sin tocar componentes.
// PENDIENTE (datos que la marca todavía no definió): dirección, teléfono, TikTok y WhatsApp.

export const site = {
  nombre: 'Kumamori',
  kana: 'クマモリ',
  kanji: '熊森',
  lema: 'Café, matcha y un lugar para quedarse',
  descripcion:
    'Cafetería inspirada en Japón para disfrutar, estudiar o trabajar sin mirar el reloj.',
  horario: {
    texto: 'Lunes a sábados, de 7 a 20 h',
    corto: 'Lun a sáb · 7 a 20 h',
    dias: [1, 2, 3, 4, 5, 6], // 0 = domingo (cerrado)
    apertura: 7,
    cierre: 20,
  },
  direccion: 'Dirección por confirmar', // PENDIENTE
  correo: 'hola@kumamori.cafe', // PENDIENTE
  redes: [
    { nombre: 'Instagram', handle: '@kumamori', url: 'https://instagram.com/kumamori' },
    { nombre: 'TikTok', handle: '@kumamori', url: 'https://tiktok.com/@kumamori' }, // PENDIENTE
    { nombre: 'WhatsApp', handle: 'Escribinos', url: 'https://wa.me/' }, // PENDIENTE
  ],
  anio: 2026,
}

export const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Nuestro espacio', to: '/espacio' },
  { label: 'Reservas', to: '/reservas' },
  { label: 'Experiencias', to: '/experiencias' },
  { label: 'Nosotros', to: '/nosotros' },
] as const

export const home = {
  hero: {
    // el hero de la maqueta: FONDO CARRUSEL + LOGO TRANSPARENTE encima
    fotos: [
      { src: 'cafe-shoji.webp', alt: 'Interior de Kumamori con luz de tarde entrando por las ventanas de madera' },
      { src: 'cafe-mesas.webp', alt: 'Mesas de madera junto a la ventana con plantas' },
      { src: 'bandeja-latte.webp', alt: 'Bandeja de madera con un latte y una porción de torta al sol' },
      { src: 'cafe-ventanas.webp', alt: 'Sala principal con ventanales y luz cálida' },
    ],
    nota: 'café de especialidad, matcha batido a mano y silencio del bueno',
    primario: { label: 'Reservar un lugar', to: '/reservas/nueva' },
    secundario: { label: 'Conocer el espacio', to: '/espacio' },
  },
  espacio: {
    titulo: 'Un lugar para quedarse',
    parrafos: [
      'Kumamori es una cafetería inspirada en Japón, pensada para disfrutar, estudiar o trabajar sin mirar el reloj. Abrimos de lunes a sábados, de 7 a 20 h.',
      'Mesas de estudio con lámpara propia, una mesa grande para trabajar en equipo y un rincón de sillones para cuando el plan es no hacer nada. Wifi de fibra, tomacorrientes en cada mesa y sin límite de tiempo.',
    ],
    link: { label: 'Ver el espacio', to: '/espacio' },
    foto: { src: 'cafe-ventanas.webp', alt: 'Sala principal de Kumamori con ventanales y luz cálida' },
  },
  barra: {
    titulo: 'Hoy en la barra',
    texto: 'Lo que sale todos los días. El menú completo cambia con la temporada y está en la barra.',
  },
  quedarse: {
    titulo: 'Para quedarse un rato largo',
    datos: [
      { titulo: 'De 7 a 20 h', texto: 'Lunes a sábados, con el mismo menú toda la tarde.' },
      { titulo: 'Wifi y enchufe', texto: 'Fibra estable y tomacorriente en cada mesa.' },
      { titulo: 'Sin límite de tiempo', texto: 'Una bebida alcanza. Nadie mira el reloj.' },
    ],
    foto: { src: 'bandeja-latte.webp', alt: 'Bandeja de madera con un latte y una porción de torta al sol' },
  },
  cta: {
    titulo: 'Tu lugar te espera',
    texto: 'Reservar no tiene costo y te lo guardamos 15 minutos.',
    boton: { label: 'Reservar un lugar', to: '/reservas/nueva' },
    foto: 'latte-textura-2.webp',
  },
}

export type MenuItem = { nombre: string; texto: string; icono: string; precio?: string }
export const menu: MenuItem[] = [
  { nombre: 'Matcha latte', texto: 'Matcha ceremonial batido a mano, con leche a elección.', icono: 'teacup' },
  { nombre: 'Café de especialidad', texto: 'Espresso y filtrados de tueste medio, para tomar acá o llevar.', icono: 'paper-cup' },
  { nombre: 'Bubble tea', texto: 'Té frío con perlas de tapioca. El de la casa es de matcha.', icono: 'iced-drink' },
  { nombre: 'Dango tricolor', texto: 'Harina de arroz glutinosa, saborizados a frutilla, vainilla y matcha.', icono: 'dango' },
  { nombre: 'Mochis rellenos', texto: 'De frutilla, matcha y mango. Se hacen todas las mañanas.', icono: 'cake' },
  { nombre: 'Onigiri relleno', texto: 'Tuna mayo, pasta miso o pollo spicy.', icono: 'bun' },
  { nombre: 'Melon pan', texto: 'Recién horneado, con corteza crocante de azúcar.', icono: 'melonpan' },
  { nombre: 'Purin', texto: 'Flan japonés, suave, con caramelo.', icono: 'purin' },
]

export const espacioPage = {
  hero: {
    titulo: 'Para concentrarse o disfrutar',
    texto:
      'Un lugar cálido y tranquilo, con inspiración japonesa y sin apuro. Mesas grandes para estudiar, rincones para trabajar y una barra donde el matcha se bate a mano.',
    fotos: [
      { src: 'cafe-mesas.webp', alt: 'Mesas de madera junto a la ventana con plantas' },
      { src: 'cafe-ventanas.webp', alt: 'Sala principal con ventanales y luz cálida' },
      { src: 'cafe-shoji.webp', alt: 'Puertas shoji de madera y un sillón al sol' },
    ],
  },
  zonasTitulo: 'Tres maneras de quedarse',
  zonas: [
    {
      nombre: 'Mesas de estudio',
      texto: 'Individuales, con lámpara y enchufe. Silencio de biblioteca, sin la biblioteca.',
      puntos: ['Lámpara y enchufe propios', 'Zona sin llamadas', 'Sin límite de tiempo'],
      foto: { src: 'cafe-mesas.webp', alt: 'Mesas de estudio junto a la ventana' },
    },
    {
      nombre: 'La mesa grande',
      texto: 'Compartida, para trabajar en equipo o conocer gente que también vino a trabajar.',
      puntos: ['Hasta seis personas', 'Wifi de fibra', 'Tomacorriente cada dos sillas'],
      foto: { src: 'cafe-ventanas.webp', alt: 'Mesa grande con ventanales' },
    },
    {
      nombre: 'El rincón',
      texto: 'Sillones, luz de tarde y una estantería con manga. Para el plan de no hacer nada.',
      puntos: ['Sillones y luz de tarde', 'Estantería de manga y revistas', 'Ideal para dos'],
      foto: { src: 'cafe-shoji.webp', alt: 'Rincón de sillones junto a las puertas shoji' },
    },
  ],
  serviciosTitulo: 'Lo que siempre está',
  serviciosFoto: 'cafe-ventanas.webp',
  servicios: [
    { icono: 'wifi', titulo: 'Wifi de fibra', texto: 'Estable para videollamadas y subir entregas.' },
    { icono: 'plug', titulo: 'Enchufe en cada mesa', texto: 'Con adaptadores en la barra si te falta uno.' },
    { icono: 'volume', titulo: 'Música baja', texto: 'City pop y jazz a un volumen que no molesta.' },
    { icono: 'clock', titulo: 'Abierto de 7 a 20 h', texto: 'Lunes a sábados. Domingos descansamos.' },
    { icono: 'coffee', titulo: 'Menú toda la tarde', texto: 'Lo dulce y lo salado salen hasta el cierre.' },
    { icono: 'infinity', titulo: 'Sin límite de tiempo', texto: 'Una bebida alcanza para quedarse.' },
  ],
  cta: {
    titulo: 'Tu lugar te espera',
    texto: 'Reservar no tiene costo y te lo guardamos 15 minutos.',
    boton: { label: 'Reservar un lugar', to: '/reservas/nueva' },
    foto: 'latte-textura-1.webp',
  },
}

export const reservasPage = {
  hero: {
    titulo: 'Un lugar con tu nombre',
    texto:
      'Eliges el tipo de lugar, el día y la hora, y te lo guardamos hasta 15 minutos después del horario elegido. Si cambian los planes, se cancela desde el mismo código.',
    fotos: [
      { src: 'cafe-mesas.webp', alt: 'Mesa reservada junto a la ventana' },
      { src: 'bandeja-latte.webp', alt: 'Bandeja con un latte y una porción de torta' },
      { src: 'cafe-shoji.webp', alt: 'Rincón de sillones junto a las puertas shoji' },
    ],
  },
  pasos: [
    { titulo: 'Elige el lugar', texto: 'Mesa de estudio, la mesa grande o el rincón.' },
    { titulo: 'Elige día y hora', texto: 'Cualquier día de lunes a sábados, entre las 8 y las 19 h.' },
    { titulo: 'Recibe tu código', texto: 'En pantalla, listo para tu calendario. Se muestra al llegar.' },
  ],
  cta: {
    titulo: 'Tu mesa te espera',
    texto: 'Toma menos de un minuto.',
    boton: { label: 'Reservar ahora', to: '/reservas/nueva' },
    foto: 'bandeja-latte.webp',
  },
}

export const reservaOpciones = {
  motivos: ['Estudiar', 'Trabajar', 'Disfrutar', 'Reunión'],
  espacios: [
    { id: 'estudio', nombre: 'Mesa de estudio', texto: 'Individual, con lámpara y enchufe.', icono: 'sprig' },
    { id: 'grande', nombre: 'La mesa grande', texto: 'Compartida, hasta seis personas.', icono: 'leaves' },
    { id: 'rincon', nombre: 'El rincón', texto: 'Sillones y luz de tarde.', icono: 'clover' },
  ],
  personas: [
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3-4', label: '3 a 4' },
    { id: '5-6', label: '5 a 6' },
  ],
  duraciones: [
    { id: '1', label: '1 hora', horas: 1 },
    { id: '2', label: '2 horas', horas: 2 },
    { id: '3', label: '3 horas', horas: 3 },
    { id: 'tarde', label: 'Toda la tarde', horas: 5 },
  ],
  extras: [
    { id: 'ninguno', nombre: 'Sin extras', texto: 'Solo el lugar. Lo demás se pide en la barra.', icono: 'flower-five' },
    { id: 'matcha', nombre: 'Ceremonia de matcha', texto: 'Veinte minutos, batido a la vista, con un dulce.', icono: 'chasen' },
    { id: 'merienda', nombre: 'Merienda japonesa', texto: 'Bandeja para compartir: dango, taiyaki, mochis y té.', icono: 'dango' },
  ],
  politicas: [
    'Reservar no tiene costo.',
    'Te guardamos el lugar hasta 15 minutos después del horario elegido.',
    'Para cancelar o cambiar, escribinos por Instagram con tu código.',
  ],
}

export const experienciasPage = {
  hero: {
    titulo: 'Más que un café',
    texto:
      'Pequeños rituales para hacer del rato en Kumamori algo más. Se reservan con anticipación y se suman al lugar que elijas.',
  },
  items: [
    {
      id: 'estudio',
      nombre: 'Sesión de estudio',
      sub: 'Tres horas de silencio, con enchufe y bebida caliente',
      texto:
        'Bloques de tres horas en las mesas de estudio, con lámpara propia, enchufe y una bebida caliente incluida. Ideal para rendir, escribir o simplemente concentrarse.',
      icono: 'sprig',
      foto: 'cafe-mesas.webp',
      incluye: [
        { icono: 'teacup', label: 'Bebida caliente' },
        { icono: 'sprig', label: 'Mesa con lámpara' },
        { icono: 'cha', label: 'Zona en silencio' },
        { icono: 'leaves', label: 'Tres horas' },
        { icono: 'bun', label: 'Snack de las cinco' },
      ],
      duracion: '3 horas',
      personas: 'Para 1 persona',
      extra: 'ninguno',
      espacio: 'estudio',
    },
    {
      id: 'matcha',
      nombre: 'Ceremonia de matcha',
      sub: 'Batimos el matcha a la vista, paso a paso',
      texto:
        'Una pausa de veinte minutos para preparar matcha como se hace en Japón: chawan, chasen y agua a la temperatura justa. Sale con un dulce de temporada.',
      icono: 'chasen',
      foto: 'latte-textura-1.webp',
      incluye: [
        { icono: 'chasen', label: 'Chasen de bambú' },
        { icono: 'chashaku', label: 'Chashaku' },
        { icono: 'teacup', label: 'Chawan' },
        { icono: 'dango', label: 'Dulce de temporada' },
        { icono: 'cha', label: 'Matcha ceremonial' },
      ],
      duracion: '20 minutos',
      personas: 'Para 1 a 4 personas',
      extra: 'matcha',
      espacio: 'rincon',
    },
    {
      id: 'merienda',
      nombre: 'Merienda japonesa',
      sub: 'Dango, taiyaki y té para compartir',
      texto:
        'Una bandeja para dos o cuatro con dango tricolor, taiyaki relleno, mochis y una tetera. Pensada para la tarde larga con amigos.',
      icono: 'dango',
      foto: 'bandeja-latte.webp',
      incluye: [
        { icono: 'dango', label: 'Dango tricolor' },
        { icono: 'tin', label: 'Taiyaki relleno' },
        { icono: 'cake', label: 'Mochis' },
        { icono: 'melonpan', label: 'Melon pan' },
        { icono: 'teacup', label: 'Tetera para la mesa' },
      ],
      duracion: 'Toda la tarde',
      personas: 'Para 2 a 4 personas',
      extra: 'merienda',
      espacio: 'rincon',
    },
  ],
}

export const nosotrosPage = {
  titulo: 'Un oso en el bosque',
  sub: 'Kuma es oso. Mori es bosque',
  parrafos: [
    'Kumamori nace de una idea simple: faltaban lugares cómodos para estudiar y trabajar fuera de casa, y sobraban ganas de un buen matcha. Así que juntamos las dos cosas en un espacio cálido, tranquilo y con inspiración japonesa.',
    'Queremos que la concentración, el bienestar y el encuentro convivan en la misma mesa. Que se pueda venir a rendir un final, a cerrar un proyecto o a no hacer nada, y que el café siempre esté a la altura.',
  ],
  cierre: 'El oso cuida el bosque. Nosotros cuidamos cada visita.',
  bocetos: { src: 'bocetos.webp', alt: 'Cuaderno cuadriculado con los primeros bocetos del oso de Kumamori', nota: 'así empezó el oso' },
  merch: {
    titulo: 'Kumamori, fuera del local',
    texto: 'Vasos, stickers y todo lo que se va con la gente. Está en la barra, junto a la caja.',
    items: [
      { src: 'vasos.webp', cap: 'para llevar' },
      { src: 'tumbler.webp', cap: 'stickers de la casa' },
      { src: 'cuaderno.webp', cap: 'cuaderno de notas' },
      { src: 'stickers.webp', cap: 'la bolsa de papel' },
      { src: 'tote.webp', cap: 'la tote' },
      { src: 'bubble-tea-vaso.webp', cap: 'bubble tea' },
      { src: 'cold-brew.webp', cap: 'cold brew' },
      { src: 'menu-impreso.webp', cap: 'el menú' },
      { src: 'poster-bubble-tea.webp', cap: 'el póster' },
    ],
  },
  redesTitulo: 'Seguinos de cerca',
}

export const footer = {
  novedades: {
    titulo: 'Novedades en tu correo',
    texto: 'Una vez al mes: menú nuevo, eventos y algún descuento. Nada más.',
    placeholder: 'tu@correo.com',
    boton: 'Suscribirme',
    gracias: 'Listo. Te avisamos cuando haya novedades.',
  },
}
