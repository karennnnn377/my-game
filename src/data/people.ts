/* ============================================================
   GUESS YOUR FAMOUS PEOPLE — master database
   Format per entry: [name, birthYear, birthMonth, birthDay, fame(1-100)]
   Negative year = BC. Architecture is append-only & indexed:
   adding a person = adding one tuple. Scales to 10,000+.
   ============================================================ */

export type CatId =
  | "football" | "actors" | "actresses" | "singers" | "musicians" | "rappers"
  | "basketball" | "tennis" | "racing" | "boxing" | "athletes"
  | "scientists" | "astronauts" | "historical" | "leaders" | "artists"
  | "writers" | "entrepreneurs" | "tech" | "gaming" | "tv" | "comedians"
  | "internet" | "iran" | "world";

export type Row = [string, number, number, number, number];

const RAW: Record<CatId, Row[]> = {
  football: [
    ["Lionel Messi", 1987, 6, 24, 100], ["Cristiano Ronaldo", 1985, 2, 5, 100],
    ["Pelé", 1940, 10, 23, 95], ["Diego Maradona", 1960, 10, 30, 95],
    ["Kylian Mbappé", 1998, 12, 20, 95], ["Neymar Jr", 1992, 2, 5, 92],
    ["David Beckham", 1975, 5, 2, 92], ["Zinédine Zidane", 1972, 6, 23, 93],
    ["Erling Haaland", 2000, 7, 21, 93], ["Ronaldo Nazário", 1976, 9, 18, 92],
    ["Mohamed Salah", 1992, 6, 15, 92], ["Ronaldinho", 1980, 3, 21, 90],
    ["Robert Lewandowski", 1988, 8, 21, 90], ["Zlatan Ibrahimović", 1981, 10, 3, 88],
    ["Luka Modrić", 1985, 9, 9, 88], ["Karim Benzema", 1987, 12, 19, 88],
    ["Kevin De Bruyne", 1991, 6, 28, 88], ["Harry Kane", 1993, 7, 28, 88],
    ["Jude Bellingham", 2003, 6, 29, 88], ["Thierry Henry", 1977, 8, 17, 87],
    ["Kaká", 1982, 4, 22, 87], ["Gianluigi Buffon", 1978, 1, 28, 86],
    ["Virgil van Dijk", 1991, 7, 8, 86], ["Son Heung-min", 1992, 7, 8, 86],
    ["Luis Suárez", 1987, 1, 24, 86], ["Johan Cruyff", 1947, 4, 25, 86],
    ["Wayne Rooney", 1985, 10, 24, 85], ["Sergio Ramos", 1986, 3, 30, 85],
    ["Andrés Iniesta", 1984, 5, 11, 85], ["Manuel Neuer", 1986, 3, 27, 85],
    ["Sergio Agüero", 1988, 6, 2, 85], ["Xavi Hernández", 1980, 1, 25, 84],
    ["Andrea Pirlo", 1979, 5, 19, 84], ["Paolo Maldini", 1968, 6, 26, 84],
    ["Iker Casillas", 1981, 5, 20, 84], ["Eden Hazard", 1991, 1, 7, 84],
    ["Toni Kroos", 1990, 1, 4, 84], ["Ángel Di María", 1988, 2, 14, 84],
    ["Gareth Bale", 1989, 7, 16, 84], ["Paulo Dybala", 1993, 11, 15, 84],
    ["Francesco Totti", 1976, 9, 27, 83], ["Thomas Müller", 1989, 9, 13, 83],
    ["Steven Gerrard", 1980, 5, 30, 83], ["Frank Lampard", 1978, 6, 20, 83],
    ["Sadio Mané", 1992, 4, 10, 83], ["Vinícius Júnior", 2000, 7, 12, 85],
    ["Rodri", 1996, 6, 22, 84], ["Bukayo Saka", 2001, 9, 5, 83],
    ["Phil Foden", 2000, 5, 28, 83], ["Lamine Yamal", 2007, 7, 13, 85],
    ["Pedri", 2002, 11, 25, 82], ["Gavi", 2004, 8, 5, 80],
    ["Victor Osimhen", 1998, 12, 29, 82], ["Jamal Musiala", 2003, 2, 26, 83],
    ["Martin Ødegaard", 1998, 12, 17, 82], ["Trent Alexander-Arnold", 1998, 10, 7, 82],
    ["Didier Drogba", 1978, 3, 11, 82], ["Riyad Mahrez", 1991, 2, 21, 82],
    ["James Rodríguez", 1991, 7, 12, 80], ["Arjen Robben", 1984, 1, 23, 80],
    ["Samuel Eto'o", 1981, 3, 10, 80], ["Edinson Cavani", 1987, 2, 14, 80],
    ["Radamel Falcao", 1986, 2, 10, 76], ["Yaya Touré", 1983, 5, 13, 76],
    ["Gabriel Batistuta", 1969, 2, 1, 78], ["Marco van Basten", 1964, 10, 31, 78],
    ["Petr Čech", 1982, 5, 20, 76], ["Thibaut Courtois", 1992, 5, 11, 80],
    ["Keylor Navas", 1986, 12, 15, 76], ["Alisson Becker", 1992, 10, 2, 80],
    ["Gerard Piqué", 1987, 2, 2, 80], ["Carles Puyol", 1978, 4, 13, 76],
    ["Marcelo Vieira", 1988, 5, 12, 78], ["Dani Alves", 1983, 5, 6, 78],
    ["Roberto Carlos", 1973, 4, 10, 80], ["Fabio Cannavaro", 1973, 9, 13, 76],
    ["Franco Baresi", 1960, 5, 8, 72], ["Cafu", 1970, 6, 7, 74],
    ["Philipp Lahm", 1983, 11, 11, 76], ["Alessandro Nesta", 1976, 3, 19, 74],
    ["Pep Guardiola", 1971, 1, 18, 86], ["José Mourinho", 1963, 1, 26, 86],
    ["Carlo Ancelotti", 1959, 6, 10, 82], ["Jürgen Klopp", 1967, 6, 16, 84],
    ["Arsène Wenger", 1949, 10, 22, 76], ["Alex Ferguson", 1941, 12, 31, 80],
    ["Diego Simeone", 1970, 4, 28, 78], ["Ferenc Puskás", 1927, 4, 1, 74],
    ["Alfredo Di Stéfano", 1926, 7, 4, 70], ["Eusébio", 1942, 1, 25, 72],
    ["George Best", 1946, 5, 22, 70], ["Gerd Müller", 1945, 11, 3, 72],
    ["Franz Beckenbauer", 1945, 9, 11, 76], ["Michel Platini", 1955, 6, 21, 74],
    ["Lev Yashin", 1929, 10, 22, 68], ["Bobby Charlton", 1937, 10, 11, 70],
    ["Garrincha", 1933, 10, 28, 68], ["Zico", 1953, 3, 3, 68],
    ["Sócrates", 1954, 2, 19, 64], ["Romário", 1966, 1, 29, 72],
    ["Lothar Matthäus", 1961, 3, 21, 68], ["Ruud Gullit", 1962, 9, 1, 72],
    ["Alex Morgan", 1989, 7, 2, 74], ["Marta Vieira", 1986, 2, 19, 72],
    ["Megan Rapinoe", 1985, 7, 5, 72], ["Carli Lloyd", 1982, 7, 16, 66],
    ["Mia Hamm", 1972, 3, 17, 66], ["Homare Sawa", 1978, 9, 6, 58],
    ["Takefusa Kubo", 2001, 6, 4, 68], ["Alphonso Davies", 2000, 11, 2, 72],
  ],
  actors: [
    ["Tom Hanks", 1956, 7, 9, 94], ["Leonardo DiCaprio", 1974, 11, 11, 96],
    ["Brad Pitt", 1963, 12, 18, 93], ["Johnny Depp", 1963, 6, 9, 92],
    ["Denzel Washington", 1954, 12, 28, 90], ["Will Smith", 1968, 9, 25, 93],
    ["Robert Downey Jr.", 1965, 4, 4, 94], ["Tom Cruise", 1962, 7, 3, 94],
    ["Keanu Reeves", 1964, 9, 2, 92], ["Morgan Freeman", 1937, 6, 1, 92],
    ["Al Pacino", 1940, 4, 25, 88], ["Robert De Niro", 1943, 8, 17, 88],
    ["Jack Nicholson", 1937, 4, 22, 86], ["Harrison Ford", 1942, 7, 13, 90],
    ["Samuel L. Jackson", 1948, 12, 21, 88], ["Matt Damon", 1970, 10, 8, 88],
    ["Ben Affleck", 1972, 8, 15, 86], ["Christian Bale", 1974, 1, 30, 88],
    ["Hugh Jackman", 1968, 10, 12, 88], ["Dwayne Johnson", 1972, 5, 2, 92],
    ["Ryan Reynolds", 1976, 10, 23, 90], ["Chris Hemsworth", 1983, 8, 11, 90],
    ["Chris Evans", 1981, 6, 13, 88], ["Robert Pattinson", 1986, 5, 13, 86],
    ["Timothée Chalamet", 1995, 12, 27, 88], ["Shah Rukh Khan", 1965, 11, 2, 92],
    ["Amitabh Bachchan", 1942, 10, 11, 86], ["Salman Khan", 1965, 12, 27, 84],
    ["Aamir Khan", 1965, 3, 14, 84], ["Jackie Chan", 1954, 4, 7, 92],
    ["Jet Li", 1963, 4, 26, 80], ["Bruce Lee", 1940, 11, 27, 90],
    ["Charlie Chaplin", 1889, 4, 16, 88], ["Marlon Brando", 1924, 4, 3, 84],
    ["James Dean", 1931, 2, 8, 78], ["Humphrey Bogart", 1899, 12, 25, 76],
    ["Anthony Hopkins", 1937, 12, 31, 86], ["Tom Hardy", 1977, 9, 15, 84],
    ["Idris Elba", 1972, 9, 6, 84], ["Joaquin Phoenix", 1974, 10, 28, 84],
    ["Alain Delon", 1935, 11, 8, 72], ["Jean-Paul Belmondo", 1933, 4, 9, 68],
    ["Marcello Mastroianni", 1924, 9, 28, 66], ["Toshirō Mifune", 1920, 4, 1, 62],
  ],
  actresses: [
    ["Meryl Streep", 1949, 6, 22, 90], ["Julia Roberts", 1967, 10, 28, 90],
    ["Angelina Jolie", 1975, 6, 4, 94], ["Scarlett Johansson", 1984, 11, 22, 92],
    ["Jennifer Lawrence", 1990, 8, 15, 90], ["Emma Watson", 1990, 4, 15, 90],
    ["Emma Stone", 1988, 11, 6, 88], ["Anne Hathaway", 1982, 11, 12, 88],
    ["Natalie Portman", 1981, 6, 9, 88], ["Nicole Kidman", 1967, 6, 20, 86],
    ["Cate Blanchett", 1969, 5, 14, 84], ["Kate Winslet", 1975, 10, 5, 86],
    ["Sandra Bullock", 1964, 7, 26, 86], ["Charlize Theron", 1975, 8, 7, 86],
    ["Gal Gadot", 1985, 4, 30, 86], ["Margot Robbie", 1990, 7, 2, 88],
    ["Zendaya", 1996, 9, 1, 90], ["Audrey Hepburn", 1929, 5, 4, 88],
    ["Marilyn Monroe", 1926, 6, 1, 94], ["Elizabeth Taylor", 1932, 2, 27, 84],
    ["Sophia Loren", 1934, 9, 20, 78], ["Brigitte Bardot", 1934, 9, 28, 76],
    ["Monica Bellucci", 1964, 9, 30, 80], ["Penélope Cruz", 1974, 4, 28, 82],
    ["Salma Hayek", 1966, 9, 2, 82], ["Deepika Padukone", 1986, 1, 5, 82],
    ["Priyanka Chopra", 1982, 7, 18, 82], ["Aishwarya Rai", 1973, 11, 1, 78],
    ["Gong Li", 1965, 12, 31, 72], ["Zhang Ziyi", 1979, 2, 9, 74],
    ["Judi Dench", 1934, 12, 9, 76], ["Helen Mirren", 1945, 7, 26, 76],
  ],
  singers: [
    ["Michael Jackson", 1958, 8, 29, 100], ["Freddie Mercury", 1946, 9, 5, 95],
    ["Elvis Presley", 1935, 1, 8, 95], ["Madonna", 1958, 8, 16, 92],
    ["Beyoncé", 1981, 9, 4, 96], ["Adele", 1988, 5, 5, 93],
    ["Taylor Swift", 1989, 12, 13, 97], ["Rihanna", 1988, 2, 20, 94],
    ["Lady Gaga", 1986, 3, 28, 92], ["Ariana Grande", 1993, 6, 26, 92],
    ["Billie Eilish", 2001, 12, 18, 90], ["Ed Sheeran", 1991, 2, 17, 90],
    ["Justin Bieber", 1994, 3, 1, 92], ["The Weeknd", 1990, 2, 16, 92],
    ["Bruno Mars", 1985, 10, 8, 90], ["Shakira", 1977, 2, 2, 90],
    ["Jennifer Lopez", 1969, 7, 24, 90], ["Mariah Carey", 1969, 3, 27, 88],
    ["Whitney Houston", 1963, 8, 9, 90], ["Celine Dion", 1968, 3, 30, 88],
    ["Britney Spears", 1981, 12, 2, 88], ["Christina Aguilera", 1980, 12, 18, 84],
    ["Katy Perry", 1984, 10, 25, 86], ["Dua Lipa", 1995, 8, 22, 88],
    ["Harry Styles", 1994, 2, 1, 88], ["Frank Sinatra", 1915, 12, 12, 88],
    ["Elton John", 1947, 3, 25, 90], ["David Bowie", 1947, 1, 8, 88],
    ["Bob Marley", 1945, 2, 6, 90], ["Tina Turner", 1939, 11, 26, 84],
    ["Aretha Franklin", 1942, 3, 25, 80], ["Amy Winehouse", 1983, 9, 14, 82],
    ["Umm Kulthum", 1898, 12, 31, 78], ["Fairuz", 1935, 11, 21, 76],
    ["Julio Iglesias", 1943, 9, 23, 74], ["Andrea Bocelli", 1958, 9, 22, 78],
    ["Luciano Pavarotti", 1935, 10, 12, 80], ["Selena Gomez", 1992, 7, 22, 86],
    ["Miley Cyrus", 1992, 11, 23, 84], ["Demi Lovato", 1992, 8, 20, 80],
  ],
  musicians: [
    ["Paul McCartney", 1942, 6, 18, 92], ["John Lennon", 1940, 10, 9, 92],
    ["George Harrison", 1943, 2, 25, 82], ["Ringo Starr", 1940, 7, 7, 78],
    ["Mick Jagger", 1943, 7, 26, 84], ["Keith Richards", 1943, 12, 18, 78],
    ["Eric Clapton", 1945, 3, 30, 82], ["Jimi Hendrix", 1942, 11, 27, 86],
    ["Bob Dylan", 1941, 5, 24, 86], ["Bruce Springsteen", 1949, 9, 23, 82],
    ["Prince", 1958, 6, 7, 88], ["Stevie Wonder", 1950, 5, 13, 86],
    ["Ray Charles", 1930, 9, 23, 78], ["B.B. King", 1925, 9, 16, 72],
    ["W.A. Mozart", 1756, 1, 27, 94], ["L. van Beethoven", 1770, 12, 16, 94],
    ["J.S. Bach", 1685, 3, 31, 88], ["Frédéric Chopin", 1810, 3, 1, 84],
    ["P. Tchaikovsky", 1840, 5, 7, 82], ["Hans Zimmer", 1957, 9, 12, 80],
    ["John Williams", 1932, 2, 8, 80], ["Ennio Morricone", 1928, 11, 10, 74],
    ["A.R. Rahman", 1967, 1, 6, 76], ["Gustavo Santaolalla", 1951, 8, 19, 58],
  ],
  rappers: [
    ["Eminem", 1972, 10, 17, 95], ["Jay-Z", 1969, 12, 4, 90],
    ["Kanye West", 1977, 6, 8, 92], ["Drake", 1986, 10, 24, 94],
    ["Kendrick Lamar", 1987, 6, 17, 90], ["Snoop Dogg", 1971, 10, 20, 88],
    ["Tupac Shakur", 1971, 6, 16, 88], ["The Notorious B.I.G.", 1972, 5, 21, 84],
    ["50 Cent", 1975, 7, 6, 84], ["Nicki Minaj", 1982, 12, 8, 88],
    ["Cardi B", 1992, 10, 11, 86], ["Travis Scott", 1991, 4, 30, 86],
    ["Post Malone", 1995, 7, 4, 86], ["Lil Wayne", 1982, 9, 27, 82],
    ["Nas", 1973, 9, 14, 76], ["Ice Cube", 1969, 6, 15, 78],
    ["Missy Elliott", 1971, 7, 1, 74], ["Wiz Khalifa", 1987, 9, 8, 76],
  ],
  basketball: [
    ["Michael Jordan", 1963, 2, 17, 97], ["LeBron James", 1984, 12, 30, 96],
    ["Kobe Bryant", 1978, 8, 23, 94], ["Magic Johnson", 1959, 8, 14, 86],
    ["Larry Bird", 1956, 12, 7, 80], ["Shaquille O'Neal", 1972, 3, 6, 88],
    ["Stephen Curry", 1988, 3, 14, 92], ["Kevin Durant", 1988, 9, 29, 90],
    ["James Harden", 1989, 8, 26, 84], ["Giannis Antetokounmpo", 1994, 12, 6, 88],
    ["Luka Dončić", 1999, 2, 28, 88], ["Nikola Jokić", 1995, 2, 19, 86],
    ["Dwyane Wade", 1982, 1, 17, 82], ["Allen Iverson", 1975, 6, 7, 82],
    ["Tim Duncan", 1976, 4, 25, 78], ["Dirk Nowitzki", 1978, 6, 19, 78],
    ["Yao Ming", 1980, 9, 12, 82], ["Dennis Rodman", 1961, 5, 13, 78],
    ["Scottie Pippen", 1965, 9, 25, 76], ["Kareem Abdul-Jabbar", 1947, 4, 16, 78],
    ["Wilt Chamberlain", 1936, 8, 21, 74], ["Bill Russell", 1934, 2, 12, 70],
  ],
  tennis: [
    ["Roger Federer", 1981, 8, 8, 94], ["Rafael Nadal", 1986, 6, 3, 94],
    ["Novak Djokovic", 1987, 5, 22, 94], ["Serena Williams", 1981, 9, 26, 92],
    ["Venus Williams", 1980, 6, 17, 86], ["Carlos Alcaraz", 2003, 5, 5, 88],
    ["Jannik Sinner", 2001, 8, 16, 86], ["Andy Murray", 1987, 5, 15, 82],
    ["Maria Sharapova", 1987, 4, 19, 82], ["Steffi Graf", 1969, 6, 14, 78],
    ["Martina Navratilova", 1956, 10, 18, 74], ["Pete Sampras", 1971, 8, 12, 76],
    ["Andre Agassi", 1970, 4, 29, 78], ["Björn Borg", 1956, 6, 6, 74],
    ["John McEnroe", 1959, 2, 16, 72], ["Naomi Osaka", 1997, 10, 16, 80],
    ["Iga Świątek", 2001, 5, 31, 80], ["Boris Becker", 1967, 11, 22, 70],
  ],
  racing: [
    ["Lewis Hamilton", 1985, 1, 7, 92], ["Michael Schumacher", 1969, 1, 3, 90],
    ["Ayrton Senna", 1960, 3, 21, 86], ["Alain Prost", 1955, 2, 24, 74],
    ["Sebastian Vettel", 1987, 7, 3, 84], ["Max Verstappen", 1997, 9, 30, 88],
    ["Fernando Alonso", 1981, 7, 29, 84], ["Kimi Räikkönen", 1979, 10, 17, 78],
    ["Niki Lauda", 1949, 2, 22, 74], ["Juan Manuel Fangio", 1911, 6, 24, 68],
    ["Valentino Rossi", 1979, 2, 16, 82], ["Marc Márquez", 1993, 2, 17, 76],
    ["Charles Leclerc", 1997, 10, 16, 78], ["Lando Norris", 1999, 11, 13, 78],
    ["Daniel Ricciardo", 1989, 7, 1, 74], ["Mika Häkkinen", 1968, 9, 28, 68],
  ],
  boxing: [
    ["Muhammad Ali", 1942, 1, 17, 94], ["Mike Tyson", 1966, 6, 30, 90],
    ["Floyd Mayweather", 1977, 2, 24, 88], ["Manny Pacquiao", 1978, 12, 17, 86],
    ["Tyson Fury", 1988, 8, 12, 82], ["Anthony Joshua", 1989, 10, 15, 80],
    ["Canelo Álvarez", 1990, 7, 18, 80], ["Oscar De La Hoya", 1973, 2, 4, 76],
    ["Sugar Ray Robinson", 1921, 5, 3, 68], ["Rocky Marciano", 1923, 9, 1, 66],
    ["Evander Holyfield", 1962, 10, 19, 74], ["George Foreman", 1949, 1, 10, 74],
    ["Lennox Lewis", 1965, 9, 2, 72], ["Roberto Durán", 1951, 6, 16, 64],
  ],
  athletes: [
    ["Usain Bolt", 1986, 8, 21, 94], ["Michael Phelps", 1985, 6, 30, 90],
    ["Simone Biles", 1997, 3, 14, 88], ["Nadia Comăneci", 1961, 11, 12, 78],
    ["Carl Lewis", 1961, 7, 1, 76], ["Jesse Owens", 1913, 9, 12, 76],
    ["Eliud Kipchoge", 1984, 11, 5, 76], ["Mo Farah", 1983, 3, 23, 72],
    ["Katie Ledecky", 1997, 3, 17, 70], ["Wayne Gretzky", 1961, 1, 26, 78],
    ["Tom Brady", 1977, 8, 3, 86], ["Patrick Mahomes", 1995, 9, 17, 78],
    ["Tiger Woods", 1975, 12, 30, 86], ["Jack Nicklaus", 1940, 1, 21, 66],
    ["Yelena Isinbayeva", 1982, 6, 3, 66], ["Haile Gebrselassie", 1973, 4, 18, 64],
    ["Sachin Tendulkar", 1973, 4, 24, 82], ["Virat Kohli", 1988, 11, 5, 86],
    ["MS Dhoni", 1981, 7, 7, 78], ["Babe Ruth", 1895, 2, 6, 72],
  ],
  scientists: [
    ["Albert Einstein", 1879, 3, 14, 97], ["Isaac Newton", 1643, 1, 4, 94],
    ["Nikola Tesla", 1856, 7, 10, 90], ["Marie Curie", 1867, 11, 7, 90],
    ["Charles Darwin", 1809, 2, 12, 86], ["Galileo Galilei", 1564, 2, 15, 88],
    ["Stephen Hawking", 1942, 1, 8, 88], ["Niels Bohr", 1885, 10, 7, 72],
    ["Max Planck", 1858, 4, 23, 68], ["Werner Heisenberg", 1901, 12, 5, 64],
    ["Erwin Schrödinger", 1887, 8, 12, 62], ["Louis Pasteur", 1822, 12, 27, 76],
    ["Thomas Edison", 1847, 2, 11, 86], ["A. Graham Bell", 1847, 3, 3, 78],
    ["Dmitri Mendeleev", 1834, 2, 8, 68], ["Rosalind Franklin", 1920, 7, 25, 66],
    ["Alan Turing", 1912, 6, 23, 78], ["Jane Goodall", 1934, 4, 3, 74],
    ["Carl Sagan", 1934, 11, 9, 72], ["Richard Feynman", 1918, 5, 11, 70],
    ["J.R. Oppenheimer", 1904, 4, 22, 78], ["Ibn Sina (Avicenna)", 980, 8, 7, 72],
  ],
  astronauts: [
    ["Neil Armstrong", 1930, 8, 5, 92], ["Buzz Aldrin", 1930, 1, 20, 84],
    ["Yuri Gagarin", 1934, 3, 9, 86], ["Valentina Tereshkova", 1937, 3, 6, 74],
    ["John Glenn", 1921, 7, 18, 70], ["Sally Ride", 1951, 5, 26, 68],
    ["Chris Hadfield", 1959, 8, 29, 66], ["Mae Jemison", 1956, 10, 17, 64],
    ["Alexei Leonov", 1934, 5, 30, 62], ["Michael Collins", 1930, 10, 31, 66],
    ["Peggy Whitson", 1960, 2, 9, 56], ["Yang Liwei", 1965, 6, 21, 60],
  ],
  historical: [
    ["Julius Caesar", -100, 7, 12, 88], ["Cleopatra", -69, 1, 25, 88],
    ["Alexander the Great", -356, 7, 20, 88], ["Genghis Khan", 1162, 5, 31, 82],
    ["Napoleon Bonaparte", 1769, 8, 15, 88], ["Joan of Arc", 1412, 1, 6, 78],
    ["Queen Victoria", 1819, 5, 24, 76], ["Abraham Lincoln", 1809, 2, 12, 88],
    ["Winston Churchill", 1874, 11, 30, 86], ["Mahatma Gandhi", 1869, 10, 2, 90],
    ["Nelson Mandela", 1918, 7, 18, 90], ["Martin Luther King", 1929, 1, 15, 88],
    ["Mother Teresa", 1910, 8, 26, 82], ["Che Guevara", 1928, 6, 14, 80],
    ["Saladin", 1137, 10, 2, 70], ["Marco Polo", 1254, 9, 15, 72],
    ["Simón Bolívar", 1783, 7, 24, 68], ["Suleiman the Magnificent", 1494, 11, 6, 66],
    ["Elizabeth I", 1533, 9, 7, 74],
  ],
  leaders: [
    ["Barack Obama", 1961, 8, 4, 92], ["Donald Trump", 1946, 6, 14, 92],
    ["Joe Biden", 1942, 11, 20, 84], ["Angela Merkel", 1954, 7, 17, 82],
    ["Vladimir Putin", 1952, 10, 7, 86], ["Emmanuel Macron", 1977, 12, 21, 78],
    ["Mao Zedong", 1893, 12, 26, 80], ["Joseph Stalin", 1878, 12, 18, 82],
    ["John F. Kennedy", 1917, 5, 29, 84], ["Franklin D. Roosevelt", 1882, 1, 30, 80],
    ["Margaret Thatcher", 1925, 10, 13, 78], ["Indira Gandhi", 1917, 11, 19, 72],
    ["Jacinda Ardern", 1980, 7, 26, 68], ["Justin Trudeau", 1971, 12, 25, 74],
    ["Recep T. Erdoğan", 1954, 2, 26, 72], ["Narendra Modi", 1950, 9, 17, 76],
    ["Volodymyr Zelensky", 1978, 1, 25, 76], ["Fidel Castro", 1926, 8, 13, 74],
    ["Mikhail Gorbachev", 1931, 3, 2, 70], ["Charles de Gaulle", 1890, 11, 22, 74],
    ["Anwar Sadat", 1918, 12, 25, 64], ["Gamal Abdel Nasser", 1918, 1, 15, 66],
  ],
  artists: [
    ["Leonardo da Vinci", 1452, 4, 15, 94], ["Michelangelo", 1475, 3, 6, 88],
    ["Pablo Picasso", 1881, 10, 25, 90], ["Vincent van Gogh", 1853, 3, 30, 92],
    ["Claude Monet", 1840, 11, 14, 82], ["Salvador Dalí", 1904, 5, 11, 86],
    ["Andy Warhol", 1928, 8, 6, 78], ["Frida Kahlo", 1907, 7, 6, 84],
    ["Rembrandt", 1606, 7, 15, 78], ["Johannes Vermeer", 1632, 10, 31, 72],
    ["Edvard Munch", 1863, 12, 12, 72], ["Gustav Klimt", 1862, 7, 14, 70],
    ["Henri Matisse", 1869, 12, 31, 72], ["René Magritte", 1898, 11, 21, 68],
    ["Jackson Pollock", 1912, 1, 28, 64], ["David Hockney", 1937, 7, 9, 62],
    ["Yayoi Kusama", 1929, 3, 22, 66], ["Katsushika Hokusai", 1760, 10, 31, 70],
  ],
  writers: [
    ["William Shakespeare", 1564, 4, 23, 94], ["Mark Twain", 1835, 11, 30, 78],
    ["Charles Dickens", 1812, 2, 7, 80], ["Leo Tolstoy", 1828, 9, 9, 82],
    ["Fyodor Dostoevsky", 1821, 11, 11, 80], ["Victor Hugo", 1802, 2, 26, 80],
    ["Jane Austen", 1775, 12, 16, 80], ["J.K. Rowling", 1965, 7, 31, 88],
    ["Stephen King", 1947, 9, 21, 84], ["Ernest Hemingway", 1899, 7, 21, 80],
    ["G. García Márquez", 1927, 3, 6, 78], ["Franz Kafka", 1883, 7, 3, 78],
    ["Oscar Wilde", 1854, 10, 16, 78], ["Agatha Christie", 1890, 9, 15, 82],
    ["J.R.R. Tolkien", 1892, 1, 3, 84], ["George Orwell", 1903, 6, 25, 80],
    ["Virginia Woolf", 1882, 1, 25, 70], ["Haruki Murakami", 1949, 1, 12, 74],
    ["Paulo Coelho", 1947, 8, 24, 74], ["Dan Brown", 1964, 6, 22, 72],
  ],
  entrepreneurs: [
    ["Elon Musk", 1971, 6, 28, 96], ["Jeff Bezos", 1964, 1, 12, 90],
    ["Bill Gates", 1955, 10, 28, 92], ["Mark Zuckerberg", 1984, 5, 14, 90],
    ["Oprah Winfrey", 1954, 1, 29, 86], ["Richard Branson", 1950, 7, 18, 76],
    ["Warren Buffett", 1930, 8, 30, 80], ["Coco Chanel", 1883, 8, 19, 80],
    ["Henry Ford", 1863, 7, 30, 78], ["Walt Disney", 1901, 12, 5, 88],
    ["Jack Ma", 1964, 9, 10, 78], ["Giorgio Armani", 1934, 7, 11, 66],
  ],
  tech: [
    ["Steve Jobs", 1955, 2, 24, 94], ["Tim Cook", 1960, 11, 1, 76],
    ["Sundar Pichai", 1972, 6, 10, 74], ["Satya Nadella", 1967, 8, 19, 72],
    ["Larry Page", 1973, 3, 26, 76], ["Sergey Brin", 1973, 8, 21, 72],
    ["Ada Lovelace", 1815, 12, 10, 72], ["Grace Hopper", 1906, 12, 9, 64],
    ["Linus Torvalds", 1969, 12, 28, 66], ["Jack Dorsey", 1976, 11, 19, 66],
    ["Sam Altman", 1985, 4, 22, 70], ["Demis Hassabis", 1976, 7, 27, 60],
    ["Jensen Huang", 1963, 2, 17, 72], ["Reed Hastings", 1960, 10, 8, 58],
  ],
  gaming: [
    ["PewDiePie", 1989, 10, 24, 82], ["Ninja", 1991, 6, 5, 74],
    ["Pokimane", 1996, 5, 14, 72], ["Markiplier", 1989, 6, 28, 72],
    ["Jacksepticeye", 1990, 2, 7, 66], ["DanTDM", 1991, 11, 8, 64],
    ["Shroud", 1994, 6, 2, 66], ["Faker", 1996, 5, 7, 70],
    ["xQc", 1995, 11, 12, 66], ["Ibai Llanos", 1995, 3, 26, 68],
    ["Hideo Kojima", 1963, 8, 24, 70], ["Shigeru Miyamoto", 1952, 11, 16, 68],
    ["Gabe Newell", 1962, 11, 3, 64], ["Markus 'Notch' Persson", 1979, 6, 1, 62],
  ],
  tv: [
    ["Ellen DeGeneres", 1958, 1, 26, 78], ["Jimmy Fallon", 1974, 9, 19, 78],
    ["Jimmy Kimmel", 1967, 11, 13, 74], ["Stephen Colbert", 1964, 5, 13, 74],
    ["Conan O'Brien", 1963, 4, 18, 72], ["David Letterman", 1947, 4, 12, 68],
    ["Gordon Ramsay", 1966, 11, 8, 84], ["Simon Cowell", 1959, 10, 7, 74],
    ["Ryan Seacrest", 1974, 12, 24, 66], ["James Corden", 1978, 8, 22, 70],
    ["Trevor Noah", 1984, 2, 20, 72], ["David Attenborough", 1926, 5, 8, 78],
    ["Bear Grylls", 1974, 6, 7, 70], ["Steve Irwin", 1962, 2, 22, 74],
  ],
  comedians: [
    ["Jim Carrey", 1962, 1, 17, 90], ["Kevin Hart", 1979, 7, 6, 84],
    ["Dave Chappelle", 1973, 8, 24, 78], ["Chris Rock", 1965, 2, 7, 78],
    ["Eddie Murphy", 1961, 4, 3, 84], ["Robin Williams", 1951, 7, 21, 88],
    ["Jerry Seinfeld", 1954, 4, 29, 78], ["Ricky Gervais", 1961, 6, 25, 76],
    ["Rowan Atkinson", 1955, 1, 6, 82], ["Sacha Baron Cohen", 1971, 10, 13, 72],
    ["Amy Schumer", 1981, 6, 1, 66], ["Gabriel Iglesias", 1976, 7, 15, 66],
    ["Bill Burr", 1968, 6, 10, 64], ["Ali Wong", 1982, 4, 19, 62],
    ["Hasan Minhaj", 1985, 9, 23, 64],
  ],
  internet: [
    ["MrBeast", 1998, 5, 7, 90], ["Casey Neistat", 1981, 3, 25, 68],
    ["Charli D'Amelio", 2004, 5, 1, 74], ["Addison Rae", 2000, 10, 6, 70],
    ["Khaby Lame", 2000, 3, 9, 76], ["Zach King", 1990, 2, 4, 66],
    ["Logan Paul", 1995, 4, 1, 72], ["Jake Paul", 1997, 1, 17, 72],
    ["KSI", 1993, 6, 24, 72], ["Emma Chamberlain", 2001, 4, 22, 64],
    ["David Dobrik", 1996, 7, 23, 62], ["Liza Koshy", 1996, 3, 31, 62],
    ["Marques Brownlee", 1993, 12, 3, 68], ["IShowSpeed", 2005, 1, 21, 74],
    ["Kai Cenat", 2001, 12, 16, 72],
  ],
  iran: [
    ["Ali Daei", 1969, 3, 21, 80], ["Karim Bagheri", 1974, 2, 20, 68],
    ["Mehdi Mahdavikia", 1977, 7, 24, 68], ["Ali Karimi", 1978, 11, 8, 72],
    ["Javad Nekounam", 1980, 10, 7, 64], ["Andranik Teymourian", 1983, 3, 6, 62],
    ["Sardar Azmoun", 1995, 1, 1, 74], ["Mehdi Taremi", 1992, 7, 18, 76],
    ["Alireza Jahanbakhsh", 1993, 8, 11, 64], ["Alireza Beiranvand", 1992, 9, 21, 68],
    ["Ehsan Hajsafi", 1990, 2, 25, 60], ["Masoud Shojaei", 1984, 6, 9, 56],
    ["Vahid Hashemian", 1976, 7, 21, 58], ["Khodadad Azizi", 1971, 6, 22, 58],
    ["Nasser Hejazi", 1949, 12, 14, 58], ["Ali Parvin", 1946, 9, 25, 56],
    ["Gholamreza Takhti", 1930, 8, 27, 66], ["Hossein Rezazadeh", 1978, 5, 12, 62],
    ["Kianoush Rostami", 1991, 7, 23, 54], ["Behdad Salimi", 1989, 12, 8, 54],
    ["Kimia Alizadeh", 1998, 7, 10, 58], ["Hassan Yazdani", 1994, 12, 26, 56],
    ["Hamed Haddadi", 1985, 5, 19, 54], ["Shahab Hosseini", 1974, 2, 3, 62],
    ["Leila Hatami", 1972, 10, 1, 60], ["Golshifteh Farahani", 1983, 7, 10, 64],
    ["Taraneh Alidoosti", 1984, 1, 12, 60], ["Peyman Maadi", 1970, 6, 30, 56],
    ["Parviz Parastui", 1955, 6, 23, 54], ["Bahram Radan", 1979, 5, 28, 54],
    ["Mehran Modiri", 1964, 9, 23, 58], ["Asghar Farhadi", 1972, 5, 7, 66],
    ["Abbas Kiarostami", 1940, 6, 22, 64], ["Majid Majidi", 1959, 2, 17, 56],
    ["Googoosh", 1950, 5, 5, 72], ["Ebi", 1949, 6, 19, 66],
    ["Dariush Eghbali", 1951, 2, 4, 62], ["Hayedeh", 1942, 4, 10, 62],
    ["Shadmehr Aghili", 1973, 1, 27, 58], ["Mohsen Yeganeh", 1985, 5, 23, 58],
    ["M. Reza Shajarian", 1940, 9, 23, 66], ["Homayoun Shajarian", 1975, 5, 31, 56],
    ["Kayhan Kalhor", 1963, 11, 24, 52], ["Shahram Nazeri", 1950, 2, 18, 52],
    ["Maryam Mirzakhani", 1977, 5, 3, 66], ["Ali Javan", 1926, 12, 26, 48],
    ["Anousheh Ansari", 1966, 9, 12, 54], ["Firouz Naderi", 1946, 3, 26, 46],
    ["Rumi (Mowlana)", 1207, 9, 30, 72], ["Ferdowsi", 940, 1, 1, 64],
    ["Omar Khayyam", 1048, 5, 18, 64], ["Saadi Shirazi", 1210, 4, 21, 60],
    ["Forough Farrokhzad", 1935, 1, 5, 54], ["Sohrab Sepehri", 1928, 10, 7, 50],
    ["Sadegh Hedayat", 1903, 2, 17, 54], ["Nima Yooshij", 1897, 11, 12, 48],
    ["Parvin Etesami", 1907, 3, 16, 46], ["Cyrus the Great", -576, 10, 29, 72],
    ["Amir Kabir", 1807, 1, 9, 52], ["Mohammad Mosaddegh", 1882, 6, 16, 52],
    ["Pierre Omidyar", 1967, 6, 21, 56], ["Mahmoud Farshchian", 1930, 1, 24, 46],
    ["Zahra Nemati", 1985, 4, 30, 42],
  ],
  world: [
    ["Malala Yousafzai", 1997, 7, 12, 84], ["Greta Thunberg", 2003, 1, 3, 80],
    ["Dalai Lama", 1935, 7, 6, 82], ["Pope Francis", 1936, 12, 17, 84],
    ["Desmond Tutu", 1931, 10, 7, 72], ["Helen Keller", 1880, 6, 27, 76],
    ["Amelia Earhart", 1897, 7, 24, 76], ["Rosa Parks", 1913, 2, 4, 74],
    ["Anne Frank", 1929, 6, 12, 80], ["Alfred Nobel", 1833, 10, 21, 70],
    ["Florence Nightingale", 1820, 5, 12, 70], ["Yusra Mardini", 1998, 3, 5, 48],
  ],
};

