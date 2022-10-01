let url; //'https://api.dictionaryapi.dev/api/v2/entries/en/chair';

const peticionHttp = async(palabra) =>{
    try {

        url = `https://api.dictionaryapi.dev/api/v2/entries/en/${palabra}`


        const respuesta = await fetch(url) 

        if( !respuesta.ok ){ throw 'No se pudo realizar la peticion' }
    
        const [obj] = await respuesta.json();
    
        //Extraer definicion
        const {meanings,phonetics} = obj;
        const { definitions } = meanings[0];
        const { definition } = definitions[0];
        //extraer pronunciacion
        const { text } = phonetics[0]
        return { definition,text }

    } catch (error) {
        throw error
    }

};

export{
    peticionHttp
}