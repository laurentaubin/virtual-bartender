import json

def create_id_from_name(name: str):
  words = name.split(" ")
  words = [x.lower() for x in words]
  return "-".join(words)

def normalize_quantity(quantity: str):
  e = quantity
  try:
    a = quantity.replace("Shot ", "oz")
    b = a.replace("Shot", "oz")
    c = b.replace("shot ", "oz")
    d = c.replace("shot", "oz")
    e = d.replace("oz ", "oz")


    if e[-1] == " ":
      e = e[:-2] 
  except:
    pass

  return e

def get_ingredients(cocktail: dict):
  ingredients = []
  for i in range(1, 16):
    ingredient = cocktail.get(f"strIngredient{i}")
    quantity = cocktail.get(f"strMeasure{i}")
    if (ingredient != None):
      quantity = normalize_quantity(quantity)
      ingredients.append({"name": ingredient, "quantity": quantity})
  
  return ingredients

def main():
  sanitized_cocktails = []
  with open("cocktails_raw.json", "r") as f:
    cocktails = json.load(f)

    for cocktail in cocktails:
      cocktail_id = create_id_from_name(cocktail.get("strDrink"))
      ingredients = get_ingredients(cocktail)
      sanitized_cocktail = {"id": cocktail_id, "name": cocktail.get("strDrink"), "ingredients": ingredients, "instructions": cocktail.get("strInstructions"), "glass": cocktail.get("strGlass"), "thumbnail": cocktail.get("strDrinkThumb")}
      sanitized_cocktails.append(sanitized_cocktail)

  with open("cocktails.json", "w") as f:
    json.dump(sanitized_cocktails, f)

if __name__ == "__main__":
  main()