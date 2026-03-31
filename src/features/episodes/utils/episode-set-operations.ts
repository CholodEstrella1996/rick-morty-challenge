/**
 * Extrae los IDs individuales numéricos desde un array de URLs de la API de Rick and Morty.
 * Ejemplo: "https://rickandmortyapi.com/api/episode/28" => 28
 */
function extractEpisodeIds(episodeUrls: string[]): number[] {
  if (!episodeUrls) return [];
  return episodeUrls
    .map((url) => {
      const parts = url.split('/');
      return parseInt(parts[parts.length - 1], 10);
    })
    .filter((id) => !isNaN(id));
}

/**
 * Calcula la intersección y diferencias (matemáticas de conjuntos)
 * de los episodios entre dos arrays de URLs de personajes.
 *
 * @param character1Episodes URLs de episodios del Personaje 1
 * @param character2Episodes URLs de episodios del Personaje 2
 */
export function calculateEpisodeIntersections(
  character1Episodes: string[],
  character2Episodes: string[]
) {
  const ids1 = new Set(extractEpisodeIds(character1Episodes));
  const ids2 = new Set(extractEpisodeIds(character2Episodes));

  // Episodios donde SÓLO aparece el Personaje 1 (ids1 - ids2)
  const exclusive1 = [...ids1].filter((id) => !ids2.has(id));

  // Episodios donde SÓLO aparece el Personaje 2 (ids2 - ids1)
  const exclusive2 = [...ids2].filter((id) => !ids1.has(id));

  // Episodios COMPARTIDOS donde aparecen AMBOS (ids1 ∩ ids2)
  const shared = [...ids1].filter((id) => ids2.has(id));

  // Array único con absolutamente todos los IDs combinados.
  // Nos sirve para hacer un único llamado a la API de un solo tirón.
  const allNeededIds = [...new Set([...ids1, ...ids2])].sort((a, b) => a - b);

  return { exclusive1, exclusive2, shared, allNeededIds };
}
