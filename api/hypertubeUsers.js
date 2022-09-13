const bcrypt = require("bcrypt");
const User = require("./schemas/user");




const hypertubeUsers = [
    {
        "lastname": "Morin",
        "firstname": "Alban",
        "username": "greenpeacock984",
        "email": "alban.morin@example.com"
    },
    {
        "lastname": "Lefevre",
        "firstname": "Melvin",
        "username": "sadbear908",
        "email": "melvin.lefevre@example.com"

    },
    {
        "lastname": "Lefebvre",
        "firstname": "Victor",
        "username": "beautifulleopard126",
        "email": "victor.lefebvre@example.com"
    },
    {
        "lastname": "Leclercq",
        "firstname": "Léon",
        "username": "crazypeacock606",
        "email": "leon.leclercq@example.com"
    },
    {
        "lastname": "Lemoine",
        "firstname": "Johan",
        "username": "tinylion927",
        "email": "johan.lemoine@example.com"
    },
    {
        "lastname": "Garcia",
        "firstname": "Léon",
        "username": "yellowpeacock604",
        "email": "leon.garcia@example.com"
    },
    {
        "lastname": "Leclercq",
        "firstname": "Alex",
        "username": "bluepeacock658",
        "email": "alex.leclercq@example.com"
    },
    {
        "lastname": "Robert",
        "firstname": "Mathys",
        "username": "happyswan126",
        "email": "mathys.robert@example.com"
    },
    {
        "lastname": "Garnier",
        "firstname": "Aubin",
        "username": "tinymouse721",
        "email": "aubin.garnier@example.com"
    },
    {
        "lastname": "Aubert",
        "firstname": "Rayan",
        "username": "organicmeercat340",
        "email": "rayan.aubert@example.com"
    },
    {
        "lastname": "Lemoine",
        "firstname": "Pablo",
        "username": "angrylion965",
        "email": "pablo.lemoine@example.com"
    },
    {
        "lastname": "Pierre",
        "firstname": "Rémy",
        "username": "heavyswan210",
        "email": "remy.pierre@example.com"
    },
    {
        "lastname": "Rey",
        "firstname": "Lenny",
        "username": "crazycat505",
        "email": "lenny.rey@example.com"
    },
    {
        "lastname": "Charles",
        "firstname": "Baptiste",
        "username": "redtiger973",
        "email": "baptiste.charles@example.com"
    },
    {
        "lastname": "Morin",
        "firstname": "Gaëtan",
        "username": "sadrabbit161",
        "email": "gaetan.morin@example.com"
    },
    {
        "lastname": "Lambert",
        "firstname": "Luca",
        "username": "tinycat321",
        "email": "luca.lambert@example.com"
    },
    {
        "lastname": "Chevalier",
        "firstname": "Eliott",
        "username": "bigtiger935",
        "email": "eliott.chevalier@example.com"
    },
    {
        "lastname": "Mathieu",
        "firstname": "Malo",
        "username": "tinysnake106",
        "email": "malo.mathieu@example.com"
    },
    {
        "lastname": "Andre",
        "firstname": "Gaëtan",
        "username": "organicpanda632",
        "email": "gaetan.andre@example.com"
    },
    {
        "lastname": "Gauthier",
        "firstname": "Maxime",
        "username": "bigbear217",
        "email": "maxime.gauthier@example.com"
    },
    {
        "lastname": "Lucas",
        "firstname": "Gaspard",
        "username": "sadpeacock321",
        "email": "gaspard.lucas@example.com"
    },
    {
        "lastname": "Robert",
        "firstname": "Luis",
        "username": "goldensnake228",
        "email": "luis.robert@example.com"
    },
    {
        "lastname": "Da Silva",
        "firstname": "Diego",
        "username": "organicelephant119",
        "email": "diego.dasilva@example.com"
    },
    {
        "lastname": "Rolland",
        "firstname": "Lukas",
        "username": "whitesnake778",
        "email": "lukas.rolland@example.com"
    },
    {
        "lastname": "Dufour",
        "firstname": "Axel",
        "username": "brownleopard425",
        "email": "axel.dufour@example.com"
    },
    {
        "lastname": "Legrand",
        "firstname": "Louison",
        "username": "silverwolf451",
        "email": "louison.legrand@example.com"
    },
    {
        "lastname": "Chevalier",
        "firstname": "Sasha",
        "username": "beautifulwolf563",
        "email": "sasha.chevalier@example.com"
    },
    {
        "lastname": "Henry",
        "firstname": "Florent",
        "username": "orangezebra636",
        "email": "florent.henry@example.com"
    },
    {
        "lastname": "Dumas",
        "firstname": "Antoine",
        "username": "blacktiger434",
        "email": "antoine.dumas@example.com"
    },
    {
        "lastname": "Lambert",
        "firstname": "Matéo",
        "username": "tinyostrich585",
        "email": "mateo.lambert@example.com"
    },
    {
        "lastname": "Chevalier",
        "firstname": "Gabin",
        "username": "blacktiger125",
        "email": "gabin.chevalier@example.com"
    },
    {
        "lastname": "Gaillard",
        "firstname": "Basile",
        "username": "redmouse986",
        "email": "basile.gaillard@example.com"
    },
    {
        "lastname": "Colin",
        "firstname": "Loris",
        "username": "heavybear239",
        "email": "loris.colin@example.com"
    },
    {
        "lastname": "Gauthier",
        "firstname": "Axel",
        "username": "sadmeercat741",
        "email": "axel.gauthier@example.com"
    },
    {
        "lastname": "Vidal",
        "firstname": "Matéo",
        "username": "sadgorilla665",
        "email": "mateo.vidal@example.com"
    },
    {
        "lastname": "Meyer",
        "firstname": "Julian",
        "username": "redbear427",
        "email": "julian.meyer@example.com"
    },
    {
        "lastname": "Nguyen",
        "firstname": "Aloïs",
        "username": "purpleswan967",
        "email": "alois.nguyen@example.com"
    },
    {
        "lastname": "Vidal",
        "firstname": "Auguste",
        "username": "whiteladybug489",
        "email": "auguste.vidal@example.com"
    },
    {
        "lastname": "David",
        "firstname": "Gaëtan",
        "username": "heavypanda148",
        "email": "gaetan.david@example.com"
    },
    {
        "lastname": "Henry",
        "firstname": "Edouard",
        "username": "brownlion197",
        "email": "edouard.henry@example.com"
    },
    {
        "lastname": "Roux",
        "firstname": "Tiago",
        "username": "orangelion322",
        "email": "tiago.roux@example.com"
    },
    {
        "lastname": "Robert",
        "firstname": "Edouard",
        "username": "smallswan284",
        "email": "edouard.robert@example.com"
    },
    {
        "lastname": "Marchand",
        "firstname": "Isaac",
        "username": "beautifultiger675",
        "email": "isaac.marchand@example.com"
    },
    {
        "lastname": "Denis",
        "firstname": "Lukas",
        "username": "biggorilla316",
        "email": "lukas.denis@example.com"
    },
    {
        "lastname": "Fabre",
        "firstname": "Kylian",
        "username": "redkoala184",
        "email": "kylian.fabre@example.com"
    },
    {
        "lastname": "Pierre",
        "firstname": "Bastien",
        "username": "lazygorilla395",
        "email": "bastien.pierre@example.com"
    },
    {
        "lastname": "Gaillard",
        "firstname": "Erwan",
        "username": "bluetiger434",
        "email": "erwan.gaillard@example.com"
    },
    {
        "lastname": "Fleury",
        "firstname": "Enzo",
        "username": "whitefrog571",
        "email": "enzo.fleury@example.com"
    },
    {
        "lastname": "Lacroix",
        "firstname": "Gaspard",
        "username": "lazyduck794",
        "email": "gaspard.lacroix@example.com"
    },
    {
        "lastname": "Lopez",
        "firstname": "Axel",
        "username": "sadelephant982",
        "email": "axel.lopez@example.com"
    },
    {
        "lastname": "Durand",
        "firstname": "Abel",
        "username": "silvercat945",
        "email": "abel.durand@example.com"
    },
    {
        "lastname": "Vincent",
        "firstname": "Logan",
        "username": "brownmeercat809",
        "email": "logan.vincent@example.com"
    },
    {
        "lastname": "Roussel",
        "firstname": "Luca",
        "username": "greengoose825",
        "email": "luca.roussel@example.com"
    },
    {
        "lastname": "Roussel",
        "firstname": "Jules",
        "username": "ticklishmouse476",
        "email": "jules.roussel@example.com"
    },
    {
        "lastname": "Gautier",
        "firstname": "Ilan",
        "username": "blackpeacock623",
        "email": "ilan.gautier@example.com"
    },
    {
        "lastname": "Adam",
        "firstname": "Milo",
        "username": "whitemouse125",
        "email": "milo.adam@example.com"
    },
    {
        "lastname": "Vidal",
        "firstname": "Rachel",
        "username": "smallrabbit494",
        "email": "rachel.vidal@example.com"
    },
    {
        "lastname": "Renaud",
        "firstname": "Chloé",
        "username": "brownelephant923",
        "email": "chloe.renaud@example.com"
    },
    {
        "lastname": "Dupont",
        "firstname": "Emmie",
        "username": "beautifulzebra939",
        "email": "emmie.dupont@example.com"
    },
    {
        "lastname": "Garcia",
        "firstname": "Naomi",
        "username": "heavybird911",
        "email": "naomi.garcia@example.com"
    },
    {
        "lastname": "Renard",
        "firstname": "Stella",
        "username": "lazyfrog577",
        "email": "stella.renard@example.com"
    },
    {
        "lastname": "Renaud",
        "firstname": "Maëlyne",
        "username": "silvermeercat940",
        "email": "maelyne.renaud@example.com"
    },
    {
        "lastname": "Laurent",
        "firstname": "Clémentine",
        "username": "greenostrich223",
        "email": "clementine.laurent@example.com"
    },
    {
        "lastname": "Deschamps",
        "firstname": "Flavie",
        "username": "redfish957",
        "email": "flavie.deschamps@example.com"
    },
    {
        "lastname": "Andre",
        "firstname": "Lila",
        "username": "organickoala649",
        "email": "lila.andre@example.com"
    },
    {
        "lastname": "Fournier",
        "firstname": "Héloïse",
        "username": "happylion874",
        "email": "heloise.fournier@example.com"
    },
    {
        "lastname": "Leclercq",
        "firstname": "Claire",
        "username": "redcat719",
        "email": "claire.leclercq@example.com"
    },
    {
        "lastname": "Morin",
        "firstname": "Charline",
        "username": "whiteladybug141",
        "email": "charline.morin@example.com"
    },
    {
        "lastname": "Martinez",
        "firstname": "Amandine",
        "username": "bigrabbit679",
        "email": "amandine.martinez@example.com"
    },
    {
        "lastname": "Simon",
        "firstname": "Louanne",
        "username": "crazycat135",
        "email": "louanne.simon@example.com"
    },
    {
        "lastname": "Garcia",
        "firstname": "Sarah",
        "username": "sadladybug531",
        "email": "sarah.garcia@example.com"
    },
    {
        "lastname": "Leclercq",
        "firstname": "Albane",
        "username": "crazymeercat745",
        "email": "albane.leclercq@example.com"
    },
    {
        "lastname": "Michel",
        "firstname": "Chiara",
        "username": "goldenzebra605",
        "email": "chiara.michel@example.com"
    },
    {
        "lastname": "Riviere",
        "firstname": "Maëlle",
        "username": "bluepanda204",
        "email": "maelle.riviere@example.com"
    },
    {
        "lastname": "Joly",
        "firstname": "Sandra",
        "username": "yellowkoala519",
        "email": "sandra.joly@example.com"
    },
    {
        "lastname": "Lefebvre",
        "firstname": "Elise",
        "username": "yellowrabbit531",
        "email": "elise.lefebvre@example.com"
    },
    {
        "lastname": "Leclerc",
        "firstname": "Gabrielle",
        "username": "redpeacock497",
        "email": "gabrielle.leclerc@example.com"
    },
    {
        "lastname": "Lemaire",
        "firstname": "Rose",
        "username": "organicgorilla594",
        "email": "rose.lemaire@example.com"
    },
    {
        "lastname": "Girard",
        "firstname": "Maëlia",
        "username": "smalllion852",
        "email": "maelia.girard@example.com"
    },
    {
        "lastname": "Boyer",
        "firstname": "Aurore",
        "username": "tinygorilla996",
        "email": "aurore.boyer@example.com"
    },
    {
        "lastname": "Faure",
        "firstname": "Laura",
        "username": "beautifulfish273",
        "email": "laura.faure@example.com"
    },
    {
        "lastname": "Hubert",
        "firstname": "Ambre",
        "username": "organicduck769",
        "email": "ambre.hubert@example.com"
    },
    {
        "lastname": "Simon",
        "firstname": "Lison",
        "username": "blackdog949",
        "email": "lison.simon@example.com"
    },
    {
        "lastname": "Leclerc",
        "firstname": "Juliette",
        "username": "heavyostrich765",
        "email": "juliette.leclerc@example.com"
    },
    {
        "lastname": "Joly",
        "firstname": "Andréa",
        "username": "orangeostrich389",
        "email": "andrea.joly@example.com"
    },
    {
        "lastname": "Dubois",
        "firstname": "Tessa",
        "username": "brownfrog404",
        "email": "tessa.dubois@example.com"
    },
    {
        "lastname": "Brunet",
        "firstname": "Olivia",
        "username": "orangebear440",
        "email": "olivia.brunet@example.com"
    },
    {
        "lastname": "Leclerc",
        "firstname": "Maëline",
        "username": "angrylion716",
        "email": "maeline.leclerc@example.com"
    },
    {
        "lastname": "Meunier",
        "firstname": "Lily",
        "username": "silverdog638",
        "email": "lily.meunier@example.com"
    },
    {
        "lastname": "Rodriguez",
        "firstname": "Romane",
        "username": "organicduck726",
        "email": "romane.rodriguez@example.com"
    },
    {
        "lastname": "Laurent",
        "firstname": "Mia",
        "username": "beautifulbear344",
        "email": "mia.laurent@example.com"
    },
    {
        "lastname": "Joly",
        "firstname": "Loane",
        "username": "brownmouse783",
        "email": "loane.joly@example.com"
    },
    {
        "lastname": "Aubert",
        "firstname": "Célia",
        "username": "blackzebra454",
        "email": "celia.aubert@example.com"
    },
    {
        "lastname": "Faure",
        "firstname": "Lou",
        "username": "redfrog188",
        "email": "lou.faure@example.com"
    },
    {
        "lastname": "Deschamps",
        "firstname": "Anna",
        "username": "silvercat791",
        "email": "anna.deschamps@example.com"
    },
    {
        "lastname": "Jean",
        "firstname": "Rose",
        "username": "yellowcat580",
        "email": "rose.jean@example.com"
    },
    {
        "lastname": "Lecomte",
        "firstname": "Lily",
        "username": "bigcat700",
        "email": "lily.lecomte@example.com"
    },
    {
        "lastname": "Mercier",
        "firstname": "Tessa",
        "username": "browntiger321",
        "email": "tessa.mercier@example.com"
    },
    {
        "lastname": "Bonnet",
        "firstname": "Héloïse",
        "username": "tinyduck920",
        "email": "heloise.bonnet@example.com"
    },
    {
        "lastname": "Hubert",
        "firstname": "Eline",
        "username": "biggoose388",
        "email": "eline.hubert@example.com"
    },
    {
        "lastname": "Berger",
        "firstname": "Kiara",
        "username": "orangebird938",
        "email": "kiara.berger@example.com"
    },
    {
        "lastname": "Brun",
        "firstname": "Mélina",
        "username": "sadtiger674",
        "email": "melina.brun@example.com"
    },
    {
        "lastname": "Laurent",
        "firstname": "Faustine",
        "username": "greenpeacock607",
        "email": "faustine.laurent@example.com"
    },
    {
        "lastname": "Noel",
        "firstname": "Lena",
        "username": "purplefish860",
        "email": "lena.noel@example.com"
    },
    {
        "lastname": "Guerin",
        "firstname": "Ava",
        "username": "beautifulladybug776",
        "email": "ava.guerin@example.com"
    },
    {
        "lastname": "Joly",
        "firstname": "Eléa",
        "username": "goldenbutterfly376",
        "email": "elea.joly@example.com"
    },
    {
        "lastname": "Moulin",
        "firstname": "Emma",
        "username": "orangebear606",
        "email": "emma.moulin@example.com"
    },
    {
        "lastname": "Garcia",
        "firstname": "Flavie",
        "username": "crazyduck233",
        "email": "flavie.garcia@example.com"
    },
    {
        "lastname": "Gonzalez",
        "firstname": "Lyna",
        "username": "angryladybug850",
        "email": "lyna.gonzalez@example.com"
    },
    {
        "lastname": "Arnaud",
        "firstname": "Loane",
        "username": "crazyostrich407",
        "email": "loane.arnaud@example.com"
    },
    {
        "lastname": "Arnaud",
        "firstname": "Clara",
        "username": "heavypanda467",
        "email": "clara.arnaud@example.com"
    },
    {
        "lastname": "Morin",
        "firstname": "Celestine",
        "username": "beautifulpanda748",
        "email": "celestine.morin@example.com"
    },
    {
        "lastname": "Blanc",
        "firstname": "Flavie",
        "username": "greenmeercat638",
        "email": "flavie.blanc@example.com"
    },
    {
        "lastname": "Charles",
        "firstname": "Alyssia",
        "username": "greendog645",
        "email": "alyssia.charles@example.com"
    },
    {
        "lastname": "Aubert",
        "firstname": "Eline",
        "username": "yellowfish833",
        "email": "eline.aubert@example.com"
    },
    {
        "lastname": "Charles",
        "firstname": "Marilou",
        "username": "orangegoose224",
        "email": "marilou.charles@example.com"
    }
];

const insertUsers = async () => {

    let usersArray = [];

    for(let i = 0; i < hypertubeUsers.length; i++) {

        const password = await bcrypt.hash('Hypertube42.', 10);
        const image = `https://avatars.dicebear.com/api/bottts/${Math.round(Math.random() * 100000000000000)}.svg`;

        const user = new User({
            lastname: hypertubeUsers[i].lastname,
            firstname: hypertubeUsers[i].firstname,
            username: hypertubeUsers[i].username,
            email: hypertubeUsers[i].email,
            image: image,
            password: password
        })

        usersArray.push(user);

    }

    await User.collection.insertMany(usersArray);
    // console.log(usersArray);

}

module.exports = insertUsers;