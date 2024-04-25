//Prueba - Lorena Marisol Romero Hernández

// Data
const musicData = [
  { artist: 'Adele', name: '25', sales: 1731000 },
  { artist: 'Drake', name: 'Views', sales: 1608000 },
  { artist: 'Beyonce', name: 'Lemonade', sales: 1554000 },
  { artist: 'Chris Stapleton', name: 'Traveller', sales: 1085000 },
  { artist: 'Pentatonix', name: 'A Pentatonix Christmas', sales: 904000 },
  { artist: 'Original Broadway Cast Recording', name: 'Hamilton: An American Musical', sales: 820000 },
  { artist: 'Twenty One Pilots', name: 'Blurryface', sales: 738000 },
  { artist: 'Prince', name: 'The Very Best of Prince', sales: 668000 },
  { artist: 'Rihanna', name: 'Anti', sales: 603000 },
  { artist: 'Justin Bieber', name: 'Purpose', sales: 554000 }
  ];

  /*
  
  1.- Filtrar en un arreglo los álbumes que hayan vendido más de 1’000,000 de copias. Del
  arreglo filtrado imprimir para cada elemento del arreglo la siguiente salida
  “{artist} es un gran artista”
  
  */

  let albumsMillionSales = musicData.filter(album => album.sales > 1000000);

  /*albumsMillionSales.forEach(album => {
    console.log(`${album.artist} es un gran artista`);
  });*/
  
  const table = document.getElementById("recent-orders--table");
  let bodyContent = '';
  

  albumsMillionSales.forEach(album => {
    bodyContent += `
      <tr>
        <td>${album.sales}</td>
        <td>${album.name}</td>
        <td class="primary">${album.artist} es un gran artista </td>
      </tr>
    `;
  });

  table.innerHTML += bodyContent;

  /*
  
  2.- Sumar el número de copias vendidas de todos los álbumes y guardarlo en la variable totalAlbumSales.
  
  */

  let totalAlbumSales = 0;
  musicData.forEach(album => {
    totalAlbumSales += album.sales;
  });

  //esto es más por el diseño
  const totalDiv = document.querySelector('.total');
  const salesHeader = document.createElement('h1');
  salesHeader.textContent = totalAlbumSales;
  totalDiv.appendChild(salesHeader);

  //console.log("El total de copias vendidas de todos los álbumes es:", totalAlbumSales);

  /* 
  
  3.- Crear otro arreglo filtrando sólo los objetos cuyo nombre tenga más de 8 caracteres,
  guardarlo en la variable longNames. Mostrar en la página los artistas con el siguiente formato:
  “{artist} tiene un nombre muy grande”
  
  */

  let longNames = musicData.filter(album => album.name.length > 8);
  const tableName = document.getElementById("recent-orders--table2");
  bodyContent = '';
  
  longNames.forEach(album => {
    bodyContent += `
      <tr>
        <td class="primary">${album.artist} tiene un nombre muy grande </td>
      </tr>
    `;
  });

  tableName.innerHTML += bodyContent;

  /*
   
   4.- Crear funciones para agregar, borrar y buscar en musicData. La búsqueda deberá hacerse
   por nombre y se deberá regresar los objetos encontrados.

  */
  
   // Función para agregar un nuevo álbum
  function agregarAlbum(artist, name, sales) {
    musicData.push({ artist, name, sales });
  }

  // Función para borrar artista
  function borrarPorArtista(nombreArtista) {
    const index = musicData.findIndex(album => album.artist === nombreArtista);
    if (index !== -1) {
      musicData.splice(index, 1);
      return true;
    }
    return false;
  }

  // Función para buscar un álbum por su nombre
  function buscarPorNombre(nombreAlbum) {
    return musicData.filter(album => album.name.toLowerCase() === nombreAlbum.toLowerCase());
  }


  /*

  5.- Con las funciones creadas
  
      5.1.- Borrar a los artistas Adele, Prince y Justin Bieber
    
      5.2.- Agregar al artista Radiohead con su álbum Ok Computer que vendió 5,000,000 de copias.
      Mostrar el resultado en pantalla.

      5.3.- Agregar un campo de texto y un botón en pantalla para poder hacer la búsqueda, mostrar
      los resultados en una lista con el siguiente formato: 
        “El álbum <name> del artista <artist> vendió aproximadamente <sales> copias.”

  */

  currentTable();

  //   5.1.- Borrar a los artistas Adele, Prince y Justin Bieber
  function borrarAlbumsArtistas() {
    const artistasABorrar = ["Adele", "Prince", "Justin Bieber"];
    artistasABorrar.forEach(artist => {
      const borrado = borrarPorArtista(artist);
      if (borrado) {
        console.log(`Álbumes de ${artist} borrados exitosamente.`);
        swal("¡Eliminados!", "Álbumes de Adele, Prince y Justin Bieber borrados exitosamente.", "success");
      } else {
        console.log(`No se encontraron álbumes de ${artist}.`);
        swal("¡Oh no!", "Álbumes de Adele, Prince y Justin Bieber no se encontraron. Vuelve a cargar la página", "error");
      }
    });

    currentTable();
  }


  document.getElementById('remove').addEventListener('click', borrarAlbumsArtistas);


  //  5.2.- Agregar al artista Radiohead con su álbum Ok Computer que vendió 5,000,000 de copias. Mostrar el resultado en pantalla.

  let albumAgregado = false;

  document.getElementById('add').addEventListener('click', function() {
    if (!albumAgregado) { 
      agregarAlbum("Ok Computer", "Radiohead", 5000000);
      albumAgregado = true; 
      swal("¡Agregado!", "Se agregó exitosamente el artista Radiohead con su álbum Ok Computer que vendió 5,000,000 de copias.", "success");
      currentTable(); 
    }else{
      swal("¡Oh no!", "El artista Radiohead con su álbum Ok Computer que vendió 5,000,000 de copias ya ha sido agregado. Vuelve a cargar la página", "error");
    }
  });
  
  // 5.3.- Agregar un campo de texto y un botón en pantalla para poder hacer la búsqueda, mostrar
  // los resultados en una lista con el siguiente formato:  
  // “El álbum <name> del artista <artist> vendió aproximadamente <sales> copias.”
  

  document.getElementById('buscar').addEventListener('click', function() {
    
    let busqueda = document.getElementById('busqueda').value;
    let res = buscarPorNombre(busqueda);
    const table4 = document.getElementById("recent-orders--table4");
   
    if (res.length === 0) {
      table4.style.display = 'none';
      swal("¡Oh no!", "No se encontraron resultados.", "error");
      
    }else{
      table4.style.display = 'flex';
    }

    table4.innerHTML = '';

    bodyContent = '';
    
  
    res.forEach(album => {
      bodyContent += `
        <tr>
          <td class="primary">El álbum ${album.name} del artista ${album.artist} vendió aproximadamente ${album.sales} copias.</td>
        </tr>
      `;
    });
  
    table4.innerHTML += bodyContent;
  

  });



  // Diseño
  const sideMenu = document.querySelector("aside");
  const menuBtn = document.querySelector("#menu-btn");
  const closeBtn = document.querySelector("#close-btn");
  const themeToggler = document.querySelector(".theme-toggler");
  
  // Show Sidebar
  menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block";
  });
  
  // Hide Sidebar
  closeBtn.addEventListener("click", () => {
    sideMenu.style.display = "none";
  });
  
  // Change Theme
  themeToggler.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme-variables");
  
    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
  });

 // Función para crear tarjeta 
