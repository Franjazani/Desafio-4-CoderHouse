const boton = document.getElementById('boton');
const nombre = document.getElementById('name');
const precio = document.getElementById('price');

console.log(boton);

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        node: 'cors',
        cache: 'no-cache',
        credentials:'same-origin',
        headers: {
            'Contont-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(data),
    });
    return response.json();
}

boton.addEventListener('click', async () => {
    try{
        const data = {
            nombre: nombre.value,
            precio: precio.value,
        };
        boton.reset()
        const url = 'http://localhost:8080/api/productos';
        response = await postData(url, data);

        console.log(response);        
    }catch (err){
        console.log(err);
    }
});