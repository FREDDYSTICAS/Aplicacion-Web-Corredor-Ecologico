/*const API_KEY = 'AIzaSyB0e0K43ciNWxEPpUsjkVWaZFnNB168ct4'; // Reemplaza esto con tu clave API de Google Cloud

async function generateContent() {
  const prompt = "Explain how AI works";  // El texto que se le pasa al modelo para generar contenido

  try {
    // Hacemos la solicitud POST a la API de Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'  // Especificamos que el contenido es JSON
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt  // El texto que vamos a generar con la IA
              }
            ]
          }
        ]
      })
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.error.message}`);
    }

    // Parseamos la respuesta JSON
    const data = await response.json();

    // Verificamos la respuesta de la API y mostramos el resultado
    console.log("API Response:", data);

    // Aquí puedes ajustar cómo se maneja la respuesta según la estructura de datos
    if (data && data.contents && data.contents.length > 0) {
      const generatedContent = data.contents[0]?.parts[0]?.text;
      if (generatedContent) {
        console.log("Generated Content:", generatedContent);
        // Aquí puedes hacer lo que desees con el contenido generado
        document.getElementById('output').innerText = generatedContent;  // Muestra el contenido generado en un div con id "output"
      } else {
        throw new Error('The API response does not contain generated content.');
      }
    } else {
      throw new Error('The API response does not contain expected data.');
    }
  } catch (error) {
    console.error('Error generating content:', error);
    alert(`Error generating content: ${error.message}`);
  }
}

// Llamada a la función para generar contenido
generateContent();
*/
// aca menu desplegable
        function toggleSidebar() {
            const sidebar = document.getElementById('profileSidebar');
            sidebar.classList.toggle('active');
        }
    