function createCard(artist, name, sales) {
  const card = document.createElement('div');
  
  card.innerHTML = `
  <div class="insights">
  <div class="slide sales">

  <h2>${artist}</h2>
    
    <div class="middle">
      <div class="left">
        <small class="text-muted"> Total Sales</small>
        <h1>${sales}</h1>
      </div>
      <div class="progress">
        
      </div>
    </div>

    <small class="text-muted"> Album</small>
    <h3>${name}</h>
  </div>
</div>
  `;

  return card;
}

// Agregar las tarjetas al carrusel
const carousel = document.querySelector('.carousel');

musicData.forEach(data => {
  const card = createCard(data.artist, data.name, data.sales);
  carousel.appendChild(card);
});


// Función para inicializar el carrusel
function initCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  const carousel = document.querySelector('.carousel');
  const cards = carousel.querySelectorAll('.insights');

  let currentIndex = 0;

  function showCards() {
    cards.forEach((card, index) => {
      if (index >= currentIndex && index < currentIndex + 5) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function moveNext() {
    if (currentIndex < cards.length - 5) {
      currentIndex++;
      showCards();
    }
  }

  function movePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      showCards();
    }
  }

  // Event listeners para los botones de "Anterior" y "Siguiente"
  document.getElementById('preview').addEventListener('click', movePrev);
  document.getElementById('next').addEventListener('click', moveNext);

  // Mostrar las tres primeras tarjetas al inicio
  showCards();
}

// Llamada para inicializar el carrusel una vez que se cargue el contenido
document.addEventListener('DOMContentLoaded', initCarousel);

function currentTable(){
  //tabla con todos los datos
  const table3 = document.getElementById("recent-orders--table3");
  table3.innerHTML = '';
  bodyContent = '';

  bodyContent += `
      <tr>
        <th>Artista</th>
        <th>Album</th>
        <th>Sales</th>
      </tr>
    `;
  
  musicData.forEach(data => {
    bodyContent += `
      <tr>
        <td>${data.artist}</td>
        <td>${data.name}</td>
        <td>${data.sales}</td>
      </tr>
    `;
  });

  table3.innerHTML += bodyContent;
}