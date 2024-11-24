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
<<<<<<< HEAD
// Comentario de prueba
const combate = ()=>{
    console.log("Están peleando lmao")
}

//Cuando no hay efectividad de ataque el valor es 1, ya que como se multiplica lo mantiene igual
//Es un diccionario clave:valor
const tablaEfectividad = {
    steel: {
        bug: 1, ghost: 1, ice: 2, fighting: 1, 
        normal: 1, grass: 1, psychic: 1, rock: 2, dark: 1, ground: 1, flying: 1, fairy: 2
    },
    water: {
        fire: 2, ground: 2, rock: 2, steel: 1, electric: 1, bug: 1, 
        ghost: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, poison: 1, flying: 1, ice: 1, fairy: 1
    },
    bug: {
        grass: 2, psychic: 2, dark: 2,
        water: 1, bug: 1, dragon: 1, electric: 1, ghost: 0.5, ice: 1, normal: 1, rock: 1, ground: 1,
    },
    dragon: {
        dragon: 2, fire: 1, water: 1, grass: 1, electric: 1, bug: 1, ghost: 1, 
        fighting: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, flying: 1, ice: 1, ground: 1
    },
    electric: {
        water: 2, flying: 2, steel: 1,  bug: 1, ghost: 1,
        fire: 1, fighting: 1, ice: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    ghost: {
        psychic: 2, ghost: 2, steel: 1, water: 1, bug: 1, dragon: 1, electric: 1,
        fire: 1, ice: 1, fighting: 1, grass: 1, rock: 1, ground: 1, poison: 1, flying: 1, fairy: 1
    },
    fire: {
        grass: 2, ice: 2, bug: 2, steel: 2, ground: 1,
        electric: 1, ghost: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, poison: 1, flying: 1, fairy: 1
    },
    fairy: {
        dragon: 2, fighting: 2, dark: 2, water: 1, bug: 1, electric: 1,
        ghost: 1, ice: 1, normal: 1, grass: 1, psychic: 1, rock: 1, ground: 1, flying: 1, fairy: 1
    },
    ice: {
        grass: 2, ground: 2, flying: 2, dragon: 2, bug: 1, 
        electric: 1, ghost: 1, fighting: 1, normal: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    fighting: {
        normal: 2, ice: 2, rock: 2, dark: 2, steel: 2,
        fairy: 0.5, ghost: 0, water: 1, dragon: 1, electric: 1, fire: 1, fighting: 1, grass: 1, ground: 1
    },
    normal: {
        water: 1, bug: 1, dragon: 1, electric: 1, fire: 1, ice: 1,
        fighting: 1, grass: 1, psychic: 1, dark: 1, ground: 1, poison: 1, flying: 1, fairy: 1
    },
    grass: {
        water: 2, ground: 2, rock: 2,
        electric: 1, ghost: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, fairy: 1
    },
    psychic: {
        fighting: 2, poison: 2, water: 1, bug: 1, dragon: 1, electric: 1,
        ghost: 1, fire: 1, ice: 1, normal: 1, grass: 1, rock: 1, ground: 1, flying: 1, fairy: 1
    },
    rock: {
        fire: 2, ice: 2, flying: 2, bug: 2, water: 1, dragon: 1,
        electric: 1, ghost: 1, normal: 1, grass: 1, psychic: 1, rock: 1, dark: 1, poison: 1, fairy: 1
    },
    dark: {
        psychic: 2, ghost: 2, steel: 1, water: 1, bug: 1, dragon: 1,
        electric: 1, fire: 1, ice: 1, normal: 1, grass: 1, rock: 1, ground: 1, poison: 1, flying: 1
    },
    ground: {
        fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, water: 1,
        dragon: 1, ghost: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, dark: 1, fairy: 1
    },
    poison: {
        grass: 2, fairy: 2, water: 1, bug: 1,
        dragon: 1, electric: 1, fire: 1, ice: 1, fighting: 1, normal: 1, psychic: 1, flying: 1, dark: 1
    },
    flying: {
        grass: 2, fighting: 2, bug: 2, water: 1, dragon: 1, ghost: 1,
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



const combate = () => {
    const calcularDaño = (ataque, defensa) => {
        let daño = ataque - defensa;
        return daño <= 0 ? 1 : daño; // Daño mínimo de 1
    };

=======
const combate = () => {
    const calcularDaño = (ataque, defensa) => {
        let daño = ataque - defensa;
        return daño <= 0 ? 1 : daño; // Daño mínimo de 1
    };

>>>>>>> origin/Paul
    const aplicarDaño = (defensor, vida, daño) => {
        defensor.innerHTML = Math.max(0, vida - daño); // Evitar vida negativa
    };

    const obtenerTipoMultiplicador = (tipoAtacante, tipoDefensor) => {
        // Aquí podrías integrar la lógica completa de la tabla de tipos (de PokeAPI o manual).
        // Por simplicidad, asumiremos un multiplicador de 1 por defecto.
        return 1; 
    };

    // Variables para stats iniciales
    let vidaPropioActual = parseInt(vidaPropio.innerHTML);
    let vidaRivalActual = parseInt(vidaRival.innerHTML);

<<<<<<< HEAD
=======
    const velocidadPropioValor = parseInt(velocidadPropio.innerHTML);
    const velocidadRivalValor = parseInt(velocidadRival.innerHTML);

    const turnoPrimero = velocidadPropioValor >= velocidadRivalValor ? "propio" : "rival";

    const ejecutarTurno = (atacante, defensor, tipoAtaque) => {
        const ataque = tipoAtaque === "fisico" 
            ? parseInt(atacante.ataqueFis.innerHTML) 
            : parseInt(atacante.ataqueEsp.innerHTML);
        const defensa = tipoAtaque === "fisico" 
            ? parseInt(defensor.defensaFis.innerHTML) 
            : parseInt(defensor.defensaEsp.innerHTML);

        const dañoBase = calcularDaño(ataque, defensa);

        // Multiplicador por tipo
        const tipoMultiplicador = obtenerTipoMultiplicador(
            atacante.tipo1.innerHTML, 
            defensor.tipo1.innerHTML
        );

        const dañoFinal = Math.round(dañoBase * tipoMultiplicador);
        aplicarDaño(defensor.vida, parseInt(defensor.vida.innerHTML), dañoFinal);
    };

    while (vidaPropioActual > 0 && vidaRivalActual > 0) {
>>>>>>> origin/Paul
        if (turnoPrimero === "propio") {
            // Turno del Pokémon propio
            ejecutarTurno(
                {
                    ataqueFis: atkFisPropio,
                    ataqueEsp: atkEspPropio,
                    tipo1: tipo1Propio,
                    tipo2: tipo2Propio,
                },
                {
                    defensaFis: defensaFisRival,
                    defensaEsp: defensaEspRival,
                    vida: vidaRival,
                    tipo1: tipo1Rival,
                    tipo2: tipo2Rival,
                },
                btnAtkFis.clicked ? "fisico" : "especial"
            );

            // Revisar si el rival perdió
            if (parseInt(vidaRival.innerHTML) <= 0) {
                alert("¡Ganaste!");
                return;
            }

            // Turno del rival
            ejecutarTurno(
                {
                    ataqueFis: atkFisRival,
                    ataqueEsp: atkEspRival,
                    tipo1: tipo1Rival,
                    tipo2: tipo2Rival,
                },
                {
                    defensaFis: defensaFisPropio,
                    defensaEsp: defensaEspPropio,
                    vida: vidaPropio,
                    tipo1: tipo1Propio,
                    tipo2: tipo2Propio,
                },
                "fisico"
            );

            // Revisar si perdiste
            if (parseInt(vidaPropio.innerHTML) <= 0) {
                alert("¡Perdiste!");
                return;
            }
        }
<<<<<<< HEAD
=======
    }
>>>>>>> origin/Paul
};

  

window.addEventListener('load', obtenerPokeRival);

btnElegir.addEventListener('click', obtenerPokePropio);

//btnAtkFis.addEventListener('click', combate);
<<<<<<< HEAD

btnAtkFis.addEventListener("click", () => combate("fisico"));
btnAtkEsp.addEventListener("click", () => combate("especial"));
=======
>>>>>>> origin/Paul

btnAtkFis.addEventListener("click", () => combate("fisico"));
btnAtkEsp.addEventListener("click", () => combate("especial"));
