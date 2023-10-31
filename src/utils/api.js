export const DND_API_URL = 'https://api.open5e.com/spells/';
export const JIKAN_API_URL = 'https://api.jikan.moe/v4/anime/';


export const fetchSpellData = async () => {
  try {
    const response = await fetch(DND_API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching spell data:', error);
    return null;
  }
};

export async function createSpellNameToNumberMap() {
    try {
      const response = await fetchSpellData();
      if (response && response.results) {
        const spellNameToNumber = {};
        response.results.forEach((spell, index) => {
          spellNameToNumber[spell.name] = index + 1;
        });
        return spellNameToNumber;
      }
    } catch (error) {
      console.error('Error creating spellNameToNumber map:', error);
    }
    return {};
  }

  export async function fetchAllSpells() {
    try {
      const response = await fetch(DND_API_URL);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all spells:', error);
      throw error;
    }
  } 