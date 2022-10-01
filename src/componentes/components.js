
import { peticionHttp } from './http-provider'

const busqueda = document.querySelector('#busqueda');
const divDefinicion = document.querySelector('.significado');
const divPronunciacion = document.querySelector('.pronunciacion');
const btnBusqueda = document.querySelector('.icon');


const eventos = () =>{  

    busqueda.addEventListener( 'keyup', async(evento) => {
            // divDefinicion.classList.remove( 'active' );
            // divPronunciacion.classList.remove( 'active' );
        if( evento.keyCode === 13 && busqueda.value.length > 0){

            desactivarEfecto();

            // Extraer palabra
            const palabra = busqueda.value;
            const info = await buscarPalabra(palabra);

            //Agregar valores a variables
            const definicion = info.definition
            const pronunciacion = info.text

            //Limpiar para una nueva busqueda 
            divDefinicion.innerText = '';
            divPronunciacion.innerText = '';
            
            crearHtml(definicion,pronunciacion);
            

            //efecto
            activarEfecto();

        }
    });

};

const activarEfecto = () => {

    divDefinicion.classList.add( 'active' );
    divPronunciacion.classList.add( 'active' );

};

const desactivarEfecto = () => {

    divDefinicion.classList.remove( 'active' );
    divPronunciacion.classList.remove( 'active' );

};

const crearHtml = (definicion,pronunciacion) => {
    //pronunciacion campo

    if( pronunciacion ){

        const pronElement = document.createElement('p')
        pronElement.innerText = pronunciacion
        divPronunciacion.append(pronElement)
        
    };
    //Definicion campo
    
    const defElement = document.createElement('p')
    defElement.innerText = definicion
    divDefinicion.append(defElement);
    
} ;

const buscarPalabra = async(word) => {
    try {
        return await peticionHttp(word); 
    } catch (error) {
        return{
            definition: 'No definition found',
            text: 'What?'
        }
    }
};


const init = () => {
    eventos();
};


export{
    init
}

