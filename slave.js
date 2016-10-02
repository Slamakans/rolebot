const traits = [
  {name: "Bruise", hidden: false},
  {name: "Charming Voice", hidden: false},
  {name: "Clumsy", hidden: false},
  {name: "Hoarse Voice", hidden: false},
  {name: "Immature", hidden: false},
  {name: "Scars", hidden: false},
  {name: "Trace of beatings", hidden: false},
  {name: "Virgin", hidden: false},
  {name: "Accustomed to pain", hidden: true},
  {name: "Ascetic", hidden: true},
  {name: "Bisexual", hidden: true},
  {name: "Bloodthirsty", hidden: true},
  {name: "Brony", hidden: true},
  {name: "Coward", hidden: true},
  {name: "Darkness Child", hidden: true},
  {name: "Exhibitionist", hidden: true},
  {name: "Frigid", hidden: true},
  {name: "Good Metabolism", hidden: true},
  {name: "Guilt Complex", hidden: true},
  {name: "Homophobic", hidden: true},
  {name: "Hyperactive", hidden: true},
  {name: "Hysteric", hidden: true},
  {name: "Lesbian", hidden: true},
  {name: "Masochist", hidden: true},
  {name: "Megalomania", hidden: true},
  {name: "Nymphomaniac", hidden: true},
  {name: "Psi-masochist", hidden: true},
  {name: "Pervert", hidden: true},
  {name: "Purist", hidden: true},
  {name: "Sportive", hidden: true},
  {name: "Talent", hidden: true},
  {name: "Wayward", hidden: true},
  {name: "Weakened Metabolism", hidden: true},
  {name: "Torpid", hidden: true}
]

class Slave {
  constructor(member) {
    this.rank = "F";
    this.stats = {
      beauty: 0,
      endurance: 0,
      empathy: 0,
      temperament: 0,
      intellect: 0,
      nature: 0,
      pride: 0,
      exoticism: 0,
      physique: 0,
      style: 0,
      fame: 0
    };

    this.skills = {
      maid: 0,
      cook: 0,
      nurse: 0,
      secretary: 0,
      gladiatrix: 0,
      enchantress: 0,
      escort: 0,
      dancer: 0,
      singer: 0,
      musician: 0,
      pet: 0,
      horse: 0
    }

    this.sexTechniques = {
      petting: 0,
      penetration: 0,
      oralPleasure: 0,
      groupSex: 0,
      demonstration: 0,
      fetishism: 0,
      xenophily: 0
    }

    this.traits = [];

    this.anatomy = {
      breasts: 0,
      virgin: 0,
      lactation: 0,
      anus: 0,
      nipplePiercing: 0,
      clitorisPiercing: 0,
      breastMods: 
    }
  }

  getStatString(stat) {
    if(!stat) throw "'stat' is undefined";
    stat = stat.toLowerCase();
    const temp = {};
    temp.beauty      = ["Ugly", "Plain", "Cute", "Pretty", "Beautiful", "Exquisite"];
    temp.endurance   = ["Dying", "Feeble", "Weakened", "Healthy", "Tough", "Enduring"];
    temp.empathy     = ["Uncaring", "Callous", "Insensitive", "Sensitive", "Caring", "Nurturing"];
    temp.temperament = ["Apathetic", "Cold", "Reserved", "Reactive", "Lively", "Passionate"];
    temp.intellect   = ["Retarded", "Stupid", "Dimwitted", "Bright", "Clever", "Intelligent"];
    temp.nature      = ["Spineless", "Cowardly", "Uncertain", "Independent", "Determined", "Willful"];
    temp.pride       = ["Arrogant", "Haughty", "Proud", "Fastidious", "Open", "Unashamed"];
    temp.exoticism   = ["Ordinary", "Quirky", "Mysterious", "Enigmatic", "Exotic", "Mystical"];
    temp.physique    = ["Obese", "Overweight", "Plump", "Underweight", "Voluptuous", "Healthy weight"];
    temp.style       = ["Unfashionable", "Unremarkable", "Common", "Stylish", "Refined", "Graceful"];
    temp.fame        = ["Unknown", "Well-known", "Celebrity", "Illustrious", "Superstar", "Legend"];
    if(!this.stats[stat]) throw "Unsupported stat: '" + stat + "' is not a stat!";
    return temp[stat][this.stats[stat]]
  }

  getSkillString(skill) {
    if(!skill) throw "'skill' is undefined";
    skill = skill.toLowerCase();
    const level = this.skills[skill];
    if(!level) throw "Unsupported skill: '" + skill + "' is not a skill!";
    if(level == 0) return "Not " + (skill == "enchantress" ? "an " : "a ") + skill.replace(/^./, v => v.toUpperCase());
    return skill.replace(/^./, v => v.toUpperCase());
  }
}