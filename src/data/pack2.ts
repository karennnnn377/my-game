/* ============================================================
   EXPANSION PACK 2 — global legends, every continent.
   Same append-only tuple format: [name, year, month, day, fame]
   ============================================================ */

import type { CatId } from "./people";

type Row = [string, number, number, number, number];

export const PACK2: Partial<Record<CatId, Row[]>> = {
  football: [
    ["Achraf Hakimi", 1998, 11, 4, 82], ["Hakim Ziyech", 1993, 3, 19, 76], ["Yassine Bounou", 1991, 4, 5, 72],
    ["Sofyan Amrabat", 1996, 8, 21, 70], ["André Onana", 1996, 4, 2, 74], ["Kalidou Koulibaly", 1991, 6, 20, 72],
    ["Wilfried Zaha", 1992, 11, 10, 70], ["Pierre-Emerick Aubameyang", 1989, 6, 18, 76], ["Nicolas Pépé", 1995, 5, 29, 68],
    ["Julián Álvarez", 2000, 1, 31, 80], ["Lautaro Martínez", 1997, 8, 22, 80], ["Casemiro", 1992, 2, 23, 78],
    ["Éder Militão", 1998, 1, 18, 74], ["Rodrygo", 2001, 1, 9, 78], ["Darwin Núñez", 1999, 6, 24, 76],
    ["Federico Valverde", 1998, 7, 22, 80], ["Wataru Endō", 1993, 2, 9, 66], ["Kaoru Mitoma", 1997, 5, 20, 70],
    ["Sam Kerr", 1993, 9, 10, 72], ["Alexia Putellas", 1994, 2, 4, 72], ["Aitana Bonmatí", 1998, 1, 18, 72],
    ["Wendie Renard", 1990, 7, 20, 64], ["Christine Sinclair", 1983, 6, 12, 64], ["Asisat Oshoala", 1994, 10, 9, 58],
    ["El Hadji Diouf", 1981, 1, 15, 58], ["Jay-Jay Okocha", 1973, 8, 14, 62], ["Roger Milla", 1952, 5, 20, 58],
    ["Didier Deschamps", 1968, 10, 15, 74],
  ],
  actors: [
    ["Antonio Banderas", 1960, 8, 10, 86], ["Javier Bardem", 1969, 3, 1, 82], ["Takeshi Kitano", 1947, 1, 18, 66],
    ["Donnie Yen", 1963, 7, 27, 70], ["Omar Sharif", 1932, 4, 10, 72], ["Mads Mikkelsen", 1965, 11, 22, 78],
    ["Christoph Waltz", 1956, 10, 4, 78], ["Cillian Murphy", 1976, 5, 25, 84], ["Pedro Pascal", 1975, 4, 2, 84],
    ["Oscar Isaac", 1979, 3, 9, 80], ["Tom Holland", 1996, 6, 1, 86], ["Ranveer Singh", 1985, 7, 6, 74],
    ["Ranbir Kapoor", 1982, 9, 28, 72], ["Hrithik Roshan", 1974, 1, 10, 72], ["Akshay Kumar", 1967, 9, 9, 74],
    ["Shahid Kapoor", 1981, 2, 25, 68], ["Tony Leung", 1962, 6, 27, 70], ["Chow Yun-fat", 1955, 5, 18, 68],
    ["Song Kang-ho", 1967, 1, 17, 66], ["Lee Byung-hun", 1970, 7, 12, 64], ["Dev Patel", 1990, 4, 23, 72],
    ["Wagner Moura", 1976, 6, 27, 66], ["Gael García Bernal", 1978, 11, 30, 68], ["Rami Malek", 1981, 5, 12, 78],
  ],
  actresses: [
    ["Halle Berry", 1966, 8, 14, 88], ["Viola Davis", 1965, 8, 11, 82], ["Lupita Nyong'o", 1983, 3, 1, 80],
    ["Saoirse Ronan", 1994, 4, 12, 80], ["Keira Knightley", 1985, 3, 26, 82], ["Eva Green", 1980, 7, 6, 76],
    ["Fan Bingbing", 1981, 9, 16, 72], ["Brie Larson", 1989, 10, 1, 82], ["Anya Taylor-Joy", 1996, 4, 16, 82],
    ["Florence Pugh", 1996, 1, 3, 82], ["Anushka Sharma", 1988, 5, 1, 74], ["Alia Bhatt", 1993, 3, 15, 74],
    ["Katrina Kaif", 1983, 7, 10, 70], ["Marion Cotillard", 1975, 9, 30, 80], ["Léa Seydoux", 1985, 7, 1, 72],
    ["Freida Pinto", 1984, 10, 18, 66], ["Zhang Manyu", 1964, 9, 20, 62],
    ["Michelle Yeoh", 1962, 8, 6, 82], ["Bae Doona", 1979, 10, 11, 56],
  ],
  singers: [
    ["RM (BTS)", 1994, 9, 12, 86], ["Jin (BTS)", 1992, 12, 4, 84], ["Suga (BTS)", 1993, 3, 9, 84],
    ["J-Hope (BTS)", 1994, 2, 18, 84], ["Jimin (BTS)", 1995, 10, 13, 86], ["V (BTS)", 1995, 12, 30, 86],
    ["Jungkook (BTS)", 1997, 9, 1, 88], ["Jisoo (BLACKPINK)", 1995, 1, 3, 82], ["Jennie (BLACKPINK)", 1996, 1, 16, 82],
    ["Rosé (BLACKPINK)", 1997, 2, 11, 82], ["Lisa (BLACKPINK)", 1997, 3, 27, 84], ["IU", 1993, 5, 16, 82],
    ["PSY", 1977, 12, 31, 78], ["Arijit Singh", 1987, 4, 25, 76], ["Shreya Ghoshal", 1984, 3, 12, 70],
    ["Lata Mangeshkar", 1929, 9, 28, 76], ["Asha Bhosle", 1933, 9, 8, 68], ["Kishore Kumar", 1929, 8, 4, 66],
    ["Mohammed Rafi", 1924, 12, 24, 64], ["Abdel Halim Hafez", 1929, 6, 21, 66], ["Warda", 1939, 7, 22, 58],
    ["Nancy Ajram", 1983, 5, 16, 66], ["Amr Diab", 1961, 10, 11, 68], ["Tamer Hosny", 1977, 8, 16, 60],
    ["Cheb Khaled", 1960, 2, 29, 62], ["Stromae", 1985, 3, 12, 74], ["Rosalía", 1992, 9, 25, 80],
    ["Bad Bunny", 1994, 3, 10, 86], ["J Balvin", 1985, 5, 7, 80], ["Maluma", 1994, 1, 28, 78],
    ["Daddy Yankee", 1977, 2, 3, 78], ["Anitta", 1993, 3, 30, 76], ["Enya", 1961, 5, 17, 68],
    ["Miriam Makeba", 1932, 3, 4, 62], ["Cesária Évora", 1941, 8, 27, 54], ["Caetano Veloso", 1942, 8, 7, 60],
  ],
  musicians: [
    ["Björn Ulvaeus", 1945, 4, 25, 68], ["Benny Andersson", 1946, 12, 16, 66], ["Agnetha Fältskog", 1950, 4, 5, 64],
    ["Astor Piazzolla", 1921, 3, 11, 62], ["Ravi Shankar", 1920, 4, 7, 66], ["Fela Kuti", 1938, 10, 15, 64],
    ["Ryuichi Sakamoto", 1952, 1, 17, 68], ["Vangelis", 1943, 3, 29, 64], ["Jean-Michel Jarre", 1948, 8, 24, 62],
    ["Philip Glass", 1937, 1, 31, 60], ["Sergei Rachmaninoff", 1873, 4, 1, 72], ["Igor Stravinsky", 1882, 6, 17, 72],
    ["Giuseppe Verdi", 1813, 10, 10, 72], ["Giacomo Puccini", 1858, 12, 22, 68], ["Richard Wagner", 1813, 5, 22, 70],
    ["Franz Liszt", 1811, 10, 22, 66], ["Antonín Dvořák", 1841, 9, 8, 64], ["Edvard Grieg", 1843, 6, 15, 62],
    ["Jean Sibelius", 1865, 12, 8, 60], ["Gustav Mahler", 1860, 7, 7, 62], ["Antonio Vivaldi", 1678, 3, 4, 72],
    ["Georg Handel", 1685, 2, 23, 72], ["Niccolò Paganini", 1782, 10, 27, 60], ["João Gilberto", 1931, 6, 10, 54],
  ],
  rappers: [
    ["Stormzy", 1993, 7, 26, 70], ["Dave", 1998, 6, 5, 66], ["Central Cee", 1998, 6, 4, 72],
    ["Burna Boy", 1991, 7, 2, 78], ["Wizkid", 1990, 7, 16, 76], ["Davido", 1992, 11, 21, 72],
    ["Rema", 2000, 5, 1, 72], ["Tems", 1995, 6, 11, 68],
  ],
  basketball: [
    ["Victor Wembanyama", 2004, 1, 4, 82], ["Anthony Edwards", 2001, 8, 5, 78], ["Ja Morant", 1999, 8, 10, 76],
    ["Zion Williamson", 2000, 7, 6, 76], ["Trae Young", 1998, 9, 19, 74], ["Damian Lillard", 1990, 7, 15, 78],
    ["Kawhi Leonard", 1991, 6, 29, 78], ["Russell Westbrook", 1988, 11, 12, 78], ["Chris Paul", 1985, 5, 6, 76],
    ["Pau Gasol", 1980, 7, 6, 72], ["Manu Ginóbili", 1977, 7, 28, 70], ["Tony Parker", 1982, 5, 17, 68],
    ["Hakeem Olajuwon", 1963, 1, 21, 74], ["Charles Barkley", 1963, 2, 20, 70], ["John Stockton", 1962, 3, 26, 64],
    ["Isiah Thomas", 1961, 4, 30, 62],
  ],
  tennis: [
    ["Daniil Medvedev", 1996, 2, 11, 80], ["Alexander Zverev", 1997, 4, 20, 80], ["Stefanos Tsitsipas", 1998, 8, 12, 78],
    ["Casper Ruud", 1998, 12, 22, 74], ["Dominic Thiem", 1993, 9, 3, 74], ["Holger Rune", 2003, 4, 29, 72],
    ["Coco Gauff", 2004, 3, 13, 78], ["Aryna Sabalenka", 1998, 5, 5, 78], ["Ons Jabeur", 1994, 8, 28, 72],
    ["Emma Raducanu", 2002, 11, 13, 72],
  ],
  racing: [
    ["Carlos Sainz", 1994, 9, 1, 76], ["George Russell", 1998, 2, 15, 76], ["Oscar Piastri", 2001, 4, 6, 76],
    ["Sergio Pérez", 1990, 1, 26, 78], ["Esteban Ocon", 1996, 9, 17, 68], ["Pierre Gasly", 1996, 2, 7, 68],
    ["Yuki Tsunoda", 2000, 5, 11, 66], ["Alex Albon", 1996, 3, 23, 66], ["Nico Rosberg", 1985, 6, 27, 74],
    ["Jenson Button", 1980, 1, 19, 72], ["Jackie Stewart", 1939, 6, 11, 64], ["Emerson Fittipaldi", 1946, 12, 12, 60],
    ["Mario Andretti", 1940, 2, 28, 60],
  ],
  boxing: [
    ["Deontay Wilder", 1985, 10, 22, 72], ["Vasyl Lomachenko", 1988, 2, 17, 68], ["Oleksandr Usyk", 1987, 1, 17, 74],
    ["Gennady Golovkin", 1982, 4, 8, 68], ["Sugar Ray Leonard", 1956, 5, 17, 70], ["Marvin Hagler", 1954, 5, 23, 64],
    ["Julio César Chávez", 1962, 7, 12, 66], ["Katie Taylor", 1986, 7, 2, 62], ["Claressa Shields", 1995, 3, 17, 58],
  ],
  athletes: [
    ["Rohit Sharma", 1987, 4, 30, 80], ["Babar Azam", 1994, 10, 15, 76], ["Ben Stokes", 1991, 6, 4, 72],
    ["Steve Smith", 1989, 6, 2, 72], ["Jos Buttler", 1990, 9, 8, 68], ["Rashid Khan", 1998, 9, 20, 68],
    ["Shoaib Akhtar", 1975, 8, 13, 64], ["Brian Lara", 1969, 5, 2, 66], ["Jacques Kallis", 1975, 10, 16, 62],
    ["AB de Villiers", 1984, 2, 17, 66], ["Shane Warne", 1969, 9, 13, 66], ["Muttiah Muralitharan", 1972, 4, 17, 58],
    ["Neeraj Chopra", 1997, 12, 24, 64], ["Kip Keino", 1940, 1, 17, 52],
  ],
  scientists: [
    ["Enrico Fermi", 1901, 9, 29, 74], ["Paul Dirac", 1902, 8, 8, 60], ["Lise Meitner", 1878, 11, 7, 64],
    ["Chien-Shiung Wu", 1912, 5, 31, 58], ["C.V. Raman", 1888, 11, 7, 62], ["Vera Rubin", 1928, 7, 23, 58],
    ["Jocelyn Bell Burnell", 1943, 7, 15, 58], ["Katherine Johnson", 1918, 8, 26, 66], ["Tu Youyou", 1930, 12, 30, 58],
    ["Jennifer Doudna", 1964, 2, 19, 62], ["Katalin Karikó", 1955, 1, 17, 60], ["S. Chandrasekhar", 1910, 10, 19, 56],
    ["Hideki Yukawa", 1907, 1, 23, 54], ["Dorothy Hodgkin", 1910, 5, 12, 52], ["Ibn al-Haytham", 965, 7, 1, 58],
    ["Al-Khwarizmi", 780, 1, 1, 60],
  ],
  astronauts: [
    ["Kalpana Chawla", 1962, 3, 17, 66], ["Ilan Ramon", 1954, 6, 20, 56], ["Liu Yang", 1978, 10, 6, 56],
    ["Wang Yaping", 1980, 1, 27, 56], ["Eileen Collins", 1956, 11, 19, 56], ["Mark Kelly", 1964, 2, 21, 60],
  ],
  historical: [
    ["Confucius", -551, 9, 28, 84], ["Sun Tzu", -544, 1, 1, 74], ["Qin Shi Huang", -259, 1, 1, 72],
    ["Wu Zetian", 624, 2, 17, 66], ["Charlemagne", 742, 4, 2, 68], ["Attila the Hun", 406, 1, 1, 62],
    ["Hannibal Barca", -247, 1, 1, 66], ["Ibn Battuta", 1304, 2, 25, 60], ["Zheng He", 1371, 1, 1, 56],
    ["Tokugawa Ieyasu", 1543, 1, 31, 58], ["Oda Nobunaga", 1534, 6, 23, 56], ["Miyamoto Musashi", 1584, 1, 1, 58],
    ["Tutankhamun", -1341, 1, 1, 66], ["Ramesses II", -1303, 1, 1, 64], ["Ashoka the Great", -304, 1, 1, 58],
    ["William the Conqueror", 1028, 1, 1, 60],
  ],
  leaders: [
    ["Lula da Silva", 1945, 10, 27, 78], ["Hugo Chávez", 1954, 7, 28, 70], ["Juan Perón", 1895, 10, 8, 64],
    ["Lee Kuan Yew", 1923, 9, 16, 70], ["Ho Chi Minh", 1890, 5, 19, 70], ["Jawaharlal Nehru", 1889, 11, 14, 70],
    ["Benazir Bhutto", 1953, 6, 21, 66], ["Imran Khan", 1952, 11, 25, 70], ["Mustafa Kemal Atatürk", 1881, 5, 19, 74],
    ["Golda Meir", 1898, 5, 3, 64], ["Haile Selassie", 1892, 7, 23, 66], ["Kwame Nkrumah", 1909, 9, 21, 60],
    ["Julius Nyerere", 1922, 4, 13, 54], ["Yasser Arafat", 1929, 8, 24, 66], ["Kofi Annan", 1938, 4, 8, 68],
  ],
  artists: [
    ["M.C. Escher", 1898, 6, 17, 68], ["Georgia O'Keeffe", 1887, 11, 15, 64], ["Norman Rockwell", 1894, 2, 3, 66],
    ["Roy Lichtenstein", 1923, 10, 27, 62], ["Keith Haring", 1958, 5, 4, 66], ["Jean-Michel Basquiat", 1960, 12, 22, 72],
    ["Ai Weiwei", 1957, 8, 28, 64], ["Takashi Murakami", 1962, 2, 1, 64], ["Diego Rivera", 1886, 12, 8, 66],
    ["Wassily Kandinsky", 1866, 12, 16, 64], ["Caspar David Friedrich", 1774, 9, 5, 58], ["Caravaggio", 1571, 9, 29, 66],
    ["Artemisia Gentileschi", 1593, 7, 8, 58], ["Hiroshige", 1797, 1, 1, 54],
  ],
  writers: [
    ["Rabindranath Tagore", 1861, 5, 7, 74], ["Naguib Mahfouz", 1911, 12, 11, 62], ["Orhan Pamuk", 1952, 6, 7, 66],
    ["Chinua Achebe", 1930, 11, 16, 62], ["Wole Soyinka", 1934, 7, 13, 58], ["Milan Kundera", 1929, 4, 1, 64],
    ["Italo Calvino", 1923, 10, 15, 62], ["Umberto Eco", 1932, 1, 5, 66], ["Isabel Allende", 1942, 8, 2, 66],
    ["Jorge Luis Borges", 1899, 8, 24, 70], ["Pablo Neruda", 1904, 7, 12, 70], ["Toni Morrison", 1931, 2, 18, 68],
    ["Maya Angelou", 1928, 4, 4, 68], ["James Baldwin", 1924, 8, 2, 62], ["Yukio Mishima", 1925, 1, 14, 60],
    ["Mo Yan", 1955, 2, 17, 56], ["Lu Xun", 1881, 9, 25, 60], ["Jin Yong", 1924, 3, 10, 60],
  ],
  entrepreneurs: [
    ["Sara Blakely", 1971, 2, 27, 60], ["Jan Koum", 1976, 2, 24, 58], ["Brian Chesky", 1981, 8, 29, 62],
    ["Peter Thiel", 1967, 10, 11, 66], ["Michael Dell", 1965, 2, 23, 64], ["Akio Morita", 1921, 1, 26, 58],
    ["Soichiro Honda", 1906, 11, 17, 60], ["Ratan Tata", 1937, 12, 28, 64], ["Mukesh Ambani", 1957, 4, 19, 64],
    ["Pony Ma", 1971, 10, 29, 62], ["Lei Jun", 1969, 12, 16, 60], ["Ingvar Kamprad", 1926, 3, 30, 58],
    ["Amancio Ortega", 1936, 3, 28, 58], ["Bernard Arnault", 1949, 3, 5, 66], ["Estée Lauder", 1906, 7, 1, 56],
  ],
  tech: [
    ["Steve Wozniak", 1950, 8, 11, 74], ["Paul Allen", 1953, 1, 21, 62], ["Tim Berners-Lee", 1955, 6, 8, 68],
    ["Vint Cerf", 1943, 6, 23, 56], ["Guido van Rossum", 1956, 1, 31, 58], ["Dennis Ritchie", 1941, 9, 9, 60],
    ["Ken Thompson", 1943, 2, 4, 54], ["Marc Andreessen", 1971, 7, 9, 60], ["Andrew Ng", 1976, 4, 18, 58],
    ["Fei-Fei Li", 1976, 7, 3, 56], ["Margaret Hamilton", 1936, 8, 17, 60], ["Barbara Liskov", 1939, 11, 7, 52],
  ],
  gaming: [
    ["Dream", 1999, 8, 12, 72], ["GeorgeNotFound", 1996, 11, 1, 64], ["Technoblade", 1999, 6, 1, 66],
    ["TommyInnit", 2004, 4, 9, 64], ["Wilbur Soot", 1996, 9, 14, 62], ["Philza", 1988, 3, 1, 58],
    ["John Carmack", 1970, 8, 20, 64], ["John Romero", 1967, 10, 28, 58], ["Todd Howard", 1971, 4, 25, 60],
    ["Sid Meier", 1954, 2, 24, 54], ["Will Wright", 1960, 1, 20, 52], ["Koji Kondo", 1961, 8, 13, 56],
    ["Nobuo Uematsu", 1959, 3, 21, 54],
  ],
  internet: [
    ["iJustine", 1984, 3, 20, 62], ["Lilly Singh", 1988, 9, 26, 64], ["NigaHiga", 1990, 6, 6, 58],
    ["Hasan Piker", 1991, 7, 25, 62], ["Valkyrae", 1992, 1, 8, 62], ["Bretman Rock", 1998, 7, 31, 60],
    ["James Charles", 1999, 5, 23, 64], ["Nikkie Tutorials", 1994, 3, 2, 58], ["Huda Kattan", 1983, 10, 2, 60],
  ],
  tv: [
    ["Anthony Bourdain", 1956, 6, 25, 76], ["Jamie Oliver", 1975, 5, 27, 72], ["Julia Child", 1912, 8, 15, 62],
    ["Martha Stewart", 1941, 8, 3, 64], ["Larry King", 1933, 11, 19, 62], ["Barbara Walters", 1929, 9, 25, 58],
    ["Mr. Rogers", 1928, 3, 20, 68], ["Nigella Lawson", 1960, 1, 6, 56],
  ],
  comedians: [
    ["Kapil Sharma", 1981, 4, 2, 66], ["Aziz Ansari", 1983, 2, 23, 62], ["Mindy Kaling", 1979, 6, 24, 62],
    ["Russell Brand", 1975, 6, 4, 62], ["Jimmy Carr", 1972, 9, 15, 60], ["Bo Burnham", 1990, 8, 21, 66],
    ["John Mulaney", 1982, 7, 26, 64], ["Pete Davidson", 1993, 11, 16, 62], ["Gad Elmaleh", 1971, 4, 19, 56],
    ["Jamel Debbouze", 1975, 6, 18, 56],
  ],
  iran: [
    ["Ali Gholizadeh", 1996, 3, 10, 56], ["Payam Niazmand", 1995, 4, 6, 52],
    ["Majid Hosseini", 1996, 6, 20, 52], ["Shojal Khalilzadeh", 1989, 5, 14, 50],
    ["Shohreh Aghdashloo", 1952, 5, 11, 58], ["Nazanin Boniadi", 1980, 5, 22, 54],
    ["Omid Djalili", 1965, 9, 30, 56], ["Maz Jobrani", 1972, 2, 26, 54],
  ],
  world: [
    ["Shirin Ebadi", 1947, 6, 21, 60], ["Wangari Maathai", 1940, 4, 1, 56], ["Aung San Suu Kyi", 1945, 6, 19, 62],
    ["Chimamanda Adichie", 1977, 9, 15, 58], ["Amal Clooney", 1978, 2, 3, 62], ["Rigoberta Menchú", 1959, 1, 9, 52],
  ],
};

/* drop placeholder rows */
(Object.keys(PACK2) as CatId[]).forEach((c) => {
  PACK2[c] = (PACK2[c] ?? []).filter((r) => r[1] !== 0);
});
