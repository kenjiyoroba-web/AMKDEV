// Suggestions pour le formulaire de devis/RDV. Volontairement non exhaustif :
// les champs restent en saisie libre (voir components/Combobox.tsx), pour ne
// jamais bloquer un client dont la marque/le modèle/la motorisation serait
// absent de ces listes ou mal orthographié — ces données ne servent qu'à
// pré-remplir des suggestions cohérentes.

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

// Une "génération" borne une ou plusieurs motorisations à une plage d'années,
// pour distinguer par exemple un BMW M2 (F87, 2016-2018, N55) d'un M2 (G87,
// depuis 2023, S58) : même nom de modèle, moteur différent selon l'année.
// yearFrom/yearTo omis = pas de borne de ce côté.
type Generation = {
  yearFrom?: number;
  yearTo?: number;
  motorisations: string[];
};

// Petit raccourci pour les modèles à génération unique connue (pas de
// changement de moteur documenté) : pas de borne d'année, toujours proposé.
function single(...motorisations: string[]): Generation[] {
  return [{ motorisations }];
}

// Motorisations connues par marque/modèle/génération, pour proposer le bon
// bloc moteur (ex. BMW M2 G87 -> S58, M2 F87 -> N55) plutôt qu'une liste
// générique commune à toutes les marques et tous les millésimes. Complété au
// fil des demandes clients les plus fréquentes ; toute combinaison absente
// retombe sur MOTORISATIONS_GENERIQUES.
export const MOTORISATIONS_PAR_MODELE: Record<string, Record<string, Generation[]>> = {
  Audi: {
    A1: single("1.0 TFSI EA211", "1.4 TFSI EA211"),
    A3: [
      {
        yearFrom: 2003,
        yearTo: 2012,
        motorisations: ["1.6 FSI (8P)", "2.0 FSI (8P)", "2.0 TDI PD/EA189 (8P)"],
      },
      {
        yearFrom: 2012,
        yearTo: 2020,
        motorisations: ["1.4 TFSI EA211 (8V)", "2.0 TFSI EA888 gen3 (8V)", "2.0 TDI EA288 (8V)"],
      },
      {
        yearFrom: 2020,
        motorisations: ["1.5 TFSI EA211 evo (8Y)", "2.0 TFSI EA888 evo4 (8Y)", "2.0 TDI EA288 evo (8Y)"],
      },
    ],
    S3: [
      { yearFrom: 2006, yearTo: 2012, motorisations: ["2.0 TFSI EA113 (8P)"] },
      { yearFrom: 2013, yearTo: 2020, motorisations: ["2.0 TFSI EA888 gen3 (8V)"] },
      { yearFrom: 2020, motorisations: ["2.0 TFSI EA888 evo4 (8Y)"] },
    ],
    RS3: [
      { yearFrom: 2011, yearTo: 2012, motorisations: ["2.5 TFSI EA855 pré-evo (8P)"] },
      { yearFrom: 2015, motorisations: ["2.5 TFSI EA855 evo (8V/8Y)"] },
    ],
    A4: [
      { yearFrom: 2004, yearTo: 2008, motorisations: ["2.0 TFSI EA113 (B7)", "2.0 TDI PD (B7)"] },
      {
        yearFrom: 2008,
        yearTo: 2015,
        motorisations: ["2.0 TFSI EA888 (B8)", "2.0 TDI EA188/EA189 (B8)", "3.0 TDI EA897 (B8)"],
      },
      {
        yearFrom: 2015,
        motorisations: ["2.0 TFSI EA888 evo (B9)", "2.0 TDI EA288 (B9)", "3.0 TDI EA897 (B9)"],
      },
    ],
    S4: [
      { yearFrom: 2003, yearTo: 2008, motorisations: ["4.2 V8 atmo (B7)"] },
      { yearFrom: 2009, yearTo: 2016, motorisations: ["3.0 V6 TFSI Compresseur EA837 (B8)"] },
      { yearFrom: 2016, motorisations: ["3.0 V6 TFSI EA839 (B9)"] },
    ],
    RS4: [
      { yearFrom: 2006, yearTo: 2015, motorisations: ["4.2 FSI V8 atmo (B7/B8)"] },
      { yearFrom: 2018, motorisations: ["2.9 V6 Biturbo TFSI EA839 (B9)"] },
    ],
    A5: [
      {
        yearFrom: 2007,
        yearTo: 2016,
        motorisations: ["2.0 TFSI EA888 (B8)", "3.0 TDI EA897 (B8)"],
      },
      {
        yearFrom: 2016,
        motorisations: ["2.0 TFSI EA888 evo (B9)", "3.0 TDI EA897 (B9)"],
      },
    ],
    S5: [
      { yearFrom: 2007, yearTo: 2011, motorisations: ["4.2 V8 atmo (B8)"] },
      { yearFrom: 2011, yearTo: 2016, motorisations: ["3.0 V6 TFSI Compresseur EA837 (B8)"] },
      { yearFrom: 2016, motorisations: ["3.0 V6 TFSI EA839 (B9)"] },
    ],
    RS5: [
      { yearFrom: 2010, yearTo: 2015, motorisations: ["4.2 FSI V8 atmo (B8)"] },
      { yearFrom: 2017, motorisations: ["2.9 V6 Biturbo TFSI EA839 (B9)"] },
    ],
    A6: single("2.0 TFSI EA888", "3.0 TDI EA897"),
    A7: single("3.0 TFSI EA839", "3.0 TDI EA897"),
    RS6: [
      { yearFrom: 2008, yearTo: 2010, motorisations: ["5.0 V10 Biturbo (C6)"] },
      { yearFrom: 2013, yearTo: 2018, motorisations: ["4.0 TFSI V8 Biturbo EA824 (C7)"] },
      { yearFrom: 2020, motorisations: ["4.0 TFSI V8 Biturbo EA825 (C8)"] },
    ],
    RS7: [
      { yearFrom: 2014, yearTo: 2018, motorisations: ["4.0 TFSI V8 Biturbo EA824 (C7)"] },
      { yearFrom: 2021, motorisations: ["4.0 TFSI V8 Biturbo EA825 (C8)"] },
    ],
    A8: single("3.0 TFSI EA839", "4.0 TFSI EA824"),
    Q2: single("1.4 TFSI EA211", "2.0 TFSI EA888"),
    Q3: [
      {
        yearFrom: 2011,
        yearTo: 2018,
        motorisations: ["1.4 TFSI EA211 (8U)", "2.0 TFSI EA888 (8U)", "2.0 TDI EA189/EA288 (8U)"],
      },
      {
        yearFrom: 2018,
        motorisations: ["1.5 TFSI EA211 evo (F3)", "2.0 TFSI EA888 evo (F3)", "2.0 TDI EA288 evo (F3)"],
      },
    ],
    "RS Q3": [
      { yearFrom: 2013, yearTo: 2018, motorisations: ["2.5 TFSI EA855 (8U)"] },
      { yearFrom: 2019, motorisations: ["2.5 TFSI EA855 evo (F3)"] },
    ],
    Q5: [
      {
        yearFrom: 2008,
        yearTo: 2017,
        motorisations: ["2.0 TFSI EA888 (8R)", "3.0 TDI EA897 (8R)"],
      },
      {
        yearFrom: 2017,
        motorisations: ["2.0 TFSI EA888 evo (FY)", "3.0 TDI EA897 (FY)"],
      },
    ],
    Q7: [
      {
        yearFrom: 2005,
        yearTo: 2015,
        motorisations: ["3.6 V6 FSI (4L)", "3.0 TDI EA897 (4L)", "4.2 TDI V8 (4L)"],
      },
      { yearFrom: 2015, motorisations: ["3.0 TFSI EA839 (4M)", "3.0 TDI EA897 (4M)"] },
    ],
    Q8: single("3.0 TFSI EA839", "4.0 TFSI EA824"),
    "RS Q8": single("4.0 TFSI V8 Biturbo EA825"),
    TT: single("2.0 TFSI EA888"),
    TTS: single("2.0 TFSI EA888"),
    "TT RS": [
      { yearFrom: 2009, yearTo: 2014, motorisations: ["2.5 TFSI EA855 pré-evo (8J)"] },
      { yearFrom: 2016, motorisations: ["2.5 TFSI EA855 evo (8S)"] },
    ],
  },
  BMW: {
    "Série 1": single("B37 (118d)", "B38 (118i)", "B48 (128ti)"),
    "Série 2": single("B48", "B58 (M240i)"),
    "Série 3": single("B47", "B48", "B58 (M340i)"),
    "Série 4": single("B48", "B58 (M440i)"),
    "Série 5": single("B47", "B48", "B58 (540i)"),
    "Série 6": single("B58", "N63"),
    "Série 7": single("B58", "N63"),
    "Série 8": single("S63 (M850i)"),
    X1: single("B37", "B38", "B47", "B48"),
    X2: single("B38", "B47", "B48"),
    X3: single("B47", "B48", "B58 (M40i)"),
    X4: single("B47", "B48", "B58 (M40i)"),
    X5: single("B57", "B58", "S63 (X5M)"),
    X6: single("B57", "B58", "S63 (X6M)"),
    X7: single("B57", "B58"),
    M2: [
      { yearFrom: 2016, yearTo: 2018, motorisations: ["N55 (F87)"] },
      { yearFrom: 2023, motorisations: ["S58 (G87)"] },
    ],
    "M2 Compétition": [
      { yearFrom: 2018, yearTo: 2021, motorisations: ["S55 (F87)"] },
    ],
    "M2 CS": [{ yearFrom: 2020, yearTo: 2021, motorisations: ["S55 (F87)"] }],
    M3: [
      { yearFrom: 2007, yearTo: 2013, motorisations: ["S65 (E9x)"] },
      { yearFrom: 2014, yearTo: 2020, motorisations: ["S55 (F80)"] },
      { yearFrom: 2021, motorisations: ["S58 (G80/G81)"] },
    ],
    M4: [
      { yearFrom: 2014, yearTo: 2020, motorisations: ["S55 (F82/F83)"] },
      { yearFrom: 2021, motorisations: ["S58 (G82/G83)"] },
    ],
    M5: [
      { yearFrom: 2005, yearTo: 2010, motorisations: ["S85 (E60/E61)"] },
      { yearFrom: 2011, yearTo: 2016, motorisations: ["S63 (F10)"] },
      { yearFrom: 2017, motorisations: ["S63 (F90)"] },
    ],
    M8: single("S63"),
    Z4: single("B48", "B58 (M40i)"),
  },
  "Mercedes-Benz": {
    "Classe A": single("M270", "M282"),
    "Classe A45 AMG": single("M133", "M139"),
    "Classe B": single("M270", "M282"),
    "Classe C": single("M264", "M274"),
    "Classe C63 AMG": [
      { yearFrom: 2008, yearTo: 2014, motorisations: ["M156 (W204)"] },
      { yearFrom: 2015, motorisations: ["M177 (W205/W206)"] },
    ],
    "Classe E": single("M264", "M256"),
    "Classe E63 AMG": [
      { yearFrom: 2010, yearTo: 2016, motorisations: ["M157 (W212)"] },
      { yearFrom: 2017, motorisations: ["M177 (W213)"] },
    ],
    "Classe S": single("M256", "M177"),
    "Classe G": single("M177", "M256"),
    CLA: single("M270", "M282", "M139 (CLA 45)"),
    CLS: single("M256", "M177"),
    GLA: single("M270", "M282", "M139 (GLA 45)"),
    GLB: single("M270", "M282"),
    GLC: single("M264", "M177 (GLC 63)"),
    GLE: single("M256", "M177 (GLE 63)"),
    GLS: single("M256", "M177"),
    "AMG GT": single("M178"),
  },
  Volkswagen: {
    Polo: single("EA211 1.0 TSI", "EA211 1.6 MPI"),
    "Polo GTI": single("EA888 2.0 TSI"),
    Golf: single("EA211 1.5 TSI", "EA288 2.0 TDI"),
    "Golf GTI": [
      { yearFrom: 2004, yearTo: 2012, motorisations: ["2.0 TFSI EA113 (Mk5/Mk6)"] },
      { yearFrom: 2013, yearTo: 2020, motorisations: ["2.0 TFSI EA888 gen3 (Mk7/7.5)"] },
      { yearFrom: 2020, motorisations: ["2.0 TFSI EA888 evo4 (Mk8)"] },
    ],
    "Golf R": [
      { yearFrom: 2010, yearTo: 2012, motorisations: ["2.0 TFSI EA113 (Mk6)"] },
      { yearFrom: 2014, yearTo: 2020, motorisations: ["2.0 TFSI EA888 gen3 (Mk7/7.5, 300–310ch)"] },
      { yearFrom: 2021, motorisations: ["2.0 TFSI EA888 evo4 (Mk8, 320–333ch)"] },
    ],
    Passat: single("EA888 2.0 TSI", "EA288 2.0 TDI", "EA897 2.0/3.0 V6 TDI"),
    Tiguan: single("EA211 1.4 TSI", "EA888 2.0 TSI", "EA288 2.0 TDI"),
    "T-Roc": single("EA211 1.0/1.5 TSI", "EA888 2.0 TSI (R)"),
    "T-Cross": single("EA211 1.0 TSI"),
    Arteon: single("EA888 2.0 TSI", "EA897 2.0/3.0 V6 TDI"),
    Scirocco: single("EA888 2.0 TSI"),
  },
  SEAT: {
    Ibiza: single("EA211 1.0 TSI"),
    Leon: single("EA211 1.5 TSI", "EA888 2.0 TSI"),
    "Leon Cupra": single("EA888 2.0 TSI (280–300ch)"),
    Arona: single("EA211 1.0 TSI"),
    Ateca: single("EA211 1.5 TSI", "EA888 2.0 TSI"),
    Tarraco: single("EA888 2.0 TSI", "EA288 2.0 TDI"),
  },
  Škoda: {
    Octavia: single("EA211 1.5 TSI", "EA888 2.0 TSI"),
    "Octavia RS": single("EA888 2.0 TSI (245ch)"),
    Superb: single("EA888 2.0 TSI", "EA897 2.0 V6 TDI"),
    Kodiaq: single("EA211 1.4 TSI", "EA888 2.0 TSI"),
    Karoq: single("EA211 1.5 TSI"),
  },
  Cupra: {
    Leon: single("EA211 1.5 TSI", "EA888 2.0 TSI"),
    "Leon Cupra": single("EA888 2.0 TSI (300–333ch)"),
    Formentor: single("EA888 2.0 TSI"),
    Ateca: single("EA888 2.0 TSI"),
  },
  Porsche: {
    "911": [
      { yearFrom: 2004, yearTo: 2011, motorisations: ["M96/M97 flat-6 atmo (997)"] },
      { yearFrom: 2012, yearTo: 2015, motorisations: ["MA1 flat-6 atmo (991.1)"] },
      { yearFrom: 2016, motorisations: ["MA2 flat-6 Turbo (991.2/992)"] },
    ],
    "911 Turbo": [
      { yearFrom: 2006, yearTo: 2012, motorisations: ["3.6/3.8 Mezger Biturbo (997)"] },
      { yearFrom: 2013, motorisations: ["MA2 flat-6 Biturbo (991/992)"] },
    ],
    "911 GT3": single("MA1/4S3 flat-6 atmo"),
    Cayman: single("MA1/MA2 flat-4/flat-6"),
    Boxster: single("MA1/MA2 flat-4/flat-6"),
    Panamera: single("EA839 V6 Biturbo", "V8 Biturbo"),
    Macan: single("EA888 2.0 TFSI", "EA839 V6 Biturbo"),
    Cayenne: single("EA839 V6 Biturbo", "V8 Biturbo"),
  },
  Ford: {
    Fiesta: single("1.0 EcoBoost"),
    Focus: single("1.0/1.5 EcoBoost", "2.0 EcoBlue"),
    "Focus RS": [
      { yearFrom: 2009, yearTo: 2011, motorisations: ["2.5 Duratec 5 cyl. Turbo (Mk2)"] },
      { yearFrom: 2016, yearTo: 2018, motorisations: ["2.3 EcoBoost (Mk3)"] },
    ],
    "Focus ST": single("2.3 EcoBoost"),
    Puma: single("1.0 EcoBoost"),
    Kuga: single("1.5/2.0 EcoBoost", "2.0 EcoBlue"),
    Mustang: single("2.3 EcoBoost", "5.0 Coyote V8"),
  },
  Opel: {
    Corsa: single("1.2 Turbo", "1.4 Turbo"),
    Astra: single("1.4 Turbo", "1.6 CDTI"),
    "Astra OPC": single("1.6 Turbo (280ch)"),
    Insignia: single("1.5/2.0 Turbo", "2.0 CDTI"),
  },
  Fiat: {
    "500 Abarth": single("1.4 T-Jet"),
    "500": single("1.2 8v", "0.9 TwinAir"),
    Panda: single("0.9 TwinAir", "1.2 8v"),
    Tipo: single("1.4 FIRE", "1.6 MultiJet"),
  },
  Abarth: {
    "500": single("1.4 T-Jet (135ch)"),
    "595": single("1.4 T-Jet (145–180ch)"),
    "695": single("1.4 T-Jet (180ch)"),
  },
  "Alfa Romeo": {
    Giulia: single("2.0 Turbo GME", "2.2 JTDM"),
    "Giulia Quadrifoglio": single("2.9 V6 Biturbo F154"),
    Stelvio: single("2.0 Turbo GME", "2.2 JTDM"),
    "Stelvio Quadrifoglio": single("2.9 V6 Biturbo F154"),
  },
  Mini: {
    Cooper: single("B38"),
    "Cooper S": single("B48"),
    JCW: single("B48 (231ch)"),
    Countryman: single("B38", "B48"),
  },
  Nissan: {
    Juke: single("1.0 DIG-T"),
    Qashqai: single("1.3 DIG-T"),
    "GT-R": single("VR38DETT V6 Biturbo"),
    "370Z": single("VQ37VHR V6"),
  },
  Toyota: {
    "GR Yaris": single("G16E-GTS 1.6L Turbo 3 cyl."),
    GR86: single("FA24 2.4L Boxer atmo"),
    Supra: single("B58 (BMW, 3.0L Turbo)"),
    Yaris: single("1.5 Dynamic Force"),
    Corolla: single("2.0 Dynamic Force"),
  },
  Honda: {
    Civic: single("1.0/1.5 VTEC Turbo"),
    "Civic Type R": [
      { yearTo: 2010, motorisations: ["K20A2/K20Z4 2.0 atmo (EP3/FN2)"] },
      { yearFrom: 2015, motorisations: ["K20C1 2.0 Turbo (FK2/FK8/FL5)"] },
    ],
  },
  Hyundai: {
    i20: single("1.0 T-GDI"),
    i30: single("1.4/1.6 T-GDI"),
    "i30 N": single("Theta III 2.0 T-GDI"),
  },
  Kia: {
    Ceed: single("1.4/1.6 T-GDI"),
    Stinger: single("3.3 V6 Twin Turbo (GT)", "2.0 T-GDI"),
  },
  Subaru: {
    Impreza: single("EJ20/FB20"),
    "WRX STI": single("EJ257 2.5 Turbo"),
    BRZ: single("FA24 2.4L Boxer atmo"),
  },
  Renault: {
    Megane: single("1.3 TCe", "1.5 dCi"),
    "Megane RS": single("M5Pt 1.8 Turbo (280ch)"),
    Clio: single("1.0/1.3 TCe"),
  },
  Suzuki: {
    Swift: single("1.2 Dualjet"),
    "Swift Sport": single("K14C 1.4 Boosterjet"),
  },
  Jaguar: {
    "F-Type": single("3.0 V6 Compresseur", "5.0 V8 Compresseur (R)"),
    XE: single("2.0 Ingenium"),
    XF: single("2.0 Ingenium", "3.0 V6"),
  },
  "Land Rover": {
    "Range Rover Sport": single("3.0 SDV6", "5.0 V8 Compresseur (SVR)"),
  },
};

