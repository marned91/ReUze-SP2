const tags = {
  Art: /\b(painting|sculpture|poster|statue|picture|art|wallpaper|mural|drawing|illustration|sketch|portrait|abstract|contemporary|gallery|artist)\b/i,
  Fashion:
    /\b(fashion|clothes|clothing|shoes|jacket|hat|cap|pants|blouse|shirt|parka|glasses|sunglasses|sweater|coat(s)?|sneakers|scarf|scarves|shorts|purse|bag|dress|skirt|blazer|leggings|boots|jewelry|watch)\b/i,
  Interior:
    /\b(interior|sofa(s)?|chair(s)?|table(s)?|lounge(s)?|carpet(s)?|shelf|shelves|lamp(s)?|curtain(s)?|rug(s)?|cushion(s)?|armchair|bookshelf|cabinet|mug(s)?)\b/i,
  Decor:
    /\b(decor|vase(s)?|dish(es)?|tablecloth(S)?|glass|pot(s)?|candlestick(s)?|coaster(s)?|clock(s)?|cushion(s)?|candle(s)?|mirror(s)?|plant(s)?|stool(s)?|ceramic(s)?|globe(s)?|wallpaper|wall\s?art|baskets|tapestry)\b/i,
  Sport:
    /\b(sport(s)?|ski|skiing|skiis|snowboard(s)?|sneakers|canoe|canoes|paddle(s)?|hiking|weights|treadmill(s)?|boxing|gym|fitness|exercise|workout|yoga|running|swimming|cycling|paddleboard|surf(ing)?|skate-board(s)?|helmet(s)?)\b/i,
  vintage:
    /\b(vintage|retro|old|antique|classic|nostalgia|mid-century|heritage|throwback)\b/i,
  other:
    /\b(car|headset|electronics|tablet|phone|camera|digital-camera|computer|game(s)?|toy(s)?|speaker(s)?|stereo|electric-bicycle|electric-scooter|scooter|costume(s)?|ipad|airpods|phone-case|Mac|android|apple|windows|guitar|electric|instrument|keyboard|piano)\b/i,
}

export function tagCategories(title, description) {
  const tagCategories = []

  for (const [tag, regex] of Object.entries(tags)) {
    if (regex.test(title) || regex.test(description)) {
      tagCategories.push(tag.toLowerCase())
    }
  }
  return tagCategories
}
