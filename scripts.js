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

let prodottiJson = [];

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

// function generaMenu(prodotti) {
//     const ctaInner = document.querySelector('.cta-inner');
//     if (!ctaInner) return;

//     // Raggruppo i prodotti per macroArea
//     const prodottiPerArea = {};
//     prodotti.forEach(p => {
//         if (!prodottiPerArea[p.macroArea]) {
//             prodottiPerArea[p.macroArea] = [];
//         }
//         prodottiPerArea[p.macroArea].push(p);
//     });

//     // Pulisco il contenuto originale
//     ctaInner.innerHTML = '';

//     // Creo dinamicamente le sezioni
//     for (const [macroArea, prodottiArea] of Object.entries(prodottiPerArea)) {
//         const section = document.createElement('div');

//         // Titolo principale della sezione: macroArea
//         const h2 = document.createElement('h2');
//         h2.className = 'section-heading mb-5';
//         const span = document.createElement('span');
//         span.className = 'section-heading-lower custom_section_heading';
//         span.textContent = macroArea;
//         h2.appendChild(span);
//         section.appendChild(h2);

//         // Titolo sotto: categoria del primo prodotto
//         const customTitle = document.createElement('div');
//         customTitle.className = 'custom_title';
//         customTitle.textContent = prodottiArea[0].categoria;
//         section.appendChild(customTitle);

//         const customContainer = document.createElement('div');
//         customContainer.className = 'custom_container';

//         const w100 = document.createElement('div');
//         w100.className = 'w-100';

//         const ul = document.createElement('ul');
//         ul.className = 'list-unstyled list-hours mb-5 text-left mx-auto';

//         // Intestazione prezzi
//         const liHeader = document.createElement('li');
//         liHeader.className = 'list-unstyled-item list-hours-item d-flex justify-content-between custom_list_item fw-bold';
//         const nomeHeader = document.createElement('div');
//         nomeHeader.className = 'd-flex flex-column text-start';
//         nomeHeader.textContent = ''; // vuoto per colonna nome
//         const prezzoBancoHeader = document.createElement('span');
//         prezzoBancoHeader.textContent = 'Banco';
//         const prezzoTavoloHeader = document.createElement('span');
//         prezzoTavoloHeader.textContent = 'Tavolo';
//         liHeader.appendChild(nomeHeader);
//         liHeader.appendChild(prezzoBancoHeader);
//         liHeader.appendChild(prezzoTavoloHeader);
//         ul.appendChild(liHeader);

//         // Lista prodotti
//         prodottiArea.forEach(prodotto => {
//             const li = document.createElement('li');
//             li.className = 'list-unstyled-item list-hours-item d-flex justify-content-between custom_list_item';

//             const div = document.createElement('div');
//             div.className = 'd-flex flex-column text-start';

//             const nome = document.createElement('span');
//             nome.textContent = prodotto.nomeProdotto;

//             const descrizione = document.createElement('span');
//             descrizione.className = 'text-muted small';
//             if (!prodotto.descrizione || prodotto.descrizione.trim() === "" || prodotto.descrizione === "&nbsp;") {
//                 descrizione.innerHTML = "&nbsp;"; // vero carattere non separabile
//             } else {
//                 descrizione.textContent = '(' + prodotto.descrizione + ')';
//             }

//             div.appendChild(nome);
//             div.appendChild(descrizione);

//             const prezzoBanco = document.createElement('span');
//             prezzoBanco.textContent = prodotto.prezzoBanco;

//             const prezzoTavolo = document.createElement('span');
//             prezzoTavolo.textContent = prodotto.prezzoTavolo;

//             li.appendChild(div);
//             li.appendChild(prezzoBanco);
//             li.appendChild(prezzoTavolo);

//             ul.appendChild(li);
//         });

//         w100.appendChild(ul);
//         customContainer.appendChild(w100);
//         section.appendChild(customContainer);
//         ctaInner.appendChild(section);
//     }
// }

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

        // Contenitore categoria
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
        headerUl.className = 'list-unstyled list-hours mb-2 text-left mx-auto fw-bold d-flex justify-content-between';
        const headerLi = document.createElement('li');
        headerLi.className = 'd-flex justify-content-between w-100';
        const headerNome = document.createElement('span');
        headerNome.textContent = ''; // Nome prodotto vuoto
        const headerPrezzi = document.createElement('span');
        headerPrezzi.className = 'd-flex gap-3';
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
        const ul = document.createElement('ul');
        ul.className = 'list-unstyled list-hours mb-5 text-left mx-auto';

        prodottiArea.forEach(prodotto => {
            const li = document.createElement('li');
            li.className = 'list-unstyled-item list-hours-item d-flex justify-content-between align-items-center custom_list_item';

            // Div nome e descrizione
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

            // Div prezzi affiancati
            const divPrezzi = document.createElement('div');
            divPrezzi.className = 'd-flex gap-3 text-end';

            const prezzoBanco = document.createElement('span');
            prezzoBanco.textContent = prodotto.prezzoBanco || '-';
            prezzoBanco.className = 'fw-bold';

            const prezzoTavolo = document.createElement('span');
            prezzoTavolo.textContent = prodotto.prezzoTavolo || '-';
            prezzoTavolo.className = 'fw-bold text-muted';

            divPrezzi.appendChild(prezzoBanco);
            divPrezzi.appendChild(prezzoTavolo);

            // Appendo tutto al li
            li.appendChild(divInfo);
            li.appendChild(divPrezzi);
            ul.appendChild(li);
        });

        w100.appendChild(ul);
        customContainer.appendChild(w100);
        section.appendChild(customContainer);

        ctaInner.appendChild(section);
    }
}









