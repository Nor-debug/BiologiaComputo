document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    let temas = [];

    // 1. Cargar los datos del JSON
    fetch('data/temas.json')
        .then(response => response.json())
        .then(data => {
            temas = data;
        })
        .catch(error => console.error('Error cargando los temas:', error));

    // 2. Escuchar lo que escribe el usuario
    searchInput.addEventListener('input', (e) => {
        const busqueda = e.target.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        if (busqueda.length === 0) {
            resultsContainer.innerHTML = '<p style="text-align: center; color: #888; margin-top: 20px;">Escribe para buscar...</p>';
            return;
        }

        // 3. Filtrar
        const resultados = temas.filter(tema => 
            tema.titulo.toLowerCase().includes(busqueda) || 
            tema.descripcion.toLowerCase().includes(busqueda)
        );

        // 4. Mostrar resultados
        if (resultados.length > 0) {
            resultados.forEach(tema => {
                const item = document.createElement('div');
                item.classList.add('result-item');
                item.innerHTML = `
                    <span class="result-category">${tema.categoria}</span>
                    <h3>${tema.titulo}</h3>
                    <p>${tema.descripcion}</p>
                `;
                resultsContainer.appendChild(item);
            });
        } else {
            resultsContainer.innerHTML = '<p style="text-align: center;">No se encontraron temas con esa palabra.</p>';
        }
    });
});