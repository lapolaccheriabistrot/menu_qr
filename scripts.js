// /*!
// * Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
// * Copyright 2013-2023 Start Bootstrap
// * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
// */

// let prodottiJson = [];

// window.addEventListener('DOMContentLoaded', event => {
//     const listHoursArray = document.body.querySelectorAll('.list-hours li');
//     listHoursArray[new Date().getDay()].classList.add(('today'));
// })

// // --- CARICO IL JSON ---
// fetch("prodotti.json")
//   .then(response => response.json())
//   .then(prodotti => {
//     prodottiJson = prodotti;
//   });


// *********************************************

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

function generaMenu(prodotti) {
    const ctaInner = document.querySelector('.cta-inner');
    if (!ctaInner) return;

    // Raggruppo i prodotti per macroArea
    const prodottiPerArea = {};
    prodotti.forEach(p => {
        if (!prodottiPerArea[p.macroArea]) {
            prodottiPerArea[p.macroArea] = [];
        }
        prodottiPerArea[p.macroArea].push(p);
    });

    // Pulisco il contenuto originale
    ctaInner.innerHTML = '';

    // Creo dinamicamente le sezioni
    for (const [macroArea, prodottiArea] of Object.entries(prodottiPerArea)) {
        const section = document.createElement('div');

        // Titolo sezione
        const h2 = document.createElement('h2');
        h2.className = 'section-heading mb-5';
        const span = document.createElement('span');
        span.className = 'section-heading-lower custom_section_heading';
        span.textContent = macroArea;
        h2.appendChild(span);
        section.appendChild(h2);

        // Contenitore prodotti
        const customTitle = document.createElement('div');
        customTitle.className = 'custom_title';
        customTitle.textContent = macroArea;
        section.appendChild(customTitle);

        const customContainer = document.createElement('div');
        customContainer.className = 'custom_container';

        const w100 = document.createElement('div');
        w100.className = 'w-100';

        const ul = document.createElement('ul');
        ul.className = 'list-unstyled list-hours mb-5 text-left mx-auto';

        prodottiArea.forEach(prodotto => {
            const li = document.createElement('li');
            li.className = 'list-unstyled-item list-hours-item d-flex justify-content-between custom_list_item';

            const div = document.createElement('div');
            div.className = 'd-flex flex-column text-start';

            const nome = document.createElement('span');
            nome.textContent = prodotto.nomeProdotto;

            const descrizione = document.createElement('span');
            descrizione.className = 'text-muted small';
            if (
              !prodotto.descrizione ||
              prodotto.descrizione.trim() === "" ||
              prodotto.descrizione === "&nbsp;"
            ) {
              // Inserisce il carattere &nbsp;
              descrizione.innerHTML = "&nbsp;";
            } else {
              // Inserisce la descrizione del prodotto
              descrizione.textContent = '(' + prodotto.descrizione + ')';
            }

            div.appendChild(nome);
            div.appendChild(descrizione);

            const prezzo = document.createElement('span');
            prezzo.textContent = prodotto.prezzo;

            li.appendChild(div);
            li.appendChild(prezzo);
            ul.appendChild(li);
        });

        w100.appendChild(ul);
        customContainer.appendChild(w100);
        section.appendChild(customContainer);

        ctaInner.appendChild(section);
    }
}

