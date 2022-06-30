export async function getFilmsData() {
  try {
    const response = await fetch("https://swapi.dev/api/films");
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getAllFilmsIds() {
  try {
    const allFilmsData = await getFilmsData();

    return allFilmsData.map((filmData) => {
      return {
        params: {
          id: filmData.episode_id.toString(),
        },
      };
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function getFilmData(id) {
  try {
    const response = await fetch("https://swapi.dev/api/films/" + id);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error.message);
  }
}
