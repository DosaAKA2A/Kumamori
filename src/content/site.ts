// Todo el texto del sitio vive acá para que se pueda editar sin tocar componentes.
// Los textos salen literales de la maqueta final de Figma (Kumamori_UI_Prototype).
// Marcado: **texto** va en SemiBold; "\n" es un salto de línea que la maqueta pone a mano.

export const site = {
  nombre: 'Kumamori',
  kana: 'クマモリ',
  kanji: '熊森',
  horario: {
    texto: 'Lunes a sábados, de 7 a 20 h',
    dias: [1, 2, 3, 4, 5, 6], // 0 = domingo (cerrado)
    apertura: 7,
    cierre: 20,
  },
  // datos de contacto tal como vienen en la maqueta
  direccion: 'Mendoza 427, Belgrano, CABA',
  correo: 'kumamoriba@gmail.com',
  redes: [
    { nombre: 'Instagram', handle: '@kumamori', url: 'https://instagram.com/kumamori', icono: 'instagram' },
    { nombre: 'TikTok', handle: '@kumamori.ba', url: 'https://www.tiktok.com/@kumamori.ba', icono: 'tiktok' },
    { nombre: 'WhatsApp', handle: '11 4567-9056', url: 'https://wa.me/5491145679056', icono: 'whatsapp' },
  ],
}

export const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Nuestro espacio', to: '/espacio' },
  { label: 'Reservas', to: '/reservas' },
  { label: 'Experiencias', to: '/experiencias' },
  { label: 'Nosotros', to: '/nosotros' },
] as const

export const footer = {
  novedades: {
    titulo: 'Novedades en tu correo',
    texto: 'Una vez al mes: menú nuevo, eventos y algún descuento.\nNada más.',
    placeholder: 'tu@correo.com',
    boton: 'Suscribirme',
    gracias: 'Listo. Te avisamos cuando haya novedades.',
  },
  marca: '© KUMAMORI',
}

export const home = {
  hero: {
    // carrusel a pantalla completa con el imagotipo crema encima (la maqueta abre con cafe-mesas)
    fotos: [
      {
        src: 'cafe-mesas.webp',
        alt: 'Sillones junto a una mesa redonda de madera con café y una porción de torta',
        // encuadre de la maqueta: la foto va al 106 % y algo corrida a la derecha
        escala: 1.06,
        origen: '36.4% 50.8%',
      },
      { src: 'cafe-shoji.webp', alt: 'Interior de Kumamori con luz de tarde entrando por las ventanas de madera' },
      { src: 'bandeja-latte.webp', alt: 'Bandeja de madera con un latte y una porción de torta al sol' },
      { src: 'cafe-ventanas.webp', alt: 'Sala principal con ventanales y luz cálida' },
    ],
  },
  lugar: {
    titulo: 'Un lugar tranquilo para vos',
    parrafos: [
      'Kumamori es una cafetería inspirada en Japón, pensada para disfrutar, estudiar o trabajar sin mirar el reloj. Abrimos de lunes a sábados, de 7 a 20 h.',
      'Mesas de estudio con lámpara propia, una mesa grande para trabajar en equipo y un rincón de sillones para cuando el plan es no hacer nada. Wifi de fibra, tomacorrientes en cada mesa y sin límite de tiempo.',
    ],
    link: { label: 'Ver espacio', to: '/espacio' },
    foto: { src: 'inicio-matcha.webp', alt: 'Cuencos de matcha en polvo y un matcha latte sobre una esterilla de bambú' },
  },
}

