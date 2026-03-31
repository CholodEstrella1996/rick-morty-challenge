export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; // Ejemplo: "S01E01"
  characters: string[]; // Lista de URLs de los personajes que aparecen
  url: string;
  created: string;
}
