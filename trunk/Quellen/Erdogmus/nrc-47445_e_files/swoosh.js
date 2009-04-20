function getSwoosh(lang){  

var totalrecs = 12;
var num = Math.floor(Math.random()*totalrecs);

var img = new Array(totalrecs);
if (lang == 'e'){
    img[0]= '<img src="/images/projects/idsphoto_small.jpg" align="right" alt="Image representing the IDS Project">';
    img[1]= '<img src="/images/projects/facevideo_small.gif" align="right" alt="Image representing the Face in Video Project">';
    img[2]= '<img src="/images/projects/aug_reality_sm.gif" align="right" alt="Image representing the Augmented Reality Project">';
    img[3]= '<img src="/images/projects/bytown_poster_small.jpg" align="right" alt="Image representing the Virtual Environment Lab Project">';
    img[4]= '<img src="/images/projects/cleopatra_small.gif" align="right" alt="Image representing the Cleopatra Project">';
    img[5]= '<img src="/images/projects/cosmos_small.jpg" align="right" alt="Image representing the Advanced User Interfaces Project">';
    img[6]= '<img src="/images/projects/minesim_small.jpg" align="right" alt="Image representing the Advanced User Interfaces Project">';
    img[7]= '<img src="/images/projects/virtual_boutique_small.jpg" align="right" alt="Image representing the Virtual Boutique Project">';
    img[8]= '<img src="/images/projects/virtual_theatre_small.jpg" align="right" alt="Image representing the Virtual Theatre Project">';
    img[9]= '<img src="/images/projects/surface_reconstruction_sm.gif" align="right" alt="Image representing the Surface Reconstruction from Multiple Images Project">';
    img[10]= '<img src="/images/projects/grandrailway_small_e.gif" align="right" alt="Image representing the Virtual Environment Lab Project">';
    img[11]= '<img src="/images/projects/crypt_small.gif" align="right" alt="Image representing the Texture Mapping from 3D Models Project">';
}else{
    img[0]= '<img src="/images/projects/idsphoto_small.jpg" align="right" alt="Image qui représente le projet IDS">';
    img[1]= '<img src="/images/projects/facevideo_small.gif" align="right" alt="Image qui représente le projet visage en vidéo">';
    img[2]= '<img src="/images/projects/aug_reality_sm.gif" align="right" alt="Image qui représente le projet de la réalité amplifiée">';
    img[3]= '<img src="/images/projects/bytown_poster_small.jpg" align="right" alt="Image qui représente le projet du laboratoire d\'environnements virtuels">';
    img[4]= '<img src="/images/projects/cleopatra_small.gif" align="right" alt="Image qui représente le projet Cleopatra">';
    img[5]= '<img src="/images/projects/cosmos_small.jpg" align="right" alt="Image qui représente le projet de la conception et évaluation d\'interfaces utilisateurs évoluées">';
    img[6]= '<img src="/images/projects/minesim_small.jpg" align="right" alt="Image qui représente le projet de la conception et évaluation d\'interfaces utilisateurs évoluées">';
    img[7]= '<img src="/images/projects/virtual_boutique_small.jpg" align="right" alt="Image qui représente le projet de la boutique virtuelle">';
    img[8]= '<img src="/images/projects/virtual_theatre_small.jpg" align="right" alt="Image qui représente le projet du théâtre virtuel">';
    img[9]= '<img src="/images/projects/surface_reconstruction_sm.gif" align="right" alt="Image qui représente le projet de reconstruction de surface à partir d\'images multiples">';
    img[10]= '<img src="/images/projects/grandrailway_small_e.gif" align="right" alt="Image qui représente le projet du laboratoire d\'environnements virtuels">';
    img[11]= '<img src="/images/projects/crypt_small.gif" align="right" alt="Image qui représente le projet mappage de texture des modèles tridimensionnels">';
}    
return img[num];
}