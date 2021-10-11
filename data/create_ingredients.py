import json

def main():
  ingredients = set()
  with open("cocktails.json", "r") as f:
    cocktails = json.load(f)

    for cocktail in cocktails:
      for i in range(1, 16):
        ingredient = cocktail.get(f"strIngredient{i}")
        ingredients.add(ingredient)

  ingredients.remove("")
  ingredients.remove(None)
  with open("ingredients.json", "w") as f:
    json.dump(list(ingredients), f)

  
if __name__ == "__main__":
  main()