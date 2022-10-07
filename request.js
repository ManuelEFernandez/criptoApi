

const baseUrl = "https://api.coinlore.net/api/tickers/";

const buscarMonedas = async (value) => {
    
    try {
        let respuesta = await fetch(baseUrl);
        let json = await respuesta.json();
        let data = json.data
        console.log(data);


        let resultadosFiltro = value 
        ? dividirArray(data.filter((coin) => 
        
        coin.name.toLowerCase().includes(value.toLowerCase())), 10)
        : dividirArray(data, 10); 

        return {
            
            resultadosFiltro: resultadosFiltro,
            total: resultadosFiltro.length,
            current: 0,
            prev: null,
            next: 1,
        };
    } catch (error) {
        
        console.log(error);

    }
   
}



const dividirArray = (array, size) => {

    let fragmento = [];

    for (let index = 0; index < array.length; index += size) {
        
        fragmento.push(array.slice(index, index + size))
        
    }

    return fragmento; 
}

buscarMonedas();

