//Atributos poke rival
const imgRival = document.querySelector('#pokeRival');
const nombreRival = document.querySelector('#nombreRival');
const tipo1Rival = document.querySelector('#tipo1Rival');
const tipo2Rival = document.querySelector('#tipo2Rival');
const atkFisRival = document.querySelector('#ataqueFisRival'); 
const atkEspRival = document.querySelector('#ataqueEspRival');
const vidaRival = document.querySelector('#vidaRival');
const defensaEspRival = document.querySelector('#defensaEspRival');
const defensaFisRival = document.querySelector('#defensaFisRival');
const velocidadRival = document.querySelector('#velocidadRival');

//Atributos poke propio
const imgPropio = document.querySelector('#pokePropio');
const nombrePropio = document.querySelector('#nombrePropio');
const tipo1Propio = document.querySelector('#tipo1Propio');
const tipo2Propio = document.querySelector('#tipo2Propio');
const atkFisPropio = document.querySelector('#ataqueFisPropio'); 
const atkEspPropio = document.querySelector('#ataqueEspPropio');
const vidaPropio = document.querySelector('#vidaPropio');
const defensaEspPropio = document.querySelector('#defensaEspPropio');
const defensaFisPropio = document.querySelector('#defensaFisPropio');
const velocidadPropio = document.querySelector('#velocidadPropio');
//Interfaz de usuario

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnAtkFis  = document.querySelector('#btn-atk-fis');
const btnAtkEsp  = document.querySelector('#btn-atk-esp');

//Método de número random
const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
}

//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = ()=>{
    const num = input.value;

    console.log(num);

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res)=>{
        return res.data
    }).then((res)=>{
        imgPropio.src = res.sprites.back_default;
        nombrePropio.innerHTML = res.name;
        tipo1Propio.innerHTML = res.types[0].type.name;
        try{
            tipo2Propio.innerHTML = res.types[1].type.name;
            if(tipo2Propio.innerHTML === undefined){
                throw Error
            }
        }catch(Error){
            tipo2Propio.innerHTML = ""
        }
        vidaPropio.innerHTML = res.stats[0].base_stat;
        atkFisPropio.innerHTML = res.stats[1].base_stat;
        atkEspPropio.innerHTML = res.stats[3].base_stat;
        defensaFisPropio.innerHTML = res.stats[2].base_stat;
        defensaEspPropio.innerHTML = res.stats[4].base_stat;
        velocidadPropio.innerHTML = res.stats[5].base_stat; 
    })
}
//Se generará un pokemon rival aleatorio 
const obtenerPokeRival = () =>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{
        console.log(res.data)
        return res.data
    }).then((res)=>{
        
        imgRival.src = res.sprites.front_default;
        nombreRival.innerHTML = res.name;
        tipo1Rival.innerHTML = res.types[0].type.name;
        try{
            tipo2Rival.innerHTML = res.types[1].type.name;
            if(tipo2Rival.innerHTML === undefined){
                throw Error
            }
        }catch(Error){
            tipo2Rival.innerHTML = ""
        }
        vidaRival.innerHTML = res.stats[0].base_stat;
        atkFisRival.innerHTML = res.stats[1].base_stat;
        atkEspRival.innerHTML = res.stats[3].base_stat;
        defensaFisRival.innerHTML = res.stats[2].base_stat;
        defensaEspRival.innerHTML = res.stats[4].base_stat;
        velocidadRival.innerHTML = res.stats[5].base_stat; 

    })
}
//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador
const combate = ()=>{
    console.log("Están peleando lmao")
}

