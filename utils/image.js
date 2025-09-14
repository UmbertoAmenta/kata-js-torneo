import { fighterImages, weaponImages } from "../database.js";

// Raccolta immagine combattente da fighterImages
function getImageForFighter(name) {
  return fighterImages[name];
}

// Raccolta immagine arma da weaponImages
function getImageForWeapon(name) {
  return weaponImages[name];
}

export { getImageForFighter, getImageForWeapon };
