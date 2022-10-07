const gridMonedas = document.getElementById("gridMonedas");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const numPag = document.getElementById("numPag");
const searchInput = document.getElementById("searchInput");
const top100 = document.getElementById("top100");
const btnContainer = document.getElementById("btnContainer");
const form = document.getElementById("form");
const containerMonedas = document.querySelector(".container-monedas");

let callCount = 1;
const renderCoin = (coin) => {

    callCount +=1;
    const {rank, market_cap_usd, name, symbol, price_usd, volume24, percent_change_24h, percent_change_7d} = coin;


   const verPar = () => {if (callCount % 2 === 0) {

        return 'par'
    }
};
    return `
    
    <div class="item rank ${verPar()}">${rank}</div>
    <div class="item nameCoin ${verPar()}">${name}</div>
    <div class="item price ${verPar()}">$${price_usd}</div> 
    <div class="item marketCap ${verPar()}">$${Math.round(market_cap_usd)}</div>
    <div class="item volumen24 ${verPar()}">$${Math.round(volume24)}</div>
    <div class="item ${verPar()} ${percent_change_24h < 0 ? 'notStonks' : 'stonks'}">${percent_change_24h}</div>
    <div class="item ${verPar()} ${percent_change_7d < 0 ? 'notStonks' : 'stonks'}">${percent_change_7d}</div>
    
    
    
    `
}


const renderCoins = async (coins, current) => {

    if(!coins.length) {

       gridMonedas.innerHTML = `<div class="error">No hubo resultados</div>`;

        top100.classList.remove("hidden");
        btnContainer.classList.remove("hidden");
        form.reset();
        return;
    }

    btnContainer.classList.remove("hidden");

    
    gridMonedas.innerHTML = coins[current].map(renderCoin).join('');

};

const setearMonedas = (coins) => {

    prev = coins.prev;
    current = coins.current;
    next = coins.next;
    total = coins.total;
    results = coins.resultadosFiltro;

    
}


const deshabilitarBtnPrev = (prev) => {

    if (prev === null) {

        btnPrev.classList.add('disabled');
    } else {

        btnPrev.classList.remove('disabled');
    }

};

const deshabilitarBtnNext = (next, total) => {

    if (next === total) {

        btnNext.classList.add('disabled');
    } else {

        btnNext.classList.remove('disabled');
    }

}

const cargaMonedas = async (e) => {

    e.preventDefault();
    let valorBuscado = searchInput.value.trim();
    let coins = await buscarMonedas(valorBuscado);
    console.log(coins);
    setearMonedas(coins);

    if(valorBuscado) {
        top100.classList.remove("hidden");
        form.reset();

    } else {

        top100.classList.add("hidden");
    }

    numPag.innerHTML = current + 1;
    console.log(results);
    renderCoins(results, current);
    deshabilitarBtnPrev(prev);
    deshabilitarBtnNext(next, total);

    btnNext.addEventListener('click', (e) => {

        e.stopImmediatePropagation();
        if (next === total) return;

        prev = current;
        current +=1;
        next +=1;
        renderCoins(results, current);
        numPag.innerHTML = current + 1;
        deshabilitarBtnPrev(prev);
        deshabilitarBtnNext(next, total);
    })


    btnPrev.addEventListener('click', (e) => {

        e.stopImmediatePropagation();
        if (prev === null) return;

        
        current -=1;
        next -=1;
        prev = prev === 0 ? null : current - 1;
        renderCoins(results, current);
        numPag.innerHTML = current + 1;
        deshabilitarBtnPrev(prev);
        deshabilitarBtnNext(next, total);
        
    })
}

const showTop100 = () => {

    cargaMonedas();
}


const init = () => {

    
    window.addEventListener('DOMContentLoaded', cargaMonedas);
    form.addEventListener('submit', cargaMonedas);
    top100.addEventListener('click', cargaMonedas);

}

init();