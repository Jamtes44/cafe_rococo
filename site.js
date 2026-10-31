// Comportamiento compartido de todas las páginas de Café Rococó.
// shortcut: número y correo son los de la maqueta; cámbialos por los reales antes de publicar.
const WHATSAPP = '573105550124';
const EMAIL = 'contacto@caferococo.com.co';

const openWhatsApp = (text) => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
const page = location.pathname.split('/').pop() || 'index.html';

// Menú: marca la página actual y añade un menú desplegable para pantallas < 1280px (el diseño oculta el nav).
const nav = document.querySelector('header nav[data-active-classes]');
if (nav) {
  const active = nav.dataset.activeClasses.split(' ');
  nav.querySelectorAll('a').forEach((a) => {
    const here = a.getAttribute('href') === page;
    a.toggleAttribute('aria-current', here);
    if (here) { a.setAttribute('aria-current', 'page'); a.classList.add(...active); }
  });

  const panel = document.createElement('nav');
  panel.id = 'mobile-nav';
  panel.className = 'xl:hidden hidden flex-col gap-1 px-6 pb-4';
  panel.setAttribute('aria-label', 'Menú principal');
  nav.querySelectorAll('a').forEach((a) => {
    const link = a.cloneNode(true);
    link.className = 'block px-4 py-3 rounded-full font-label-md text-label-md uppercase tracking-wider ' +
      (a.getAttribute('href') === page ? active.join(' ') : 'text-on-surface-variant');
    panel.append(link);
  });
  nav.closest('header').append(panel);

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'xl:hidden w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-espresso-noir';
  btn.setAttribute('aria-label', 'Abrir menú');
  btn.setAttribute('aria-controls', 'mobile-nav');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('hidden') === false;
    panel.classList.toggle('flex', open);
    btn.setAttribute('aria-expanded', open);
    btn.firstChild.textContent = open ? 'close' : 'menu';
  });
  nav.nextElementSibling?.prepend(btn);
}

// Reserva: además del modal de confirmación, envía la solicitud por WhatsApp.
const reservation = document.getElementById('reservationForm');
if (reservation) {
  const date = reservation.querySelector('[name="date"]');
  date.min = new Date().toLocaleDateString('sv'); // YYYY-MM-DD en hora local
  reservation.addEventListener('submit', () => {
    const f = reservation.elements;
    openWhatsApp([
      'Hola, quiero reservar en Café Rococó:',
      `Nombre: ${f.fullName.value}`,
      `Teléfono: ${f.phone.value}`,
      `Correo: ${f.email.value}`,
      `Fecha: ${f.date.value}`,
      `Turno: ${f.shift.value}`,
      `Personas: ${f.guests.value}`,
      `Ocasión: ${f.occasion.value}`,
      f.notes.value && `Notas: ${f.notes.value}`,
    ].filter(Boolean).join('\n'));
  });
}

// Contacto: abre el correo con el mensaje ya redactado (el diseño solo simulaba el envío).
const contact = document.getElementById('contact-form');
if (contact) {
  contact.addEventListener('submit', () => {
    const v = (id) => document.getElementById(id).value;
    const type = contact.querySelector('[name="query_type"]:checked').value;
    const body = [
      `Nombre: ${v('contact-name')}`,
      `Correo: ${v('contact-email')}`,
      v('contact-phone') && `Teléfono: ${v('contact-phone')}`,
      v('contact-date') && `Fecha prevista: ${v('contact-date')}`,
    ].filter(Boolean).join('\n') + '\n\n' + v('contact-message');
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Consulta web: ' + type)}&body=${encodeURIComponent(body)}`;
  });
}

// Newsletter del pie: sin servidor, la suscripción llega como correo.
document.querySelectorAll('footer form').forEach((form) => {
  form.addEventListener('submit', () => {
    const email = form.querySelector('input[type="email"]');
    if (!email.reportValidity() || !email.value) return email.focus();
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Suscripción a la Gazette')}&body=${encodeURIComponent('Quiero suscribirme: ' + email.value)}`;
    form.querySelector('button').textContent = '¡Gracias!';
    form.reset();
  });
});

// Botones de pedido de la carta y portada: piden el producto de su tarjeta por WhatsApp.
document.querySelectorAll('button:not([onclick]):not([type="submit"])').forEach((b) => {
  const label = b.textContent.trim();
  if (/^(Todos|Café Filtro|Repostería)$/.test(label) && page === 'index.html') {
    return b.addEventListener('click', () => { location.href = 'menu.html'; });
  }
  if (!/Pedir|Solicitar|Ordenar/.test(label)) return;
  b.addEventListener('click', () => {
    let card = b.parentElement;
    while (card && !card.querySelector('h2, h3')) card = card.parentElement;
    const name = card?.querySelector('h2, h3')?.textContent.trim();
    openWhatsApp(name ? `Hola, quisiera pedir: ${name}` : 'Hola, quisiera hacer un pedido.');
  });
});

// PDF de la política: imprimir permite "Guardar como PDF" (el diseño solo simulaba la descarga).
if (window.descargarPoliticaPdf) window.descargarPoliticaPdf = () => window.print();

// Aviso de cookies: no volver a mostrarlo tras cerrarlo.
const banner = document.getElementById('cookie-banner');
if (banner) {
  let seen = false;
  try { seen = localStorage.getItem('cookies-ok') === '1'; } catch {}
  if (seen) banner.remove();
  else banner.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => {
    try { localStorage.setItem('cookies-ok', '1'); } catch {}
  }));
}