export const espacioPage = {
  hero: {
    titulo: 'Un espacio para\nconcentrarse\no disfrutar',
    texto:
      'Un lugar cálido y tranquilo, con inspiración japonesa y sin apuro. Mesas grandes para estudiar, rincones para trabajar y una barra donde el matcha se bate a mano.',
    boton: { label: 'Reservar', to: '/reservas/nueva' },
    foto: { src: 'espacio-barista.webp', alt: 'Barista sonriente con delantal verde preparando un café en la barra' },
  },
  zonasTitulo: 'Conocé nuestros espacios',
  zonas: [
    {
      nombre: 'Mesas de Estudio',
      texto: 'Individuales, con lámpara y enchufe. Silencio\nde biblioteca, sin la biblioteca.',
      puntos: ['Lámpara y enchufe por cada mesa.', 'Zona silenciosa.', 'Sin límite de tiempo.'],
      foto: { src: 'espacio-estudio.webp', alt: 'Mujer leyendo en una mesa con café y una porción de torta' },
    },
    {
      nombre: 'Mesa Grande',
      texto: 'Compartida, para trabajar en equipo o\nconocer gente que también vino a trabajar.',
      puntos: ['Hasta seis personas.', 'Mesas grandes', 'Tomacorriente cada dos sillas.'],
      foto: { src: 'espacio-mesa-grande.webp', alt: 'Dos personas trabajando en una mesa larga de madera' },
    },
    {
      nombre: 'Rincón y Sillones',
      texto: 'Sillones, luz de tarde y una estantería con manga.\nPara el plan de no hacer nada.',
      puntos: ['Sillones y mesas bajas.', 'Estanterías de revistas y mangas.', 'Ideal para estar acompañado.'],
      foto: { src: 'espacio-rincon.webp', alt: 'Mujer sentada en un sillón con plantas detrás' },
    },
  ],
  comodidades: {
    titulo: 'Nuestras comodidades',
    texto: 'Todo lo que necesitás para\nsentirte cómodo.',
    items: [
      { icono: 'wifi', titulo: 'Wifi de fibra', texto: 'Estable para\nvideollamadas y reuniones.' },
      { icono: 'enchufe', titulo: 'Enchufe en cada mesa', texto: 'Con adaptadores en la\nbarra si te falta uno.' },
      { icono: 'silencio', titulo: 'Espacio tranquilo', texto: 'Sin música o ruidos fuertes\nque resulten molestos.' },
      { icono: 'reloj', titulo: 'Abierto de 7 a 20 h', texto: 'Lunes a sábados.\nDomingos descansamos.' },
      { icono: 'taza', titulo: 'Menú todo el día', texto: 'Lo dulce y lo salado salen\nhasta el cierre.' },
      { icono: 'sillon', titulo: 'Sin límite de tiempo', texto: 'Una bebida alcanza para\nquedarse.' },
    ],
  },
  cta: {
    titulo: '¿Encontraste tu lugar?',
    texto: 'Elegí el espacio que mejor se adapte a tu momento.\nReservar **no tiene costo** y te lo guardamos **15 minutos**.',
    boton: { label: 'Reservar', to: '/reservas/nueva' },
    // la espuma de la maqueta ("coffee-foam-texture") es latte-textura-2 con este encuadre
    foto: 'latte-textura-2.webp',
  },
}

export const reservasPage = {
  hero: {
    titulo: 'Tu lugar,\ndonde podés\nestar a tu manera',
    texto:
      'Eliges el tipo de lugar, el día y la hora, y te lo guardamos hasta 15 minutos después del horario elegido. Si cambian los planes, se cancela desde el mismo código.',
    boton: { label: 'Reservar', to: '/reservas/nueva' },
    foto: { src: 'reservas-taza.webp', alt: 'Taza de cerámica verde humeante y un croissant sobre una mesa de madera' },
  },
  pasosTitulo: '¿Cómo reservo en Kumamori?',
  pasosTexto: 'No te preocupes. Acá te enseñamos el paso a paso.',
  pasos: [
    { titulo: 'Elegí el Lugar', texto: 'Mesa de estudio, mesa grande\no el rincón y sillones.' },
    { titulo: 'Elegí Día y Hora', texto: 'Cualquier día de lunes a sábados,\nentre las 7 y las 20 h.' },
    { titulo: 'Recibí tu Código', texto: 'En pantalla, listo para tu calendario.\nSe muestra al llegar al local.' },
  ],
  cta: {
    titulo: '¿Qué te parece?',
    texto: '¿Reservamos? No te va a tomar más de 2 minutos.\nTe lo prometemos.',
    boton: { label: 'Reservar', to: '/reservas/nueva' },
  },
}

