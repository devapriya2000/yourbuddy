import React, { useState } from "react";

interface MovieRoastProps {
  onBack: () => void;
}

type MovieData = {
  ending: string;
  roast: string;
};

const movies: Record<string, MovieData> = {
  "Titanic": {
    ending: "Jack freezes in the ocean while Rose survives on the floating door.",
    roast: "Jack could have fit on that door, but apparently romance needs drama."
  },
  "Inception": {
    ending: "Cobb spins the top, but we never see if it falls.",
    roast: "Two and a half hours of dreams, and you still don’t get closure."
  },
  "Avengers: Endgame": {
    ending: "Iron Man sacrifices himself to defeat Thanos.",
    roast: "Half the universe cried, the other half cried harder."
  },
  "The Sixth Sense": {
    ending: "Dr. Malcolm Crowe realizes he’s been dead the whole time.",
    roast: "You didn’t see it coming, but that kid sure did."
  },
  "The Godfather": {
    ending: "Michael takes over as head of the Corleone family, fully embracing crime.",
    roast: "Family business? More like family business."
  },
  "Forrest Gump": {
    ending: "Forrest raises his son after Jenny dies.",
    roast: "Life is like a box of chocolates, but Jenny picked all the sad ones."
  },
  "The Matrix": {
    ending: "Neo realizes he’s The One and defeats Agent Smith.",
    roast: "Imagine finding out your whole life was just bad CGI code."
  },
  "The Shawshank Redemption": {
    ending: "Andy escapes prison through a sewer pipe and reunites with Red.",
    roast: "Literally crawled through crap to live on a beach — that’s commitment."
  },
  "Jurassic Park": {
    ending: "The survivors escape the island as dinosaurs roam free.",
    roast: "Millions in research, and no one thought of higher fences."
  },
  "Star Wars: The Empire Strikes Back": {
    ending: "Darth Vader reveals he is Luke’s father.",
    roast: "The ultimate ‘I am your father’ flex."
  },
  "Back to the Future": {
    ending: "Marty returns to an improved present where his family is happy.",
    roast: "Fixed his family problems with time travel — beats therapy."
  },
  "Gladiator": {
    ending: "Maximus kills Commodus and dies, joining his family in the afterlife.",
    roast: "Won freedom, died anyway — talk about mixed results."
  },
  "Fight Club": {
    ending: "The narrator kills Tyler Durden and watches buildings explode.",
    roast: "All that chaos, just to realize he was punching himself."
  },
  "The Dark Knight": {
    ending: "Batman takes the blame for Harvey Dent’s crimes and becomes a fugitive.",
    roast: "Congratulations, you’re the hero and the villain now."
  },
  "Frozen": {
    ending: "Anna saves Elsa with true sisterly love.",
    roast: "Whole movie about ice magic, but love melts it — sure."
  },
  "Finding Nemo": {
    ending: "Marlin and Nemo reunite and return home safely.",
    roast: "Lost child found — not very ‘epic quest’ in hindsight."
  },
  "The Lion King": {
    ending: "Simba defeats Scar and becomes king.",
    roast: "Overcame uncle issues — Disney loves family drama."
  },
  "Harry Potter and the Deathly Hallows: Part 2": {
    ending: "Harry defeats Voldemort and peace returns to the wizarding world.",
    roast: "Seven movies for the guy to just fall over when disarmed."
  },
  "Spider-Man: No Way Home": {
    ending: "Peter makes everyone forget he exists to protect them.",
    roast: "Saved the multiverse but ghosted all his friends."
  },
  "The Lord of the Rings: Return of the King": {
    ending: "Frodo destroys the One Ring and sails to the Undying Lands.",
    roast: "Walked for three movies, then Ubered home by eagle."
  },
  "3 Idiots": {
  ending: "Rancho is revealed as a famous scientist living in Ladakh.",
  roast: "He skipped class, but still topped life’s exam."
},
"DDLJ": {
  ending: "Simran runs to catch the train with Raj as her father finally agrees.",
  roast: "Moral: true love = cardio + Indian Railways."
},
"PK": {
  ending: "PK returns to his planet after teaching humans about love and faith.",
  roast: "Alien came, fixed our issues… and left before elections."
},
"Chennai Express": {
  ending: "Rahul wins Meenamma’s father’s approval after lots of fights.",
  roast: "Boy took a train to Tamil Nadu and ended up in a wrestling match."
},
"Bahubali: The Beginning": {
  ending: "Kattappa reveals he killed Baahubali.",
  roast: "Nation waited two years just to hear ‘Why Kattappa killed Baahubali’."
},
"Bahubali 2: The Conclusion": {
  ending: "Baahubali’s son takes revenge and rules Mahishmati.",
  roast: "Basically one big flashback… with abs."
},
"RRR": {
  ending: "Ram and Bheem save each other and defeat the British.",
  roast: "Friendship goals, but with explosions."
},
"KGF Chapter 1": {
  ending: "Rocky rises as the feared don of Kolar Gold Fields.",
  roast: "From orphan to gold king — LinkedIn success story."
},
"KGF Chapter 2": {
  ending: "Rocky sinks into the sea with his gold.",
  roast: "Went from gold mine to deep dive."
},
"Gully Boy": {
  ending: "Murad becomes a successful rapper and wins Safeena’s heart.",
  roast: "From chawl to chartbuster — mic drop."
},
"Pathaan": {
  ending: "Pathaan stops a deadly virus attack and disappears into action again.",
  roast: "Comes, saves the country, leaves like your Wi-Fi signal."
},
"War": {
  ending: "Kabir fakes his death to take down the real villain.",
  roast: "Trust issues level: Tiger Shroff plot twist."
},
"Dangal": {
  ending: "Geeta wins gold for India under her father’s guidance.",
  roast: "The only wrestling match where the crowd cried more than the loser."
},
"Lagaan": {
  ending: "Bhuvan’s team beats the British in cricket and avoids tax.",
  roast: "When anti-colonialism meets IPL dreams."
},
"Shershaah": {
  ending: "Captain Vikram Batra dies a hero in the Kargil War.",
  roast: "Real hero, real story — no roast possible, just respect."
},
"Pushpa: The Rise": {
  ending: "Pushpa rises from coolie to feared red sandalwood smuggler.",
  roast: "Started from the bottom, now he’s… still wearing slippers."
},
"Jawan": {
  ending: "Azad exposes corruption with his team of women fighters.",
  roast: "When SRK plays both father and son — double the swag."
},
"Drishyam": {
  ending: "Vijay hides a body so well the police can’t find it.",
  roast: "The best cover-up since school bunk excuses."
},
"Andhadhun": {
  ending: "Akash escapes with his life, still pretending to be blind.",
  roast: "Moral: fake it till you make it… or until murder happens."
},

  "Toy Story 3": {
    ending: "Andy gives his toys to Bonnie and drives away.",
    roast: "Childhood officially over — cue the adult tears."
  },
  "The Notebook": {
    ending: "Noah and Allie die holding hands in bed.",
    roast: "Romance so intense it took them both out."
  },
  "Interstellar": {
    ending: "Cooper leaves to find Amelia on another planet.",
    roast: "Spent years in space, comes home for five minutes, leaves again."
  },
  "Coco": {
    ending: "Miguel returns to the living world and saves his family’s memories.",
    roast: "Only Pixar can make death feel this wholesome."
  },
  "Up": {
    ending: "Carl gives up Paradise Falls to live new adventures.",
    roast: "All that effort just to give up on the dream house spot."
  },
  "Shrek": {
    ending: "Shrek marries Fiona and they live happily ever after.",
    roast: "Proved love is blind… and sometimes green."
  },
  "Black Panther": {
    ending: "T’Challa opens Wakanda to the world.",
    roast: "World’s best tech, still no Starbucks."
  },
  "Frozen 2": {
    ending: "Anna becomes queen and Elsa lives in the Enchanted Forest.",
    roast: "Basically ‘Let It Go: Outdoor Edition’."
  },
  "Encanto": {
    ending: "The family regains their magic through unity.",
    roast: "House got rebuilt faster than most real estate repairs."
  }
};


export default function MovieRoast({ onBack }: MovieRoastProps) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [result, setResult] = useState<MovieData | null>(null);

  const handleShow = () => {
    if (movies[selectedMovie]) {
      setResult(movies[selectedMovie]);
    } else {
      setResult({
        ending: "We don’t have that movie yet.",
        roast: "Even Hollywood can’t roast this one."
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <button
        onClick={onBack}
        className="text-sm mb-4 underline text-blue-500"
      >
        ← Back to Fun Games
      </button>
      <h1 className="text-xl font-bold mb-4">🎬 Movie Ending Roast</h1>
      <select
        className="p-2 border rounded w-full mb-3"
        value={selectedMovie}
        onChange={(e) => setSelectedMovie(e.target.value)}
      >
        <option value="">Select a movie</option>
        {Object.keys(movies).map((movie) => (
          <option key={movie} value={movie}>
            {movie}
          </option>
        ))}
      </select>
      <button
        onClick={handleShow}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Show Ending & Roast
      </button>
      {result && (
        <div className="mt-4 bg-white p-3 rounded shadow">
          <p><strong>Ending:</strong> {result.ending}</p>
          <p className="text-red-600"><strong>Roast:</strong> {result.roast}</p>
        </div>
      )}
    </div>
  );
}