// Utilisé quand la combinaison marque/modèle n'a pas encore de motorisations
// dédiées renseignées ci-dessus.
export const MOTORISATIONS_GENERIQUES = [
  "EA113 1.8T",
  "EA113 2.0 TFSI",
  "EA888 2.0 TFSI",
  "EA839 3.0 TFSI",
  "EA855 2.5 TFSI",
  "1.4 TSI",
  "1.8 TSI",
  "2.0 TDI",
  "3.0 TDI",
  "BMW N20",
  "BMW N55",
  "BMW B58",
  "BMW S55",
  "BMW S58",
  "Mercedes M133",
  "Mercedes M139",
  "Mercedes M177",
  "Mercedes M256",
  "V6 Biturbo",
  "V8 Biturbo",
  "1.2 PureTech",
  "1.6 THP",
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
): string[] {
  const generations = MOTORISATIONS_PAR_MODELE[marque]?.[modele];
  if (!generations) return MOTORISATIONS_GENERIQUES;

  const year = annee ? Number.parseInt(annee, 10) : NaN;
  if (Number.isNaN(year)) {
    return Array.from(
      new Set(generations.flatMap((generation) => generation.motorisations))
    );
  }

  const match = generations.find((generation) =>
    generationMatchesYear(generation, year)
  );
  return match ? match.motorisations : [];
}
