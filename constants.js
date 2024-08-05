const EXAMPLE_RESPONSE =   {
  "patientInfo": {
    "name": "John Arias",
    "age": 34
  },
  "examResults": {
    "orientation": {
      "score": 4,
      "analysis": "Dificultades significativas en la orientación, especialmente en preguntas sobre ubicación (país, región, ciudad, lugar exacto). Esto puede indicar problemas en la memoria reciente o en la comprensión de su entorno."
    },
    "fixation": {
      "score": 3,
      "analysis": "Buena capacidad de memoria a corto plazo, ya que recordó todas las palabras correctamente."
    },
    "calcAttention": {
      "score": 5,
      "analysis": "Buena capacidad en tareas de cálculo y atención, aunque la puntuación máxima considerada es 5."
    },
    "memory": {
      "score": 3,
      "analysis": "Memoria reciente intacta, ya que recordó todas las palabras correctamente."
    },
    "language": {
      "score": 9,
      "analysis": "Buenas habilidades lingüísticas en todas las tareas evaluadas."
    }
  },
  "totalScore": {
    "score": 24,
    "analysis": "La puntuación total de 24 se encuentra justo en el límite inferior de lo considerado normal (24-30). A pesar de esto, las dificultades en la orientación indican la necesidad de una evaluación cognitiva más detallada y posiblemente una consulta con un especialista."
  },
  "recommendations": [
    "Realizar una evaluación cognitiva más detallada con un neurólogo o psicólogo especializado en cognición.",
    "Participar en actividades que estimulen la orientación espacial y temporal, como juegos de memoria y rompecabezas.",
    "Revisar factores de riesgo como el sueño, la nutrición, el estrés y la salud general para asegurar que no haya condiciones médicas subyacentes afectando el rendimiento cognitivo.",
    "Programar revisiones regulares para monitorear cualquier cambio en el estado cognitivo."
  ]
}




module.exports = {
    EXAMPLE_RESPONSE
};