export const formulario = {
  titulo: 'Reservar un lugar es muy simple',
  texto: 'Y sin costo. Te guardamos el lugar hasta 15 minutos después del horario elegido.',
  condiciones: [
    'Las reservas están sujetas a disponibilidad.',
    'Recordá indicar la cantidad de personas si vienen en grupo.',
    'Si reservás para un grupo, procurá que todos lleguen a tiempo.',
    'La zona de relajación es para disfrutar consumiendo en el local.',
    'Ayudanos a mantener el espacio ordenado y tranquilo para que todos puedan estudiar, trabajar o relajarse.',
  ],
  bloques: {
    datos: { titulo: 'Tus datos', texto: 'Para confirmarte y avisarte si algo cambia.' },
    espacio: { titulo: 'Espacio', texto: 'Cada zona tiene su ritmo. Elige la que va con el plan.' },
    personas: { titulo: 'Cantidad de personas', texto: 'Cada zona tiene su ritmo. Elige la que va con el plan.' },
    duracion: { titulo: 'Duración de estadía', texto: 'Es orientativo: nadie te va a mirar el reloj.' },
    extra: { titulo: 'Experiencia', texto: 'Opcional. Se suma al lugar que elegiste.' },
    fecha: { titulo: 'Día y horario', texto: 'Esto va a aparecer en el correo electrónico adjunto.' },
  },
  campos: { nombre: 'Nombre y apellido', correo: 'Correo electrónico', telefono: 'Teléfono', extra: 'Experiencia' },
  dias: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
  resumen: {
    titulo: 'Resumen',
    filas: { espacio: 'Espacio', personas: 'Cantidad de personas', duracion: 'Duración de estadía', extra: 'Experiencia', fecha: 'Día', hora: 'Horario' },
    boton: 'Reservar',
    enviando: 'Guardando...',
  },
  salir: {
    titulo: '¿Querés salir?',
    texto: 'Tenés datos sin guardar en el formulario. Si salís ahora, vas a perder la información que ingresaste.',
    pregunta: '¿Querés salir de todos modos?',
    seguir: 'Continuar reservando',
    salir: 'Salir',
  },
  confirmacion: {
    titulo: '¡Tu lugar ya está guardado!',
    texto: ['Mostrá este código al llegar.', 'Guardalo o ', 'agregalo a tu calendario', ':', 'por ahora no enviamos correos.'],
    filas: {
      nombre: 'A Nombre de',
      espacio: 'Espacio',
      personas: 'Cantidad de personas',
      extra: 'Experiencia',
      fecha: 'Día',
      hora: 'Horario y Duración de estadía',
    },
  },
}

export const reservaOpciones = {
  espacios: [
    { id: 'estudio', nombre: 'Mesa de Estudio', texto: 'Individual, con lámpara y enchufe propios.' },
    { id: 'grande', nombre: 'Mesa Grande', texto: 'Mesa para compartir en grupo. Hasta 6 personas.' },
    { id: 'rincon', nombre: 'Rincón', texto: 'Sillones con luz de tarde. Perfecto para compartir.' },
  ],
  personas: [
    { id: '1', label: '1 Persona' },
    { id: '2', label: '2 Personas' },
    { id: '3-4', label: '3 a 4 Personas' },
    { id: '5+', label: '5 Personas o más' },
  ],
  duraciones: [
    { id: '1', label: '1 Hora', horas: 1 },
    { id: '2', label: '2 Horas', horas: 2 },
    { id: '3', label: '3 Horas', horas: 3 },
    { id: 'tarde', label: 'Toda la tarde', horas: 5 },
  ],
  extras: [
    { id: 'ninguno', nombre: 'Sin extras', texto: 'Solamente incluye el lugar. Alimentos se piden en barra.' },
    { id: 'matcha', nombre: 'Ceremonia de Té', texto: 'Veinte minutos. Incluye un dulce tradicional.' },
    { id: 'merienda', nombre: 'Merienda japonesa', texto: 'Para dos. Incluye dango tricolor, mochis y taiyaki.' },
  ],
}

