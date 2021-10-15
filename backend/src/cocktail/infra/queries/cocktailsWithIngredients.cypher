WITH $ingredients as ingredients
MATCH (cocktail:Cocktail)-[:made_with]->(ing:Ingredient)
WITH ingredients, cocktail, COLLECT(ing) as cocktail_ingredients
WHERE ALL(x IN cocktail_ingredients WHERE x.name IN ingredients)
RETURN {
  name: cocktail.name,
  thumbnailUrl: cocktail.thumbnail
}