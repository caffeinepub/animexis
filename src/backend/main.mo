import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";



actor {
  type ColorPalette = {
    primary : Text;
    secondary : Text;
    accent : Text;
    background : Text;
    text : Text;
  };

  type AnimeEntry = {
    id : Nat;
    title : Text;
    summary : Text;
    posterUrl : Text;
    colorPalette : ColorPalette;
    animationPreset : Text;
    genre : Text;
  };

  var nextId = 1;

  let animeEntries = Map.empty<Nat, AnimeEntry>();

  public shared ({ caller }) func initialize() : async () {
    let seededAnime : [AnimeEntry] = [
      {
        id = 1;
        title = "Spirited Away";
        summary = "In a world where spirits roam freely, a young girl named Chihiro must navigate a mystical bathhouse to save her parents. Through courage and compassion, she discovers her inner strength and learns valuable life lessons.";
        posterUrl = "https://example.com/spirited_away.jpg";
        colorPalette = {
          primary = "#E6D5B8";
          secondary = "#FFB8B8";
          accent = "#52A7F0";
          background = "#F5F5DC";
          text = "#333333";
        };
        animationPreset = "fantasy";
        genre = "Fantasy";
      },
      {
        id = 2;
        title = "Your Name";
        summary = "A breathtaking tale of two high school students who mysteriously swap bodies and embark on a journey to find each other. Their connection transcends time and space, blending romance, comedy, and a touch of the supernatural.";
        posterUrl = "https://example.com/your_name.jpg";
        colorPalette = {
          primary = "#F8E6DE";
          secondary = "#4F7CAC";
          accent = "#E83A3A";
          background = "#FFF9F0";
          text = "#22223B";
        };
        animationPreset = "romance";
        genre = "Romance";
      },
      {
        id = 3;
        title = "Attack on Titan";
        summary = "In a dystopian world besieged by giant humanoid creatures, humanity fights for survival behind massive walls. Eren Yeager and his friends join the military to reclaim their freedom and uncover the truth behind the Titans.";
        posterUrl = "https://example.com/attack_on_titan.jpg";
        colorPalette = {
          primary = "#6C4F3D";
          secondary = "#D9B44A";
          accent = "#3E3E3E";
          background = "#EFEFEF";
          text = "#1B1B1B";
        };
        animationPreset = "action";
        genre = "Action";
      },
      {
        id = 4;
        title = "My Neighbor Totoro";
        summary = "Two young sisters move to the countryside and befriend magical creatures, including the gentle forest spirit Totoro. Their adventures foster a deep connection to nature and family in this heartwarming classic.";
        posterUrl = "https://example.com/my_neighbor_totoro.jpg";
        colorPalette = {
          primary = "#A8D5BA";
          secondary = "#D3D3D3";
          accent = "#FFD700";
          background = "#F4F6F3";
          text = "#2E2E2E";
        };
        animationPreset = "family";
        genre = "Family";
      },
      {
        id = 5;
        title = "Demon Slayer";
        summary = "Tanjiro Kamado embarks on a perilous quest to avenge his family and cure his sister, who has been transformed into a demon. With breathtaking animation and intense battles, this series explores themes of resilience and hope.";
        posterUrl = "https://example.com/demon_slayer.jpg";
        colorPalette = {
          primary = "#333D29";
          secondary = "#F24333";
          accent = "#1C1C1C";
          background = "#FDFBF6";
          text = "#1C1C1C";
        };
        animationPreset = "action";
        genre = "Action";
      },
      {
        id = 6;
        title = "Fullmetal Alchemist: Brotherhood";
        summary = "Brothers Edward and Alphonse Elric use alchemy in their quest to restore their bodies after a failed experiment. Their journey explores deep philosophical questions about sacrifice, redemption, and the true nature of humanity.";
        posterUrl = "https://example.com/fullmetal_alchemist.jpg";
        colorPalette = {
          primary = "#B22234";
          secondary = "#C0C0C0";
          accent = "#FFD700";
          background = "#F5F5DC";
          text = "#22223B";
        };
        animationPreset = "action";
        genre = "Action";
      },
      {
        id = 7;
        title = "Naruto";
        summary = "Follow the journey of Naruto Uzumaki, a spirited ninja with dreams of becoming the strongest leader in his village. Alongside friends and rivals, Naruto faces powerful foes and uncovers the secrets of his own past.";
        posterUrl = "https://example.com/naruto.jpg";
        colorPalette = {
          primary = "#F6A560";
          secondary = "#705447";
          accent = "#0A0E14";
          background = "#F6FBF4";
          text = "#0A0E14";
        };
        animationPreset = "adventure";
        genre = "Adventure";
      },
      {
        id = 8;
        title = "Death Note";
        summary = "A gripping psychological thriller where a high school student gains the power to kill anyone by writing their name in a supernatural notebook. The battle of wits between him and a genius detective unfolds in a world-shaking game of cat and mouse.";
        posterUrl = "https://example.com/death_note.jpg";
        colorPalette = {
          primary = "#282828";
          secondary = "#D1D1D1";
          accent = "#613659";
          background = "#F7F3F7";
          text = "#F7F3F7";
        };
        animationPreset = "mystery";
        genre = "Mystery";
      },
      {
        id = 9;
        title = "One Piece";
        summary = "Luffy and his crew sail the Grand Line in search of the ultimate treasure, facing formidable foes and forging unbreakable bonds. A tale of adventure, friendship, and the pursuit of dreams in a world full of wonder.";
        posterUrl = "https://example.com/one_piece.jpg";
        colorPalette = {
          primary = "#2A6F97";
          secondary = "#F9BA51";
          accent = "#EC3B3B";
          background = "#F6F8F5";
          text = "#262626";
        };
        animationPreset = "adventure";
        genre = "Adventure";
      },
      {
        id = 10;
        title = "Cowboy Bebop";
        summary = "Set in a vibrant futuristic universe, this series follows a group of bounty hunters as they tackle dangerous missions and confront their own haunted pasts. A perfect blend of action, jazz, and noir storytelling.";
        posterUrl = "https://example.com/cowboy_bebop.jpg";
        colorPalette = {
          primary = "#F9E8C7";
          secondary = "#B95252";
          accent = "#0B3C53";
          background = "#F1F4FA";
          text = "#0B3C53";
        };
        animationPreset = "sci-fi";
        genre = "Sci-Fi";
      },
      {
        id = 11;
        title = "Dragon Ball Z";
        summary = "Goku and his friends protect Earth from powerful adversaries, pushing the limits of their strength through intense battles. This iconic series is famous for its thrilling action, memorable characters, and epic story arcs.";
        posterUrl = "https://example.com/dragon_ball_z.jpg";
        colorPalette = {
          primary = "#FACD01";
          secondary = "#EA1C23";
          accent = "#3472BA";
          background = "#FCF5E5";
          text = "#3472BA";
        };
        animationPreset = "action";
        genre = "Action";
      },
      {
        id = 12;
        title = "Steins;Gate";
        summary = "A group of friends stumbles upon a way to send messages to the past, sparking a chain of events with catastrophic consequences. This mind-bending series explores time travel, Parallel universes, and the power of friendship.";
        posterUrl = "https://example.com/steins_gate.jpg";
        colorPalette = {
          primary = "#C8D6DF";
          secondary = "#A35638";
          accent = "#848C8C";
          background = "#F6F8FF";
          text = "#22223B";
        };
        animationPreset = "sci-fi";
        genre = "Sci-Fi";
      },
      {
        id = 13;
        title = "Tokyo Ghoul";
        summary = "In a world where flesh-eating creatures exist alongside humans, a young man grapples with his new identity after becoming a half-ghoul. The series delves into themes of identity, morality, and the struggle for acceptance.";
        posterUrl = "https://example.com/tokyo_ghoul.jpg";
        colorPalette = {
          primary = "#D32F2F";
          secondary = "#363636";
          accent = "#F5F3F3";
          background = "#E7E7E7";
          text = "#F5F3F3";
        };
        animationPreset = "horror";
        genre = "Horror";
      },
      {
        id = 14;
        title = "One Punch Man";
        summary = "Saitama, a hero who can defeat any opponent with a single punch, finds himself bored by the lack of challenge. The series masterfully blends action, satire, and comedy in a world of super-powered beings.";
        posterUrl = "https://example.com/one_punch_man.jpg";
        colorPalette = {
          primary = "#ECE024";
          secondary = "#FC3A2F";
          accent = "#262626";
          background = "#FCFCF2";
          text = "#262626";
        };
        animationPreset = "comedy";
        genre = "Comedy";
      },
      {
        id = 15;
        title = "Neon Genesis Evangelion";
        summary = "Teenage pilots are thrust into a battle against otherworldly threats, struggling with psychological trauma and existential dilemmas. This groundbreaking series explores complex themes of identity, existence, and human nature.";
        posterUrl = "https://example.com/neon_genesis_evangelion.jpg";
        colorPalette = {
          primary = "#A531D2";
          secondary = "#D2DBE6";
          accent = "#FC6345";
          background = "#F7F7FE";
          text = "#323A4D";
        };
        animationPreset = "sci-fi";
        genre = "Sci-Fi";
      },
      {
        id = 16;
        title = "Hunter x Hunter";
        summary = "Young Gon Freecss embarks on a journey to find his father and become a legendary hunter. Along the way, he faces formidable challenges, forges lasting friendships, and discovers the true meaning of strength.";
        posterUrl = "https://example.com/hunter_x_hunter.jpg";
        colorPalette = {
          primary = "#79B473";
          secondary = "#7B8B6F";
          accent = "#393943";
          background = "#F2F6F0";
          text = "#393943";
        };
        animationPreset = "adventure";
        genre = "Adventure";
      },
      {
        id = 17;
        title = "Sword Art Online";
        summary = "Trapped in a virtual reality MMORPG, players must navigate dangerous challenges to survive and escape. Kirito and Asuna's quest emphasizes the power of perseverance, love, and friendship in a world of digital wonders.";
        posterUrl = "https://example.com/sword_art_online.jpg";
        colorPalette = {
          primary = "#5C80BC";
          secondary = "#F5C16B";
          accent = "#282828";
          background = "#F4F3E8";
          text = "#282828";
        };
        animationPreset = "action";
        genre = "Action";
      },
      {
        id = 18;
        title = "Bleach";
        summary = "Ichigo Kurosaki discovers his ability to see spirits and becomes a Soul Reaper, defending the living from malevolent entities. The series blends supernatural action with character-driven storytelling and a vibrant cast.";
        posterUrl = "https://example.com/bleach.jpg";
        colorPalette = {
          primary = "#2B2D42";
          secondary = "#F95959";
          accent = "#8D99AE";
          background = "#F6F6F6";
          text = "#8D99AE";
        };
        animationPreset = "supernatural";
        genre = "Supernatural";
      },
      {
        id = 19;
        title = "Pokémon";
        summary = "Ash Ketchum sets out on an epic journey to become a Pokémon Master, capturing creatures and battling skilled trainers along the way. This beloved series celebrates friendship, adventure, and the thrill of exploration.";
        posterUrl = "https://example.com/pokemon.jpg";
        colorPalette = {
          primary = "#FFCB05";
          secondary = "#3B4CCA";
          accent = "#F9563A";
          background = "#FCFCF1";
          text = "#3B4CCA";
        };
        animationPreset = "adventure";
        genre = "Adventure";
      },
      {
        id = 20;
        title = "Mob Psycho 100";
        summary = "A powerful psychic struggles to fit in and control his abilities while navigating the complexities of adolescence. The series combines stunning animation, humor, and emotional depth in a story about identity and growth.";
        posterUrl = "https://example.com/mob_psycho_100.jpg";
        colorPalette = {
          primary = "#6E44FF";
          secondary = "#F5F5F5";
          accent = "#6EDD79";
          background = "#F8F8F5";
          text = "#2B2B2B";
        };
        animationPreset = "comedy";
        genre = "Comedy";
      },
      {
        id = 21;
        title = "Kimi no Na wa. (Your Name)";
        summary = "The lives of two high school students become entwined as they mysteriously switch bodies. This breathtaking romantic fantasy explores themes of fate, memory, and the enduring power of human connections.";
        posterUrl = "https://example.com/kimi_no_na_wa.jpg";
        colorPalette = {
          primary = "#8C54A1";
          secondary = "#F5D5E5";
          accent = "#F7C873";
          background = "#F5F3F7";
          text = "#22223B";
        };
        animationPreset = "romance";
        genre = "Romance";
      },
      {
        id = 22;
        title = "Akira";
        summary = "Set in a vibrant, dystopian neo-Tokyo, bikers, rebels, and psychics collide in a visually stunning masterpiece. This groundbreaking film explores political unrest, the dangers of unchecked power, and the human spirit.";
        posterUrl = "https://example.com/akira.jpg";
        colorPalette = {
          primary = "#DC241F";
          secondary = "#1B1B1B";
          accent = "#FDF6F6";
          background = "#F1F1F1";
          text = "#EAEAEA";
        };
        animationPreset = "sci-fi";
        genre = "Sci-Fi";
      },
      {
        id = 23;
        title = "Princess Mononoke";
        summary = "Caught in the midst of a battle between nature and industrialization, a young warrior must forge a path of balance and understanding. The visual feast explores the interconnectedness of humans and the world around them.";
        posterUrl = "https://example.com/princess_mononoke.jpg";
        colorPalette = {
          primary = "#C65454";
          secondary = "#94A89A";
          accent = "#A45353";
          background = "#F0EDED";
          text = "#393939";
        };
        animationPreset = "fantasy";
        genre = "Fantasy";
      },
      {
        id = 24;
        title = "Sailor Moon";
        summary = "A group of young girls discovers their destiny as magical warriors, defending the world from evil forces. This iconic series celebrates friendship, love, and the power of self-discovery.";
        posterUrl = "https://example.com/sailor_moon.jpg";
        colorPalette = {
          primary = "#FFC1CC";
          secondary = "#F5F4FA";
          accent = "#A8B6C8";
          background = "#FDFDF6";
          text = "#393939";
        };
        animationPreset = "magical girl";
        genre = "Magical Girl";
      },
      {
        id = 25;
        title = "Black Clover";
        summary = "Asta, a determined young orphan, strives to become the Wizard King in a world where magic reigns supreme. His journey is filled with intense battles, unexpected friendships, and unwavering perseverance.";
        posterUrl = "https://example.com/black_clover.jpg";
        colorPalette = {
          primary = "#284E36";
          secondary = "#EFEFEF";
          accent = "#A9864C";
          background = "#F7F9FA";
          text = "#1E1E1E";
        };
        animationPreset = "fantasy";
        genre = "Fantasy";
      },
      {
        id = 26;
        title = "Haikyuu!!";
        summary = "High school volleyball enthusiasts pour their hearts into intense matches, overcoming adversity and forming lasting bonds. This uplifting series captures the passion, determination, and teamwork that define sportsmanship.";
        posterUrl = "https://example.com/haikyuu.jpg";
        colorPalette = {
          primary = "#F49C11";
          secondary = "#2E394D";
          accent = "#253146";
          background = "#FAF8F4";
          text = "#253146";
        };
        animationPreset = "sports";
        genre = "Sports";
      },
      {
        id = 27;
        title = "Code Geass";
        summary = "A brilliant strategist uses mysterious powers to lead a rebellion against an oppressive empire. The series blends political intrigue, psychological warfare, and powerful mecha battles in a fight for freedom.";
        posterUrl = "https://example.com/code_geass.jpg";
        colorPalette = {
          primary = "#B7264B";
          secondary = "#2B332C";
          accent = "#DDD98E";
          background = "#EDF4F6";
          text = "#221C1C";
        };
        animationPreset = "mecha";
        genre = "Mecha";
      },
      {
        id = 28;
        title = "Re:Zero";
        summary = "A young man is transported to a fantasy world where he must navigate dangerous challenges and mysterious cycles of death and rebirth. The series explores personal growth, redemption, and the nature of perseverance.";
        posterUrl = "https://example.com/rezero.jpg";
        colorPalette = {
          primary = "#A8B9DC";
          secondary = "#45274A";
          accent = "#F5F7FD";
          background = "#EDEDED";
          text = "#552B81";
        };
        animationPreset = "fantasy";
        genre = "Fantasy";
      },
      {
        id = 29;
        title = "Bakuman";
        summary = "Aspiring manga artists face the challenges and rewards of the publishing world, overcoming obstacles and pursuing their dreams. The series offers inspiration, humor, and a tribute to the creative process.";
        posterUrl = "https://example.com/bakuman.jpg";
        colorPalette = {
          primary = "#6B9EC1";
          secondary = "#D2C3B5";
          accent = "#373B44";
          background = "#F6F6F6";
          text = "#373B44";
        };
        animationPreset = "drama";
        genre = "Drama";
      },
      {
        id = 30;
        title = "Great Teacher Onizuka";
        summary = "A former gangster becomes an unconventional teacher, inspiring and challenging his students with unorthodox methods. The series delivers a blend of humor, heart, and lessons on self-discovery and transformation.";
        posterUrl = "https://example.com/great_teacher_onizuka.jpg";
        colorPalette = {
          primary = "#DB995A";
          secondary = "#839591";
          accent = "#384648";
          background = "#FDFBF7";
          text = "#384648";
        };
        animationPreset = "comedy";
        genre = "Comedy";
      }
    ];

    for (anime in seededAnime.values()) {
      animeEntries.add(anime.id, anime);
    };

    nextId := (seededAnime.size() + 1 : Nat);
  };

  public query ({ caller }) func getAllAnime() : async [AnimeEntry] {
    let valuesIter = animeEntries.values();
    valuesIter.toArray();
  };

  public query ({ caller }) func getAnimeById(id : Nat) : async AnimeEntry {
    switch (animeEntries.get(id)) {
      case (null) { Runtime.trap("Anime not found") };
      case (?anime) { anime };
    };
  };

  public query ({ caller }) func getAnimeByGenre(genre : Text) : async [AnimeEntry] {
    let valuesIter = animeEntries.values();
    let filtered = valuesIter.filter(
      func(anime) {
        anime.genre == genre;
      }
    );
    filtered.toArray();
  };

  public query ({ caller }) func getGenres() : async [Text] {
    let genreSet = Set.empty<Text>();

    for (anime in animeEntries.values()) {
      genreSet.add(anime.genre);
    };

    genreSet.toArray();
  };

  public query ({ caller }) func getColorPalettes() : async [ColorPalette] {
    let valuesIter = animeEntries.values();
    let palettes = valuesIter.map(
      func(anime) {
        anime.colorPalette;
      }
    );
    palettes.toArray();
  };

  public shared ({ caller }) func addAnime(entry : AnimeEntry) : async () {
    animeEntries.add(nextId, { entry with id = nextId });
    nextId += 1;
  };

  public shared ({ caller }) func updateAnime(id : Nat, entry : AnimeEntry) : async () {
    if (animeEntries.containsKey(id)) {
      animeEntries.add(id, entry);
    } else {
      Runtime.trap("Anime not found");
    };
  };

  public shared ({ caller }) func deleteAnime(id : Nat) : async () {
    if (animeEntries.containsKey(id)) {
      animeEntries.remove(id);
    } else {
      Runtime.trap("Anime not found");
    };
  };
};
