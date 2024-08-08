const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 265 ),
  bg VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  bg VARCHAR ( 255 ),
  name VARCHAR ( 255 ),
  description TEXT,
  price INTEGER,
  rating REAL,
  publisher VARCHAR ( 255 ),
  publish_date DATE,
  in_stock INTEGER
);

CREATE TABLE IF NOT EXISTS genres_games (
  genre_id INTEGER REFERENCES genres,
  game_id INTEGER REFERENCES games,
  PRIMARY KEY (genre_id, game_id)
);

INSERT INTO genres (name, bg) VALUES
  ('Action', '/action.jpg'), ('Adventure', '/adventure.jpg'), 
  ('Fantasy', '/fantasy.jpg'), ('Open World', '/open-world.jpg'), 
  ('Puzzle', '/puzzle.jpg'), ('RPG', '/rpg.jpg'), ('Racing', '/racing.jpg'), 
  ('Shooter', '/shooter.jpg'), ('Simulation', '/simulation.jpg'), 
  ('Sports', '/sports.jpg'), ('Strategy', '/strategy.jpg');

INSERT INTO games 
(bg, name, description, price, rating, publisher, publish_date, in_stock) 
VALUES
  ('/gta3.jpg', 'Grand Theft Auto 3', 'Welcome to Liberty City. Where it all began. 
  The critically acclaimed blockbuster Grand Theft Auto III brings to life the 
  dark and seedy underworld of Liberty City. With a massive and diverse open 
  world, a wild cast of characters from every walk of life, and the freedom to 
  explore at will, Grand Theft Auto III puts the dark, intriguing, and ruthless 
  world of crime at your fingertips.', 30, 4.3, 'Rockstar Games', '2001-10-22', 1000
  ), 
  ('/gta4.jpg', 'Grand Theft Auto 4', 'What does the American Dream mean today? 
  For Niko Bellic, fresh off the boat from Europe, it is the hope he can escape 
  his past. For his cousin, Roman, it is the vision that together they can find 
  fortune in Liberty City, gateway to the land of opportunity. As they slip into 
  debt and are dragged into a criminal underworld by a series of shysters, 
  thieves, and sociopaths, they discover that the reality is very different from 
  the dream in a city that worships money and status.', 25, 4.5, 
  'Rockstar Games', '2008-04-29', 25000
  ),  
  ('/gta5.jpg', 'Grand Theft Auto 5', 'Welcome to Los Santos. When a young street 
  hustler, a retired bank robber, and a terrifying psychopath find themselves 
  entangled with some of the most frightening and deranged elements of the 
  criminal underworld, the U.S. government, and the entertainment industry, they 
  must pull off a series of dangerous heists to survive in a ruthless city in 
  which they can trust nobody — least of all each other.', 50, 4.4, 
  'Rockstar Games', '2013-09-17', 1000000
  ),   
  ('/gtasa.jpg', 'Grand Theft Auto San Andreas', 'Five years ago Carl Johnson 
  escaped from the pressures of life in Los Santos, San Andreas — a city tearing 
  itself apart with gang trouble, drugs, and corruption. Where film stars and 
  millionaires do their best to avoid the dealers and gangbangers.', 15, 4.6, 
  'Rockstar Games', '2004-10-26', 6000
  ),
  ('/gtavicecity.jpg', 'Grand Theft Auto Vice City', 'Welcome to the 1980s. 
  From the decade of big hair, excess, and pastel suits comes a story of one 
  man''s rise to the top of the criminal pile as Grand Theft Auto returns.', 15, 
  3.9, 'Rockstar Games', '2002-10-29', 10000
  ),
  ('/lanoire.jpg', 'L.A. Noire', 'Amid the post-war boom of Hollywood''s Golden 
  Age, Cole Phelps — an LAPD detective — is thrown headfirst into a city drowning 
  in its own success. Corruption is rampant, the drug trade is exploding, and 
  murder rates are at an all-time high. In his fight to climb the ranks and do 
  what''s right, Phelps must unravel the truth behind a string of arson attacks, 
  racketeering conspiracies, and brutal murders, battling the L.A. underworld and 
  even members of his own department.', 45, 3.9, 'Rockstar Games', '2011-05-17', 100026
  ),
  ('/maxpayne.jpg', 'Max Payne', 'Max Payne is a man with nothing to lose in the 
  violent, cold, urban night. A fugitive undercover cop framed for murder, and 
  now hunted by cops and the mob. Max is a man with his back against the wall, 
  fighting a battle he cannot hope to win. Prepare for a new breed of deep action 
  game. Prepare for pain... It is a relentless story-driven game about a man on 
  the edge, fighting for his justice while uncovering plot twists and twisted 
  thugs in the gritty bowels of New York.', 21, 4.5, 'Rockstar Games', '2001-07-23', 
  12
  ),
  ('/rdr2.jpg', 'Red Dead Redemption 2', 'America, 1899. The end of the Wild West 
  era has begun. After a robbery goes badly wrong in the western town of Blackwater, 
  Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents 
  and the best bounty hunters in the nation massing on their heels, the gang must 
  rob, steal and fight their way across the rugged heartland of America in order 
  to survive. As deepening internal divisions threaten to tear the gang apart, 
  Arthur must make a choice.', 60, 4.8, 'Rockstar Games', '2018-10-26', 10000
  ),
  ('/minecraft.jpg', 'Minecraft', 'A very cool game with blocks', 7, 5, 
  'Mojang', '2011-11-18', 5
  ),
  ('/witcher3.jpg', 'Witcher 3', 'You are Geralt of Rivia, mercenary monster slayer. 
  Before you stands a war-torn, monster-infested continent you can explore at will. 
  Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon 
  that can alter the shape of the world.', 35, 4.8, 'CD ROJEKT RED', '2015-05-18', 30000
  );

INSERT INTO genres_games (genre_id, game_id)
VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 8), (2, 9), (2, 10),
  (3, 10),
  (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10),
  (6, 9),
  (8, 3), (8, 7), (8, 8),
  (9, 9);
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    connectionString: process.argv[2],
  });
  await client.connect();
  console.log('Connected to the database');
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