export const experienciasPage = {
  titulo: '¿Qué se puede hacer\nen Kumamori?',
  texto: 'Acá tenemos tres experiencias para vos. Un lugar para concentrarte,\ncompartir y disfrutar de un momento tranquilo a tu manera.',
  verMas: 'Ver más',
  items: [
    {
      id: 'estudio',
      nombre: 'Sesión de Estudio',
      personas: 'Para 1 persona',
      texto: 'Bloques de tres horas en las mesas de estudio, con lámpara propia y enchufe.\nSnack y bebida a elección.\nIdeal para rendir, escribir o concentrarse.',
      foto: { src: 'exp-estudio.webp', alt: 'Estudiante leyendo con libros y una laptop en una mesa de café' },
      extra: 'ninguno',
      espacio: 'estudio',
    },
    {
      id: 'matcha',
      nombre: 'Ceremonia de Té',
      personas: 'Para 1 a 4 personas',
      texto: 'Una pausa de veinte minutos para preparar matcha como se hace en Japón: chawan, chasen y agua a la temperatura justa.\nIncluye un dulce tradicional de temporada.',
      foto: { src: 'exp-ceremonia.webp', alt: 'Manos sosteniendo una taza de té durante una ceremonia' },
      extra: 'matcha',
      espacio: 'rincon',
    },
    {
      id: 'merienda',
      nombre: 'Merienda Japonesa', // la maqueta trae un doble espacio: errata corregida
      personas: 'Para 2 a 4 personas',
      texto: 'Una merienda para dos personas con dango tricolor, taiyaki relleno y mochis. La bebida\nte la dejamos a elección.\nPensada para la tarde larga con amigos.',
      foto: { src: 'exp-merienda.webp', alt: 'Mochis de colores sobre una bandeja negra junto a una taza de té' },
      extra: 'merienda',
      espacio: 'rincon',
    },
  ],
  testimonios: {
    titulo: 'Así vivieron Kumamori',
    texto: 'Descubrí qué dicen quienes ya pasaron por Kumamori y compartieron\nalguna de nuestras experiencias.',
    items: [
      {
        nombre: 'Martina S.',
        experiencia: 'Sesión de Estudio',
        texto: 'Fui a estudiar un rato y terminé quedándome toda la tarde. Es re tranquilo y pude concentrarme un montón. Además, el lugar es hermoso y muy cómodo.',
        estrellas: 5,
        foto: 'testimonio-martina.webp',
        icono: 'bun',
      },
      {
        nombre: 'Tomás R.',
        experiencia: 'Ceremonia de Té',
        texto: 'Me gustó mucho la experiencia, nunca había participado de una ceremonia de té. La explicación estuvo muy buena y el ambiente es súper relajante. Quizás me hubiera gustado que durara un poquito más.',
        estrellas: 4,
        foto: 'testimonio-tomas.webp',
        icono: 'melonpan',
      },
      {
        nombre: 'Valentina M.',
        experiencia: 'Merienda Japonesa',
        texto: 'Todo estuvo riquísimo y la presentación era hermosa. Probé algunas cosas que nunca había comido y me encantaron. El lugar es muy acogedor, seguro vuelvo con más amigos.',
        estrellas: 5,
        foto: 'testimonio-valentina.webp',
        icono: 'tin',
      },
    ],
  },
}

export const nosotrosPage = {
  titulo: 'Un oso en el bosque',
  sub: 'Kuma es oso. Mori es bosque.',
  parrafos: [
    'Kumamori nace de una idea simple: faltaban lugares cómodos para estudiar y trabajar fuera de casa, y sobraban ganas de un buen matcha. Así que juntamos las dos cosas en un espacio cálido, tranquilo y con inspiración japonesa.',
    'Queremos que la concentración, el bienestar y el encuentro convivan en la misma mesa. Que se pueda venir a rendir un final, a cerrar un proyecto o a no hacer nada, y que el café siempre esté a la altura.',
  ],
  cierre: 'El oso cuida el bosque. Nosotros cuidamos cada visita.',
  valores: ['Tranquilidad', 'Calidez', 'Encuentro', 'Experiencia'],
  visita: {
    titulo: 'Vení a visitarnos',
    texto: 'Un espacio tranquilo, en el corazón de Belgrano.',
    mapa: { src: 'mapa-belgrano.webp', alt: 'Mapa ilustrado de las manzanas de Belgrano con la ubicación de Kumamori' },
    nombre: 'Kumamori',
    datos: [
      { icono: 'pin', lineas: [{ t: 'Mendoza 427' }, { t: 'Buenos Aires, Argentina' }] },
      { icono: 'reloj', lineas: [{ t: 'Lunes a Sábado', fuerte: true }, { t: '7:00 hs - 20:00 hs' }] },
      {
        icono: 'tren',
        lineas: [
          { t: 'Cómo llegar', fuerte: true },
          { t: 'Subte D - Estación Congreso de Tucumán', gris: '(20 minutos a pie)' },
          { t: 'Estación Belgrano C', gris: '(10 minutos a pie)' },
          { t: 'Colectivos 15, 29A, 29C, 42, 107' },
        ],
      },
    ],
  },
  redes: {
    titulo: 'Y seguinos en nuestras redes',
    texto: 'Así te enterás de **todas** las novedades.',
  },
}