//Cuando no hay efectividad de ataque el valor es 1, ya que como se multiplica lo mantiene igual
//Es un diccionario clave:valor
const tablaEfectividad = {
    steel: {
        steel: 0.5, water: 0.5, bug: 1, dragon: 0.5, electric: 0.5, ghost: 1, fire: 0.5, ice: 2, fighting: 1, 
        normal: 1, grass: 1, psychic: 1, rock: 2, dark: 1, ground: 1, poison: 0.5, flying: 1, fairy: 2
    },
    water: {
        fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5, steel: 1, electric: 1, bug: 1, 
        ghost: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, poison: 1, flying: 1, ice: 1, fairy: 1
    },
    bug: {
        grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, steel: 0.5,
        water: 1, bug: 1, dragon: 1, electric: 1, ghost: 0.5, ice: 1, normal: 1, rock: 1, ground: 1, fairy: 0.5
    },
    dragon: {
        dragon: 2, steel: 0.5, fairy: 0, fire: 1, water: 1, grass: 1, electric: 1, bug: 1, ghost: 1, 
        fighting: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, flying: 1, ice: 1, ground: 1
    },
    electric: {
        water: 2, flying: 2, ground: 0, grass: 0.5, electric: 0.5, steel: 1, dragon: 0.5, bug: 1, ghost: 1,
        fire: 1, fighting: 1, ice: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    ghost: {
        psychic: 2, ghost: 2, normal: 0, dark: 0.5, steel: 1, water: 1, bug: 1, dragon: 1, electric: 1,
        fire: 1, ice: 1, fighting: 1, grass: 1, rock: 1, ground: 1, poison: 1, flying: 1, fairy: 1
    },
    fire: {
        grass: 2, ice: 2, bug: 2, steel: 2, water: 0.5, rock: 0.5, fire: 0.5, dragon: 0.5, ground: 1,
        electric: 1, ghost: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, poison: 1, flying: 1, fairy: 1
    },
    fairy: {
        dragon: 2, fighting: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5, water: 1, bug: 1, electric: 1,
        ghost: 1, ice: 1, normal: 1, grass: 1, psychic: 1, rock: 1, ground: 1, flying: 1, fairy: 1
    },
    ice: {
        grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5, bug: 1, 
        electric: 1, ghost: 1, fighting: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    fighting: {
        normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5,
        fairy: 0.5, ghost: 0, water: 1, dragon: 1, electric: 1, fire: 1, fighting: 1, grass: 1, ground: 1
    },
    normal: {
        rock: 0.5, ghost: 0, steel: 0.5, water: 1, bug: 1, dragon: 1, electric: 1, fire: 1, ice: 1,
        fighting: 1, grass: 1, psychic: 1, dark: 1, ground: 1, poison: 1, flying: 1, fairy: 1
    },
    grass: {
        water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5,
        steel: 0.5, electric: 1, ghost: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, fairy: 1
    },
    psychic: {
        fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0, water: 1, bug: 1, dragon: 1, electric: 1,
        ghost: 1, fire: 1, ice: 1, normal: 1, grass: 1, rock: 1, ground: 1, flying: 1, fairy: 1
    },
    rock: {
        fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5, water: 1, dragon: 1,
        electric: 1, ghost: 1, normal: 1, grass: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    dark: {
        psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5, steel: 1, water: 1, bug: 1, dragon: 1,
        electric: 1, fire: 1, ice: 1, normal: 1, grass: 1, rock: 1, ground: 1, poison: 1, flying: 1
    },
    ground: {
        fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0, water: 1,
        dragon: 1, ghost: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, fairy: 1
    },
    poison: {
        grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, water: 1, bug: 1,
        dragon: 1, electric: 1, fire: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, flying: 1, dark: 1
    },
    flying: {
        grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5, water: 1, dragon: 1, ghost: 1,
        fire: 1, ice: 1, normal: 1, psychic: 1, ground: 1, poison: 1, dark: 1, fairy: 1
    }
};


//Funcionalidad de la efectividad (Uso de la Tabla)
function obtenerValor(tablaEfectividad, tipoAtacante, tipo){
    if (tablaEfectividad.hasOwnProperty(tipoAtacante)) {
        const subdiccionario = tablaEfectividad[tipoAtacante];
        if (subdiccionario.hasOwnProperty(tipo)) {
            return subdiccionario[tipo];
        }
    }
    return null; 
}

//Funcionalidad de la efectividad (Uso de la Tabla)

//Pasar las variables
//Tipo1Propio
//tipo1Rival
const efectividad = (tipo1Atacante, tipo1Rival) => {
    tipo1Atacante = tipo1Atacante.textContent; 
    tipo1Rival = tipo1Rival.textContent
    //Esta variable devuelve el multiplicador de efectividad
    let multiplicador = obtenerValor(tablaEfectividad,tipo1Atacante, tipo1Rival);
    return multiplicador;
};

window.addEventListener('load', obtenerPokeRival);

btnElegir.addEventListener('click', obtenerPokePropio);

btnAtkFis.addEventListener('click', combate);