// /*!
// * Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
// * Copyright 2013-2023 Start Bootstrap
// * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
// */

window.addEventListener('DOMContentLoaded', () => {
    // Evidenzia il giorno corrente nella lista degli orari (se presente)
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    if (listHoursArray.length > 0) {
        listHoursArray[new Date().getDay()].classList.add('today');
    }

    // Carico il JSON dei prodotti
    fetch("prodotti.json")
        .then(response => response.json())
        .then(prodotti => {
            generaMenu(prodotti);
        });
});

function generaMenu(data) {
    const ctaInner = document.querySelector('.cta-inner');
    if (!ctaInner) return;

    // Pulisco il contenuto precedente
    ctaInner.innerHTML = '';

    // --- CREO LA NAVBAR RESPONSIVE SEMPLICE ---
    const navbar = document.createElement('nav');
    navbar.className = 'custom-navbar mb-4 d-flex justify-content-center flex-wrap'; // flex-wrap per mobile

    data.macroAree.forEach(area => {
        const a = document.createElement('a');
        a.href = '#' + area.id;
        a.textContent = area.nome;
        a.className = 'mx-3 my-1 text-decoration-none fw-bold'; // margine verticale su mobile
        navbar.appendChild(a);
    });

    ctaInner.appendChild(navbar);

    // --- RAGGRUPPO I PRODOTTI PER MACROAREA ---
    const prodottiPerArea = {};
    data.prodotti.forEach(p => {
        if (!prodottiPerArea[p.macroArea]) prodottiPerArea[p.macroArea] = [];
        prodottiPerArea[p.macroArea].push(p);
    });

    // --- CREO SEZIONI PRODOTTI ---
    for (const [macroArea, prodottiArea] of Object.entries(prodottiPerArea)) {
        const section = document.createElement('div');
        section.id = 'macroarea-' + macroArea.toLowerCase().replace(/\s+/g, '-');

        // Titolo sezione
        const h2 = document.createElement('h2');
        h2.className = 'section-heading mb-5';
        const span = document.createElement('span');
        span.className = 'section-heading-lower custom_section_heading';
        span.textContent = macroArea;
        h2.appendChild(span);
        section.appendChild(h2);

        // Categoria
        const customTitle = document.createElement('div');
        customTitle.className = 'custom_title';
        customTitle.textContent = prodottiArea[0].categoria;
        section.appendChild(customTitle);

        const customContainer = document.createElement('div');
        customContainer.className = 'custom_container';
        const w100 = document.createElement('div');
        w100.className = 'w-100';

        // Intestazione prezzi
        const headerUl = document.createElement('ul');
        headerUl.className = 'list-unstyled list-hours mb-2 text-left mx-auto fw-bold d-flex justify-content-between flex-wrap';
        const headerLi = document.createElement('li');
        headerLi.className = 'd-flex justify-content-between w-100 flex-wrap';
        const headerNome = document.createElement('span');
        headerNome.textContent = '';
        const headerPrezzi = document.createElement('span');
        headerPrezzi.className = 'd-flex gap-3 flex-wrap';
        const headerBanco = document.createElement('span');
        headerBanco.textContent = 'Banco';
        const headerTavolo = document.createElement('span');
        headerTavolo.textContent = 'Tavolo';
        headerPrezzi.appendChild(headerBanco);
        headerPrezzi.appendChild(headerTavolo);
        headerLi.appendChild(headerNome);
        headerLi.appendChild(headerPrezzi);
        headerUl.appendChild(headerLi);
        w100.appendChild(headerUl);

        // Lista prodotti
        const ulProdotti = document.createElement('ul');
        ulProdotti.className = 'list-unstyled list-hours mb-5 text-left mx-auto';
        prodottiArea.forEach(prodotto => {
            const li = document.createElement('li');
            li.className = 'list-unstyled-item list-hours-item d-flex justify-content-between align-items-center flex-wrap custom_list_item';

            const divInfo = document.createElement('div');
            divInfo.className = 'd-flex flex-column text-start';
            const nome = document.createElement('span');
            nome.textContent = prodotto.nomeProdotto;
            const descrizione = document.createElement('span');
            descrizione.className = 'text-muted small';
            if (!prodotto.descrizione || prodotto.descrizione.trim() === "" || prodotto.descrizione === "&nbsp;") {
                descrizione.innerHTML = "&nbsp;";
            } else {
                descrizione.textContent = '(' + prodotto.descrizione + ')';
            }
            divInfo.appendChild(nome);
            divInfo.appendChild(descrizione);

            const divPrezzi = document.createElement('div');
            divPrezzi.className = 'd-flex gap-3 text-end flex-wrap';
            const prezzoBanco = document.createElement('span');
            prezzoBanco.textContent = prodotto.prezzoBanco || '-';
            prezzoBanco.className = 'fw-bold';
            const prezzoTavolo = document.createElement('span');
            prezzoTavolo.textContent = prodotto.prezzoTavolo || '-';
            prezzoTavolo.className = 'fw-bold text-muted';
            divPrezzi.appendChild(prezzoBanco);
            divPrezzi.appendChild(prezzoTavolo);

            li.appendChild(divInfo);
            li.appendChild(divPrezzi);
            ulProdotti.appendChild(li);
        });

        w100.appendChild(ulProdotti);
        customContainer.appendChild(w100);
        section.appendChild(customContainer);
        ctaInner.appendChild(section);
    }
}