export interface Person {
  id: string;
  name: string;
  cat: CatId;
  year: number;
  m: number; // birth month 1-12
  d: number; // birth day 1-31
  pop: number; // fame 1-100
}

export const PEOPLE: Person[] = [];
export const BY_CAT: Record<string, Person[]> = {};
export const BY_DATE: Map<string, Person[]> = new Map();

/* merge append-only expansion packs into the master table */
import { EXTRA } from "./more";
(Object.keys(EXTRA) as CatId[]).forEach((c) => {
  const rows = EXTRA[c];
  if (rows) RAW[c].push(...rows);
});

(Object.keys(RAW) as CatId[]).forEach((cat) => {
  BY_CAT[cat] = [];
  RAW[cat].forEach(([name, year, m, d, pop], i) => {
    const p: Person = { id: `${cat}:${i}`, name, cat, year, m, d, pop };
    PEOPLE.push(p);
    BY_CAT[cat].push(p);
    const key = `${m}-${d}`;
    if (!BY_DATE.has(key)) BY_DATE.set(key, []);
    BY_DATE.get(key)!.push(p);
  });
});

export const TOTAL = PEOPLE.length;
export const CAT_IDS = Object.keys(RAW) as CatId[];

export function difficultyOf(pop: number): 0 | 1 | 2 | 3 {
  if (pop >= 88) return 0; // EASY
  if (pop >= 74) return 1; // MEDIUM
  if (pop >= 58) return 2; // HARD
  return 3; // IMPOSSIBLE
}

export function bornOn(m: number, d: number): Person[] {
  return BY_DATE.get(`${m}-${d}`) ?? [];
}

export function randomPeople(n: number, rnd: () => number): Person[] {
  const pool = [...PEOPLE];
  const out: Person[] = [];
  while (out.length < n && pool.length) {
    const i = Math.floor(rnd() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}
