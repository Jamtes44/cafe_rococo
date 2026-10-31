# Café Rococó · Bogotá

Sitio web para una cafetería de especialidad con estética rococó, ubicada en Usaquén, Bogotá. Proyecto de portafolio: el negocio y sus datos de contacto son ficticios.

## Páginas

| Página | Archivo |
|---|---|
| Inicio | `index.html` |
| Menú | `menu.html` |
| Nosotros | `nosotros.html` |
| Eventos y reservas | `eventos-y-reservas.html` |
| Ubicación y contacto | `ubicacion-y-contacto.html` |
| Política de privacidad (Ley 1581 de 2012) | `politica-de-privacidad.html` |
| Términos y condiciones (Ley 1480 de 2011) | `terminos-y-condiciones.html` |

## Funcionalidades

- Navegación completa con menú adaptable a móvil.
- Reservas y pedidos que se envían por WhatsApp con el mensaje ya redactado.
- Formulario de contacto y suscripción al boletín por correo.
- Mapa interactivo de Google Maps.
- Aviso de cookies que recuerda la elección del visitante.

Todo el comportamiento compartido está en `site.js`; el número de WhatsApp y el correo se cambian al inicio de ese archivo.

## Tecnología

HTML estático con [Tailwind CSS](https://tailwindcss.com) (CDN) y JavaScript sin dependencias. No requiere compilación. El sistema de diseño está documentado en `rococo_pastiche/DESIGN.md`.
