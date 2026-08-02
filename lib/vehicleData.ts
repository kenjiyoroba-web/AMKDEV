// Suggestions pour le formulaire de devis/RDV et pour le configurateur
// véhicule de la page Marques. Volontairement non exhaustif : les champs du
// formulaire de contact restent en saisie libre (voir components/Combobox.tsx),
// pour ne jamais bloquer un client dont la marque/le modèle/la motorisation
// serait absent de ces listes ou mal orthographié.
//
// Les puissances d'origine indiquées ici sont des chiffres constructeur
// publics (fiches techniques), pas des données de reprogrammation : elles ne
// servent qu'à distinguer les motorisations d'un même modèle dans le
// configurateur (ex. Golf 1.5 TSI 130ch vs 2.0 TSI R 320ch).

export const MARQUES_MODELES: Record<string, string[]> = {
  Audi: [
    "A1", "A3", "A4", "A5", "A6", "A7", "A8",
    "Q2", "Q3", "Q5", "Q7", "Q8",
    "TT", "TTS", "TT RS",
    "S3", "S4", "S5",
    "RS3", "RS4", "RS5", "RS6", "RS7", "RS Q3", "RS Q8",
  ],
  BMW: [
    "Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "Série 6", "Série 7", "Série 8",
    "X1", "X2", "X3", "X4", "X5", "X6", "X7",
    "M2", "M2 Compétition", "M2 CS",
    "M3", "M4", "M5", "M8", "Z4",
  ],
  "Mercedes-Benz": [
    "Classe A", "Classe A45 AMG", "Classe B", "Classe C", "Classe C63 AMG",
    "Classe E", "Classe E63 AMG", "Classe S", "Classe G",
    "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "AMG GT",
  ],
  Volkswagen: [
    "Polo", "Polo GTI", "Golf", "Golf GTI", "Golf R", "Passat", "Tiguan",
    "T-Roc", "T-Cross", "Arteon", "Scirocco", "ID.3", "ID.4",
  ],
  SEAT: ["Ibiza", "Leon", "Leon Cupra", "Arona", "Ateca", "Tarraco"],
  Škoda: ["Fabia", "Octavia", "Octavia RS", "Superb", "Kodiaq", "Karoq", "Scala"],
  Porsche: ["911", "911 Turbo", "911 GT3", "Cayman", "Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
  Volvo: ["XC40", "XC60", "XC90", "S60", "S90", "V60", "V90"],
  Renault: ["Clio", "Megane", "Megane RS", "Captur", "Kadjar", "Talisman"],
  Peugeot: ["208", "308", "2008", "3008", "5008", "508"],
  Citroën: ["C3", "C4", "C5", "C5 Aircross", "Berlingo"],
  Ford: ["Fiesta", "Focus", "Focus RS", "Focus ST", "Puma", "Kuga", "Mustang"],
  Opel: ["Corsa", "Astra", "Astra OPC", "Insignia", "Mokka"],
  Fiat: ["500", "500 Abarth", "Panda", "Tipo"],
  "Alfa Romeo": ["Giulia", "Giulia Quadrifoglio", "Stelvio", "Stelvio Quadrifoglio", "Giulietta"],
  Mini: ["Cooper", "Cooper S", "JCW", "Countryman"],
  Nissan: ["Micra", "Juke", "Qashqai", "GT-R", "370Z"],
  Toyota: ["Yaris", "Corolla", "GR Yaris", "GR86", "Supra", "RAV4"],
  Honda: ["Civic", "Civic Type R", "CR-V", "Jazz"],
  Mazda: ["Mazda2", "Mazda3", "MX-5", "CX-5"],
  Hyundai: ["i20", "i30", "i30 N", "Tucson", "Kona"],
  Kia: ["Picanto", "Ceed", "Stinger", "Sportage"],
  Jaguar: ["XE", "XF", "F-Type", "F-Pace"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Evoque", "Discovery", "Defender"],
  Cupra: ["Leon", "Leon Cupra", "Formentor", "Ateca", "Born"],
  Abarth: ["500", "595", "695"],
  "DS Automobiles": ["DS3", "DS4", "DS7"],
  Dacia: ["Sandero", "Duster", "Logan"],
  Suzuki: ["Swift", "Swift Sport", "Vitara"],
  Subaru: ["Impreza", "WRX STI", "BRZ", "Forester"],
  Yamaha: ["MT-07", "MT-09", "MT-10", "R1", "R6", "Tmax", "Ténéré 700"],
  Alpine: ["A110", "A110 S", "A110 R"],
  "Aston Martin": ["Vantage", "DB11", "DBS", "DBX"],
  Bentley: ["Continental GT", "Bentayga", "Flying Spur"],
  Bugatti: ["Chiron", "Veyron"],
  Ferrari: ["488", "F8 Tributo", "Roma", "Portofino", "SF90 Stradale", "296 GTB"],
  Genesis: ["G70", "G80", "G90", "GV70", "GV80"],
  Jeep: ["Renegade", "Compass", "Wrangler", "Grand Cherokee"],
  KTM: ["Duke 390", "Duke 690", "Duke 890", "Super Duke R 1290", "RC 390"],
  Lamborghini: ["Huracán", "Urus", "Aventador", "Revuelto"],
  Lancia: ["Ypsilon"],
  Lexus: ["IS", "RC F", "LC", "NX", "RX"],
  Lotus: ["Elise", "Exige", "Evora", "Emira"],
  Maserati: ["Ghibli", "Levante", "Quattroporte", "MC20"],
  McLaren: ["570S", "600LT", "720S", "GT", "Artura"],
  MG: ["MG3", "MG4", "ZS", "HS"],
  Mitsubishi: ["ASX", "Outlander", "Eclipse Cross"],
  Polestar: ["Polestar 2", "Polestar 3", "Polestar 4"],
  "Rolls-Royce": ["Ghost", "Phantom", "Cullinan"],
  Smart: ["Fortwo", "Forfour"],
  Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
};

// Type de carburant d'une motorisation — sert à regrouper l'affichage du
// configurateur en deux (ou trois, pour les rares véhicules électriques)
// catégories bien distinctes.
export type Carburant = "Essence" | "Diesel" | "Électrique";

export type Motorisation = {
  nom: string;
  carburant: Carburant;
  // Puissance d'origine constructeur, en ch. Omise quand on n'a pas de
  // chiffre fiable pour cette motorisation précise plutôt que d'inventer une
  // valeur.
  chOrigine?: number;
};

// Une "génération" borne une ou plusieurs motorisations à une plage d'années,
// pour distinguer par exemple un BMW M2 (F87, 2016-2018, N55) d'un M2 (G87,
// depuis 2023, S58) : même nom de modèle, moteur différent selon l'année.
// yearFrom/yearTo omis = pas de borne de ce côté.
type Generation = {
  yearFrom?: number;
  yearTo?: number;
  motorisations: Motorisation[];
};

function e(nom: string, chOrigine?: number): Motorisation {
  return { nom, carburant: "Essence", chOrigine };
}
function d(nom: string, chOrigine?: number): Motorisation {
  return { nom, carburant: "Diesel", chOrigine };
}
function elec(nom: string, chOrigine?: number): Motorisation {
  return { nom, carburant: "Électrique", chOrigine };
}

// Petit raccourci pour les modèles à génération unique connue (pas de
// changement de moteur documenté) : pas de borne d'année, toujours proposé.
function single(...motorisations: Motorisation[]): Generation[] {
  return [{ motorisations }];
}

// Motorisations connues par marque/modèle/génération, pour proposer le bon
// bloc moteur (ex. BMW M2 G87 -> S58, M2 F87 -> N55) plutôt qu'une liste
// générique commune à toutes les marques et tous les millésimes. Complété au
// fil des demandes clients les plus fréquentes ; toute combinaison absente
// retombe sur MOTORISATIONS_GENERIQUES.
export const MOTORISATIONS_PAR_MODELE: Record<string, Record<string, Generation[]>> = {
  Audi: {
    A1: single(e("1.0 TFSI EA211", 95), e("1.4 TFSI EA211", 125)),
    A3: [
      {
        yearFrom: 2003,
        yearTo: 2012,
        motorisations: [e("1.6 FSI (8P)", 115), e("2.0 FSI (8P)", 150), d("2.0 TDI PD/EA189 (8P)", 140)],
      },
      {
        yearFrom: 2012,
        yearTo: 2020,
        motorisations: [e("1.4 TFSI EA211 (8V)", 125), e("2.0 TFSI EA888 gen3 (8V)", 190), d("2.0 TDI EA288 (8V)", 150)],
      },
      {
        yearFrom: 2020,
        motorisations: [e("1.5 TFSI EA211 evo (8Y)", 150), e("2.0 TFSI EA888 evo4 (8Y)", 190), d("2.0 TDI EA288 evo (8Y)", 150)],
      },
    ],
    S3: [
      { yearFrom: 2006, yearTo: 2012, motorisations: [e("2.0 TFSI EA113 (8P)", 265)] },
      { yearFrom: 2013, yearTo: 2020, motorisations: [e("2.0 TFSI EA888 gen3 (8V)", 310)] },
      { yearFrom: 2020, motorisations: [e("2.0 TFSI EA888 evo4 (8Y)", 310)] },
    ],
    RS3: [
      { yearFrom: 2011, yearTo: 2012, motorisations: [e("2.5 TFSI EA855 pré-evo (8P)", 340)] },
      { yearFrom: 2015, motorisations: [e("2.5 TFSI EA855 evo (8V/8Y)", 400)] },
    ],
    A4: [
      { yearFrom: 2004, yearTo: 2008, motorisations: [e("2.0 TFSI EA113 (B7)", 200), d("2.0 TDI PD (B7)", 140)] },
      {
        yearFrom: 2008,
        yearTo: 2015,
        motorisations: [e("2.0 TFSI EA888 (B8)", 211), d("2.0 TDI EA188/EA189 (B8)", 143), d("3.0 TDI EA897 (B8)", 245)],
      },
      {
        yearFrom: 2015,
        motorisations: [e("2.0 TFSI EA888 evo (B9)", 190), d("2.0 TDI EA288 (B9)", 150), d("3.0 TDI EA897 (B9)", 272)],
      },
    ],
    S4: [
      { yearFrom: 2003, yearTo: 2008, motorisations: [e("4.2 V8 atmo (B7)", 344)] },
      { yearFrom: 2009, yearTo: 2016, motorisations: [e("3.0 V6 TFSI Compresseur EA837 (B8)", 333)] },
      { yearFrom: 2016, motorisations: [e("3.0 V6 TFSI EA839 (B9)", 354)] },
    ],
    RS4: [
      { yearFrom: 2006, yearTo: 2015, motorisations: [e("4.2 FSI V8 atmo (B7/B8)", 450)] },
      { yearFrom: 2018, motorisations: [e("2.9 V6 Biturbo TFSI EA839 (B9)", 450)] },
    ],
    A5: [
      { yearFrom: 2007, yearTo: 2016, motorisations: [e("2.0 TFSI EA888 (B8)", 211), d("3.0 TDI EA897 (B8)", 245)] },
      { yearFrom: 2016, motorisations: [e("2.0 TFSI EA888 evo (B9)", 252), d("3.0 TDI EA897 (B9)", 286)] },
    ],
    S5: [
      { yearFrom: 2007, yearTo: 2011, motorisations: [e("4.2 V8 atmo (B8)", 354)] },
      { yearFrom: 2011, yearTo: 2016, motorisations: [e("3.0 V6 TFSI Compresseur EA837 (B8)", 333)] },
      { yearFrom: 2016, motorisations: [e("3.0 V6 TFSI EA839 (B9)", 354)] },
    ],
    RS5: [
      { yearFrom: 2010, yearTo: 2015, motorisations: [e("4.2 FSI V8 atmo (B8)", 450)] },
      { yearFrom: 2017, motorisations: [e("2.9 V6 Biturbo TFSI EA839 (B9)", 450)] },
    ],
    A6: single(e("2.0 TFSI EA888", 245), d("3.0 TDI EA897", 231)),
    A7: single(e("3.0 TFSI EA839", 340), d("3.0 TDI EA897", 286)),
    RS6: [
      { yearFrom: 2008, yearTo: 2010, motorisations: [e("5.0 V10 Biturbo (C6)", 580)] },
      { yearFrom: 2013, yearTo: 2018, motorisations: [e("4.0 TFSI V8 Biturbo EA824 (C7)", 560)] },
      { yearFrom: 2020, motorisations: [e("4.0 TFSI V8 Biturbo EA825 (C8)", 600)] },
    ],
    RS7: [
      { yearFrom: 2014, yearTo: 2018, motorisations: [e("4.0 TFSI V8 Biturbo EA824 (C7)", 560)] },
      { yearFrom: 2021, motorisations: [e("4.0 TFSI V8 Biturbo EA825 (C8)", 600)] },
    ],
    A8: single(e("3.0 TFSI EA839", 340), e("4.0 TFSI EA824", 460)),
    Q2: single(e("1.4 TFSI EA211", 150), e("2.0 TFSI EA888", 190)),
    Q3: [
      {
        yearFrom: 2011,
        yearTo: 2018,
        motorisations: [e("1.4 TFSI EA211 (8U)", 150), e("2.0 TFSI EA888 (8U)", 211), d("2.0 TDI EA189/EA288 (8U)", 150)],
      },
      {
        yearFrom: 2018,
        motorisations: [e("1.5 TFSI EA211 evo (F3)", 150), e("2.0 TFSI EA888 evo (F3)", 190), d("2.0 TDI EA288 evo (F3)", 150)],
      },
    ],
    "RS Q3": [
      { yearFrom: 2013, yearTo: 2018, motorisations: [e("2.5 TFSI EA855 (8U)", 340)] },
      { yearFrom: 2019, motorisations: [e("2.5 TFSI EA855 evo (F3)", 400)] },
    ],
    Q5: [
      { yearFrom: 2008, yearTo: 2017, motorisations: [e("2.0 TFSI EA888 (8R)", 225), d("3.0 TDI EA897 (8R)", 245)] },
      { yearFrom: 2017, motorisations: [e("2.0 TFSI EA888 evo (FY)", 252), d("3.0 TDI EA897 (FY)", 286)] },
    ],
    Q7: [
      {
        yearFrom: 2005,
        yearTo: 2015,
        motorisations: [e("3.6 V6 FSI (4L)", 280), d("3.0 TDI EA897 (4L)", 245), d("4.2 TDI V8 (4L)", 340)],
      },
      { yearFrom: 2015, motorisations: [e("3.0 TFSI EA839 (4M)", 333), d("3.0 TDI EA897 (4M)", 286)] },
    ],
    Q8: single(e("3.0 TFSI EA839", 340), e("4.0 TFSI EA824", 460)),
    "RS Q8": single(e("4.0 TFSI V8 Biturbo EA825", 600)),
    TT: single(e("2.0 TFSI EA888", 230)),
    TTS: single(e("2.0 TFSI EA888", 310)),
    "TT RS": [
      { yearFrom: 2009, yearTo: 2014, motorisations: [e("2.5 TFSI EA855 pré-evo (8J)", 340)] },
      { yearFrom: 2016, motorisations: [e("2.5 TFSI EA855 evo (8S)", 400)] },
    ],
  },
  BMW: {
    "Série 1": single(d("B37 (118d)", 150), e("B38 (118i)", 140), e("B48 (128ti)", 265)),
    "Série 2": single(e("B48 (230i)", 231), e("B58 (M240i)", 374)),
    "Série 3": single(d("B47 (320d)", 190), e("B48 (330i)", 258), e("B58 (M340i)", 374)),
    "Série 4": single(e("B48 (430i)", 258), e("B58 (M440i)", 374)),
    "Série 5": single(d("B47 (520d)", 190), e("B48 (530i)", 252), e("B58 (540i)", 340)),
    "Série 6": single(e("B58 (640i)", 340), e("N63 (650i)", 450)),
    "Série 7": single(e("B58 (740i)", 340), e("N63 (750i)", 530)),
    "Série 8": single(e("S63 (M850i)", 530)),
    X1: single(d("B37 (xDrive18d)", 150), e("B38 (sDrive18i)", 140), d("B47 (xDrive20d)", 190), e("B48 (xDrive25i)", 231)),
    X2: single(e("B38 (sDrive18i)", 140), d("B47 (xDrive20d)", 190), e("B48 (M35i)", 306)),
    X3: single(d("B47 (xDrive20d)", 190), e("B48 (xDrive30i)", 252), e("B58 (X3 M40i)", 360)),
    X4: single(d("B47 (xDrive20d)", 190), e("B48 (xDrive30i)", 252), e("B58 (X4 M40i)", 360)),
    X5: single(d("B57 (xDrive30d)", 265), e("B58 (xDrive40i)", 340), e("S63 (X5 M)", 600)),
    X6: single(d("B57 (xDrive30d)", 265), e("B58 (xDrive40i)", 340), e("S63 (X6 M)", 600)),
    X7: single(d("B57 (xDrive40d)", 340), e("B58 (xDrive40i)", 340)),
    M2: [
      { yearFrom: 2016, yearTo: 2018, motorisations: [e("N55 (F87)", 370)] },
      { yearFrom: 2023, motorisations: [e("S58 (G87)", 460)] },
    ],
    "M2 Compétition": [{ yearFrom: 2018, yearTo: 2021, motorisations: [e("S55 (F87)", 410)] }],
    "M2 CS": [{ yearFrom: 2020, yearTo: 2021, motorisations: [e("S55 (F87)", 450)] }],
    M3: [
      { yearFrom: 2007, yearTo: 2013, motorisations: [e("S65 (E9x)", 420)] },
      { yearFrom: 2014, yearTo: 2020, motorisations: [e("S55 (F80)", 431)] },
      { yearFrom: 2021, motorisations: [e("S58 (G80/G81)", 480)] },
    ],
    M4: [
      { yearFrom: 2014, yearTo: 2020, motorisations: [e("S55 (F82/F83)", 431)] },
      { yearFrom: 2021, motorisations: [e("S58 (G82/G83)", 480)] },
    ],
    M5: [
      { yearFrom: 2005, yearTo: 2010, motorisations: [e("S85 (E60/E61)", 507)] },
      { yearFrom: 2011, yearTo: 2016, motorisations: [e("S63 (F10)", 560)] },
      { yearFrom: 2017, motorisations: [e("S63 (F90)", 600)] },
    ],
    M8: single(e("S63", 625)),
    Z4: single(e("B48 (sDrive20i)", 197), e("B58 (M40i)", 340)),
  },
  "Mercedes-Benz": {
    "Classe A": single(e("M270 (A200)", 163), e("M282 (A250)", 224), d("OM654 (A200d)", 150)),
    "Classe A45 AMG": [
      { yearFrom: 2019, yearTo: 2019, motorisations: [e("M133 (A45)", 381)] },
      { yearFrom: 2020, motorisations: [e("M139 (A45 S)", 421)] },
    ],
    "Classe B": single(e("M270 (B200)", 163), d("OM654 (B200d)", 150)),
    "Classe C": single(e("M264 (C200)", 204), e("M274 (C300)", 258), d("OM654 (C220d)", 194)),
    "Classe C63 AMG": [
      { yearFrom: 2008, yearTo: 2014, motorisations: [e("M156 (W204)", 457)] },
      { yearFrom: 2015, yearTo: 2022, motorisations: [e("M177 (W205)", 476)] },
      { yearFrom: 2023, motorisations: [e("M139l hybride (W206, C63 S E Performance)", 680)] },
    ],
    "Classe E": single(e("M264 (E200)", 197), e("M256 (E450)", 367), d("OM654 (E220d)", 194)),
    "Classe E63 AMG": [
      { yearFrom: 2010, yearTo: 2016, motorisations: [e("M157 (W212)", 585)] },
      { yearFrom: 2017, motorisations: [e("M177 (W213)", 571)] },
    ],
    "Classe S": single(e("M256 (S450)", 367), e("M177 (S63)", 612)),
    "Classe G": single(e("M177 (G63)", 585), d("OM656 (G400d)", 330)),
    CLA: single(e("M270 (CLA200)", 163), e("M282 (CLA250)", 224), e("M139 (CLA45)", 421)),
    CLS: single(e("M256 (CLS450)", 367), d("OM656 (CLS350d)", 286)),
    GLA: single(e("M270 (GLA200)", 163), e("M282 (GLA250)", 224), e("M139 (GLA45)", 421)),
    GLB: single(e("M270 (GLB200)", 163), d("OM654 (GLB200d)", 150)),
    GLC: single(e("M264 (GLC200)", 204), e("M177 (GLC63)", 476), d("OM654 (GLC220d)", 194)),
    GLE: single(e("M256 (GLE450)", 367), e("M177 (GLE63)", 612), d("OM656 (GLE300d)", 245)),
    GLS: single(e("M256 (GLS450)", 367), d("OM656 (GLS400d)", 330)),
    "AMG GT": [
      { yearFrom: 2019, yearTo: 2025, motorisations: [e("M178 (AMG GT S)", 530)] },
    ],
  },
  Volkswagen: {
    Polo: single(e("EA211 1.0 TSI", 95), e("EA211 1.6 MPI", 90)),
    "Polo GTI": single(e("EA888 2.0 TSI", 207)),
    Golf: single(e("EA211 1.5 TSI", 130), d("EA288 2.0 TDI", 115)),
    "Golf GTI": [
      { yearFrom: 2004, yearTo: 2012, motorisations: [e("2.0 TFSI EA113 (Mk5/Mk6)", 211)] },
      { yearFrom: 2013, yearTo: 2020, motorisations: [e("2.0 TFSI EA888 gen3 (Mk7/7.5)", 230)] },
      { yearFrom: 2020, motorisations: [e("2.0 TFSI EA888 evo4 (Mk8)", 245)] },
    ],
    "Golf R": [
      { yearFrom: 2010, yearTo: 2012, motorisations: [e("2.0 TFSI EA113 (Mk6)", 270)] },
      { yearFrom: 2014, yearTo: 2020, motorisations: [e("2.0 TFSI EA888 gen3 (Mk7/7.5)", 300)] },
      { yearFrom: 2021, motorisations: [e("2.0 TFSI EA888 evo4 (Mk8)", 320)] },
    ],
    Passat: single(e("EA888 2.0 TSI", 190), d("EA288 2.0 TDI", 150), d("EA897 2.0/3.0 V6 TDI", 240)),
    Tiguan: single(e("EA211 1.4 TSI", 150), e("EA888 2.0 TSI", 190), d("EA288 2.0 TDI", 150)),
    "T-Roc": single(e("EA211 1.0/1.5 TSI", 150), e("EA888 2.0 TSI (R)", 300)),
    "T-Cross": single(e("EA211 1.0 TSI", 110)),
    Arteon: single(e("EA888 2.0 TSI", 190), d("EA897 2.0/3.0 V6 TDI", 240)),
    Scirocco: single(e("EA888 2.0 TSI", 220)),
    "ID.3": single(elec("Moteur électrique APP310", 204)),
    "ID.4": single(elec("Moteur électrique APP550", 204)),
  },
  SEAT: {
    Ibiza: single(e("EA211 1.0 TSI", 95)),
    Leon: single(e("EA211 1.5 TSI", 130), e("EA888 2.0 TSI", 190)),
    "Leon Cupra": single(e("EA888 2.0 TSI", 300)),
    Arona: single(e("EA211 1.0 TSI", 95)),
    Ateca: single(e("EA211 1.5 TSI", 150), e("EA888 2.0 TSI", 190)),
    Tarraco: single(e("EA888 2.0 TSI", 190), d("EA288 2.0 TDI", 150)),
  },
  Škoda: {
    Fabia: single(e("EA211 1.0 TSI", 95)),
    Octavia: single(e("EA211 1.5 TSI", 150), e("EA888 2.0 TSI", 190)),
    "Octavia RS": single(e("EA888 2.0 TSI", 245)),
    Superb: single(e("EA888 2.0 TSI", 190), d("EA897 2.0 V6 TDI", 240)),
    Kodiaq: single(e("EA211 1.4 TSI", 150), e("EA888 2.0 TSI", 190)),
    Karoq: single(e("EA211 1.5 TSI", 150)),
    Scala: single(e("EA211 1.0 TSI", 115)),
  },
  Cupra: {
    Leon: single(e("EA211 1.5 TSI", 150), e("EA888 2.0 TSI", 190)),
    "Leon Cupra": single(e("EA888 2.0 TSI", 300)),
    Formentor: single(e("EA888 2.0 TSI", 310)),
    Ateca: single(e("EA888 2.0 TSI", 300)),
    Born: single(elec("Moteur électrique APP550", 204)),
  },
  Porsche: {
    "911": [
      { yearFrom: 2004, yearTo: 2011, motorisations: [e("M96/M97 flat-6 atmo (997)", 325)] },
      { yearFrom: 2012, yearTo: 2015, motorisations: [e("MA1 flat-6 atmo (991.1)", 350)] },
      { yearFrom: 2016, motorisations: [e("MA2 flat-6 Turbo (991.2/992)", 385)] },
    ],
    "911 Turbo": [
      { yearFrom: 2006, yearTo: 2012, motorisations: [e("3.6/3.8 Mezger Biturbo (997)", 480)] },
      { yearFrom: 2013, motorisations: [e("MA2 flat-6 Biturbo (991/992)", 540)] },
    ],
    "911 GT3": single(e("MA1/4S3 flat-6 atmo", 500)),
    Cayman: single(e("MA1/MA2 flat-4/flat-6", 300)),
    Boxster: single(e("MA1/MA2 flat-4/flat-6", 300)),
    Panamera: single(e("EA839 V6 Biturbo", 330), e("V8 Biturbo", 550)),
    Macan: single(e("EA888 2.0 TFSI", 245), e("EA839 V6 Biturbo", 354)),
    Cayenne: single(e("EA839 V6 Biturbo", 340), e("V8 Biturbo", 550)),
    Taycan: single(elec("Moteur électrique bi-moteur", 476)),
  },
  Volvo: {
    XC40: single(e("2.0 T4/T5", 190), d("2.0 D3/D4", 150)),
    XC60: single(e("2.0 T5", 250), d("2.0 D4", 190)),
    XC90: single(e("2.0 T6", 310), d("2.0 D5", 235)),
    S60: single(e("2.0 T5", 250), d("2.0 D4", 190)),
    S90: single(e("2.0 T6", 310), d("2.0 D4", 190)),
    V60: single(e("2.0 T5", 250), d("2.0 D4", 190)),
    V90: single(e("2.0 T6", 310), d("2.0 D4", 190)),
  },
  Renault: {
    Clio: single(e("1.0/1.3 TCe", 100)),
    Megane: single(e("1.3 TCe", 140), d("1.5 dCi", 115)),
    "Megane RS": single(e("M5Pt 1.8 Turbo", 280)),
    Captur: single(e("1.3 TCe", 140), d("1.5 dCi", 115)),
    Kadjar: single(e("1.3 TCe", 140), d("1.5 dCi", 115)),
    Talisman: single(e("1.3 TCe", 160), d("1.6 dCi", 160)),
  },
  Peugeot: {
    "208": single(e("1.2 PureTech", 100), d("1.5 BlueHDi", 100)),
    "308": single(e("1.2 PureTech", 130), d("1.5 BlueHDi", 130)),
    "2008": single(e("1.2 PureTech", 130)),
    "3008": single(e("1.2 PureTech", 130), d("2.0 BlueHDi", 177)),
    "5008": single(e("1.2 PureTech", 130), d("2.0 BlueHDi", 177)),
    "508": single(e("1.6 PureTech", 180), d("2.0 BlueHDi", 160)),
  },
  Citroën: {
    C3: single(e("1.2 PureTech", 110)),
    C4: single(e("1.2 PureTech", 130), d("1.5 BlueHDi", 130)),
    C5: single(e("1.6 THP", 165), d("2.0 BlueHDi", 180)),
    "C5 Aircross": single(e("1.2 PureTech", 130), d("2.0 BlueHDi", 180)),
    Berlingo: single(e("1.2 PureTech", 110), d("1.5 BlueHDi", 100)),
  },
  "DS Automobiles": {
    DS3: single(e("1.2 PureTech", 130)),
    DS4: single(e("1.2 PureTech", 130), d("1.5 BlueHDi", 130)),
    DS7: single(e("1.2 PureTech", 130), d("2.0 BlueHDi", 177)),
  },
  Ford: {
    Fiesta: single(e("1.0 EcoBoost", 100)),
    Focus: single(e("1.0/1.5 EcoBoost", 125), d("2.0 EcoBlue", 150)),
    "Focus RS": [
      { yearFrom: 2009, yearTo: 2011, motorisations: [e("2.5 Duratec 5 cyl. Turbo (Mk2)", 305)] },
      { yearFrom: 2016, yearTo: 2018, motorisations: [e("2.3 EcoBoost (Mk3)", 350)] },
    ],
    "Focus ST": single(e("2.3 EcoBoost", 280)),
    Puma: single(e("1.0 EcoBoost", 125)),
    Kuga: single(e("1.5/2.0 EcoBoost", 150), d("2.0 EcoBlue", 150)),
    Mustang: single(e("2.3 EcoBoost", 290), e("5.0 Coyote V8", 450)),
  },
  Opel: {
    Corsa: single(e("1.2 Turbo", 100), e("1.4 Turbo", 150)),
    Astra: single(e("1.4 Turbo", 145), d("1.6 CDTI", 136)),
    "Astra OPC": single(e("1.6 Turbo", 280)),
    Insignia: single(e("1.5/2.0 Turbo", 200), d("2.0 CDTI", 170)),
    Mokka: single(e("1.2 Turbo", 130), d("1.5 CDTI", 110)),
  },
  Fiat: {
    "500 Abarth": single(e("1.4 T-Jet", 145)),
    "500": single(e("1.2 8v", 69), e("0.9 TwinAir", 85)),
    Panda: single(e("0.9 TwinAir", 85), e("1.2 8v", 69)),
    Tipo: single(e("1.4 FIRE", 95), d("1.6 MultiJet", 120)),
  },
  Abarth: {
    "500": single(e("1.4 T-Jet", 135)),
    "595": single(e("1.4 T-Jet", 165)),
    "695": single(e("1.4 T-Jet", 180)),
  },
  "Alfa Romeo": {
    Giulia: single(e("2.0 Turbo GME", 200), d("2.2 JTDM", 190)),
    "Giulia Quadrifoglio": single(e("2.9 V6 Biturbo F154", 510)),
    Stelvio: single(e("2.0 Turbo GME", 200), d("2.2 JTDM", 190)),
    "Stelvio Quadrifoglio": single(e("2.9 V6 Biturbo F154", 510)),
    Giulietta: single(e("1.4 MultiAir", 120), d("2.0 JTDM", 150)),
  },
  Mini: {
    Cooper: single(e("B38", 136)),
    "Cooper S": single(e("B48", 192)),
    JCW: single(e("B48", 231)),
    Countryman: single(e("B38", 136), e("B48", 192)),
  },
  Nissan: {
    Micra: single(e("0.9/1.0 IG-T", 100)),
    Juke: single(e("1.0 DIG-T", 114)),
    Qashqai: single(e("1.3 DIG-T", 140)),
    "GT-R": single(e("VR38DETT V6 Biturbo", 570)),
    "370Z": single(e("VQ37VHR V6", 328)),
  },
  Toyota: {
    Yaris: single(e("1.5 Dynamic Force", 125)),
    Corolla: single(e("2.0 Dynamic Force", 196)),
    "GR Yaris": single(e("G16E-GTS 1.6L Turbo 3 cyl.", 280)),
    GR86: single(e("FA24 2.4L Boxer atmo", 234)),
    Supra: single(e("B58 (BMW, 3.0L Turbo)", 340)),
    RAV4: single(e("2.5 Hybride", 218)),
  },
  Honda: {
    Civic: single(e("1.0/1.5 VTEC Turbo", 182)),
    "Civic Type R": [
      { yearTo: 2010, motorisations: [e("K20A2/K20Z4 2.0 atmo (EP3/FN2)", 201)] },
      { yearFrom: 2015, motorisations: [e("K20C1 2.0 Turbo (FK2/FK8/FL5)", 320)] },
    ],
    "CR-V": single(e("1.5 VTEC Turbo", 193)),
    Jazz: single(e("1.5 Hybride e:HEV", 109)),
  },
  Mazda: {
    Mazda2: single(e("1.5 SkyActiv-G", 90)),
    Mazda3: single(e("2.0 SkyActiv-X", 180)),
    "MX-5": single(e("2.0 SkyActiv-G", 184)),
    "CX-5": single(e("2.5 SkyActiv-G", 194), d("2.2 SkyActiv-D", 184)),
  },
  Hyundai: {
    i20: single(e("1.0 T-GDI", 100)),
    i30: single(e("1.4/1.6 T-GDI", 140)),
    "i30 N": single(e("Theta III 2.0 T-GDI", 280)),
    Tucson: single(e("1.6 T-GDI", 150), d("2.0 CRDi", 185)),
    Kona: single(e("1.0/1.6 T-GDI", 120)),
  },
  Kia: {
    Picanto: single(e("1.0 T-GDI", 100)),
    Ceed: single(e("1.4/1.6 T-GDI", 140)),
    Stinger: single(e("3.3 V6 Twin Turbo (GT)", 370), e("2.0 T-GDI", 255)),
    Sportage: single(e("1.6 T-GDI", 150), d("2.0 CRDi", 185)),
  },
  Jaguar: {
    "F-Type": single(e("3.0 V6 Compresseur", 380), e("5.0 V8 Compresseur (R)", 575)),
    XE: single(e("2.0 Ingenium", 200)),
    XF: single(e("2.0 Ingenium", 250), e("3.0 V6", 380)),
    "F-Pace": single(e("2.0 Ingenium", 250), e("5.0 V8 Compresseur (SVR)", 550)),
  },
  "Land Rover": {
    "Range Rover": single(e("3.0 P400", 400), d("3.0 SDV6", 306)),
    "Range Rover Sport": single(d("3.0 SDV6", 306), e("5.0 V8 Compresseur (SVR)", 575)),
    "Range Rover Evoque": single(e("2.0 P250", 250), d("2.0 D180", 180)),
    Discovery: single(e("3.0 P400", 400), d("3.0 SDV6", 306)),
    Defender: single(e("3.0 P400", 400), d("3.0 D250", 250)),
  },
  Dacia: {
    Sandero: single(e("1.0 TCe", 90)),
    Duster: single(e("1.3 TCe", 150)),
    Logan: single(e("1.0 TCe", 90)),
  },
  Suzuki: {
    Swift: single(e("1.2 Dualjet", 90)),
    "Swift Sport": single(e("K14C 1.4 Boosterjet", 129)),
    Vitara: single(e("1.4 Boosterjet", 129)),
  },
  Subaru: {
    Impreza: single(e("EJ20/FB20", 150)),
    "WRX STI": single(e("EJ257 2.5 Turbo", 300)),
    BRZ: single(e("FA24 2.4L Boxer atmo", 234)),
    Forester: single(e("FB20 2.0 atmo", 150)),
  },
  Yamaha: {
    "MT-07": single(e("689 cm³ bicylindre", 75)),
    "MT-09": single(e("890 cm³ tricylindre", 119)),
    "MT-10": single(e("998 cm³ 4 cylindres", 166)),
    R1: single(e("998 cm³ 4 cylindres", 200)),
    R6: single(e("599 cm³ 4 cylindres", 118)),
    Tmax: single(e("562 cm³ bicylindre", 47)),
    "Ténéré 700": single(e("689 cm³ bicylindre", 73)),
  },
  Alpine: {
    A110: single(e("1.8 Turbo", 252)),
    "A110 S": single(e("1.8 Turbo", 292)),
    "A110 R": single(e("1.8 Turbo", 300)),
  },
  "Aston Martin": {
    Vantage: single(e("4.0 V8 Biturbo", 510)),
    DB11: single(e("4.0 V8 Biturbo", 503), e("5.2 V12 Biturbo", 630)),
    DBS: single(e("5.2 V12 Biturbo", 725)),
    DBX: single(e("4.0 V8 Biturbo", 550)),
  },
  Bentley: {
    "Continental GT": single(e("4.0 V8 Biturbo", 550), e("6.0 W12 Biturbo", 635)),
    Bentayga: single(e("4.0 V8 Biturbo", 550)),
    "Flying Spur": single(e("4.0 V8 Biturbo", 550), e("6.0 W12 Biturbo", 635)),
  },
  Bugatti: {
    Chiron: single(e("8.0 W16 Quad-Turbo", 1500)),
    Veyron: single(e("8.0 W16 Quad-Turbo", 1001)),
  },
  Ferrari: {
    "488": single(e("3.9 V8 Biturbo", 670)),
    "F8 Tributo": single(e("3.9 V8 Biturbo", 720)),
    Roma: single(e("3.9 V8 Biturbo", 620)),
    Portofino: single(e("3.9 V8 Biturbo", 600)),
    "SF90 Stradale": single(e("4.0 V8 Biturbo hybride", 1000)),
    "296 GTB": single(e("3.0 V6 Biturbo hybride", 830)),
  },
  Genesis: {
    G70: single(e("2.0 T-GDI", 245)),
    G80: single(e("2.5 T-GDI", 304)),
    G90: single(e("3.5 T-GDI", 380)),
    GV70: single(e("2.5 T-GDI", 304)),
    GV80: single(e("3.5 T-GDI", 380)),
  },
  Jeep: {
    Renegade: single(e("1.3 T4 GSE", 150)),
    Compass: single(e("1.3 T4 GSE", 150)),
    Wrangler: single(e("2.0 T GME", 272)),
    "Grand Cherokee": single(e("3.6 V6", 286)),
  },
  KTM: {
    "Duke 390": single(e("373 cm³ monocylindre", 44)),
    "Duke 690": single(e("693 cm³ monocylindre", 73)),
    "Duke 890": single(e("889 cm³ bicylindre", 115)),
    "Super Duke R 1290": single(e("1301 cm³ bicylindre en V", 180)),
    "RC 390": single(e("373 cm³ monocylindre", 44)),
  },
  Lamborghini: {
    Huracán: single(e("5.2 V10 atmo", 610)),
    Urus: single(e("4.0 V8 Biturbo", 650)),
    Aventador: single(e("6.5 V12 atmo", 740)),
    Revuelto: single(e("6.5 V12 hybride", 1015)),
  },
  Lancia: {
    Ypsilon: single(e("1.2 8v", 69)),
  },
  Lexus: {
    IS: single(e("2.0 Turbo", 245)),
    "RC F": single(e("5.0 V8 atmo", 477)),
    LC: single(e("5.0 V8 atmo", 477)),
    NX: single(e("2.5 Hybride", 242)),
    RX: single(e("3.5 V6 Hybride", 313)),
  },
  Lotus: {
    Elise: single(e("1.8 atmo", 136)),
    Exige: single(e("3.5 V6 Compresseur", 350)),
    Evora: single(e("3.5 V6", 400)),
    Emira: single(e("2.0 Turbo AMG", 360)),
  },
  Maserati: {
    Ghibli: single(e("3.0 V6 Biturbo", 350)),
    Levante: single(e("3.0 V6 Biturbo", 350)),
    Quattroporte: single(e("3.0 V6 Biturbo", 350)),
    MC20: single(e("3.0 V6 Biturbo Nettuno", 630)),
  },
  McLaren: {
    "570S": single(e("3.8 V8 Biturbo", 570)),
    "600LT": single(e("3.8 V8 Biturbo", 600)),
    "720S": single(e("4.0 V8 Biturbo", 720)),
    GT: single(e("4.0 V8 Biturbo", 620)),
    Artura: single(e("3.0 V6 Biturbo hybride", 680)),
  },
  MG: {
    MG3: single(e("1.5 VTi", 106)),
    MG4: single(elec("Moteur électrique", 170)),
    ZS: single(e("1.0 T-GDI", 111)),
    HS: single(e("1.5 T-GDI", 162)),
  },
  Mitsubishi: {
    ASX: single(e("1.6 MIVEC", 117)),
    Outlander: single(e("2.0 MIVEC", 150)),
    "Eclipse Cross": single(e("1.5 MIVEC Turbo", 163)),
  },
  Polestar: {
    "Polestar 2": single(elec("Bi-moteur", 408)),
    "Polestar 3": single(elec("Bi-moteur", 489)),
    "Polestar 4": single(elec("Bi-moteur", 544)),
  },
  "Rolls-Royce": {
    Ghost: single(e("6.75 V12 Biturbo", 571)),
    Phantom: single(e("6.75 V12 Biturbo", 571)),
    Cullinan: single(e("6.75 V12 Biturbo", 571)),
  },
  Smart: {
    Fortwo: single(e("0.9 Turbo", 90)),
    Forfour: single(e("0.9 Turbo", 90)),
  },
  Tesla: {
    "Model 3": single(elec("Propulsion", 283), elec("Performance", 513)),
    "Model S": single(elec("Dual Motor", 670), elec("Plaid Tri Motor", 1020)),
    "Model X": single(elec("Dual Motor", 670)),
    "Model Y": single(elec("Propulsion", 345)),
  },
};

// Utilisé quand la combinaison marque/modèle n'a pas encore de motorisations
// dédiées renseignées ci-dessus. Pas de puissance d'origine ici : cette liste
// est générique et n'est pas rattachée à un modèle précis.
export const MOTORISATIONS_GENERIQUES: Motorisation[] = [
  e("EA113 1.8T"),
  e("EA113 2.0 TFSI"),
  e("EA888 2.0 TFSI"),
  e("EA839 3.0 TFSI"),
  e("EA855 2.5 TFSI"),
  e("1.4 TSI"),
  e("1.8 TSI"),
  d("2.0 TDI"),
  d("3.0 TDI"),
  e("BMW N20"),
  e("BMW N55"),
  e("BMW B58"),
  e("BMW S55"),
  e("BMW S58"),
  e("Mercedes M133"),
  e("Mercedes M139"),
  e("Mercedes M177"),
  e("Mercedes M256"),
  e("V6 Biturbo"),
  e("V8 Biturbo"),
  e("1.2 PureTech"),
  e("1.6 THP"),
];

function generationMatchesYear(generation: Generation, year: number) {
  if (generation.yearFrom !== undefined && year < generation.yearFrom) {
    return false;
  }
  if (generation.yearTo !== undefined && year > generation.yearTo) {
    return false;
  }
  return true;
}

// Renvoie les motorisations pertinentes pour une marque/modèle/année donnés.
// - Sans année renseignée : l'ensemble des motorisations de toutes les
//   générations connues du modèle, pour rester utile tant que le client n'a
//   pas encore précisé l'année (aucune n'est mise en avant par rapport aux
//   autres).
// - Avec une année qui correspond à une génération connue : uniquement les
//   motorisations de cette génération (ex. BMW M2 + 2023 -> S58 seul).
// - Avec une année qui ne correspond à AUCUNE génération connue (ex. "M2
//   Compétition" + 2025, qui n'a jamais existé) : liste vide plutôt que de
//   remontrer la motorisation d'une autre génération qui ne correspond pas
//   réellement à cette année-là.
// - Marque/modèle totalement inconnus : liste générique de secours.
export function getMotorisations(
  marque: string,
  modele: string,
  annee?: string
): Motorisation[] {
  const generations = MOTORISATIONS_PAR_MODELE[marque]?.[modele];
  if (!generations) return MOTORISATIONS_GENERIQUES;

  const year = annee ? Number.parseInt(annee, 10) : NaN;
  if (Number.isNaN(year)) {
    const seen = new Set<string>();
    const merged: Motorisation[] = [];
    for (const generation of generations) {
      for (const motorisation of generation.motorisations) {
        if (!seen.has(motorisation.nom)) {
          seen.add(motorisation.nom);
          merged.push(motorisation);
        }
      }
    }
    return merged;
  }

  const match = generations.find((generation) => generationMatchesYear(generation, year));
  return match ? match.motorisations : [];
}

// Variante "noms uniquement", pour les champs de saisie libre à suggestions
// (ex. Combobox du formulaire de contact) qui n'ont pas besoin du détail
// carburant/puissance.
export function getMotorisationLabels(
  marque: string,
  modele: string,
  annee?: string
): string[] {
  return getMotorisations(marque, modele, annee).map((motorisation) => motorisation.nom);
}

export type GenerationOption = {
  label: string;
  yearFrom?: number;
  yearTo?: number;
  motorisations: Motorisation[];
};

function formatGenerationLabel(generation: Generation): string {
  if (generation.yearFrom !== undefined && generation.yearTo !== undefined) {
    return `${generation.yearFrom} – ${generation.yearTo}`;
  }
  if (generation.yearFrom !== undefined) {
    return `Depuis ${generation.yearFrom}`;
  }
  if (generation.yearTo !== undefined) {
    return `Jusqu'en ${generation.yearTo}`;
  }
  return "Toutes années";
}

// Génération(s) connues pour une marque/modèle donnés, avec un libellé prêt à
// afficher — sert au configurateur véhicule pour ne proposer une étape
// "Génération" que lorsque le modèle a réellement plusieurs blocs moteur
// distincts selon l'année (ex. BMW M2 F87/G87), et pas pour les modèles à
// motorisation unique où la question n'aurait pas de sens.
export function getGenerations(marque: string, modele: string): GenerationOption[] {
  const generations = MOTORISATIONS_PAR_MODELE[marque]?.[modele];
  if (!generations) return [];
  return generations.map((generation) => ({
    label: formatGenerationLabel(generation),
    yearFrom: generation.yearFrom,
    yearTo: generation.yearTo,
    motorisations: generation.motorisations,
  }));
}
