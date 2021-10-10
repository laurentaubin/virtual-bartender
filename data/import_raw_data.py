import requests
import json
import string

API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php"


def get_drinks_starting_with_letter(letter: str):
  print(f"fetching drinks for letter {letter}")
  url = API_URL + f"?f={letter}"
  response = requests.get(url)
  data = json.loads(response.text).get("drinks")
  return data if data != None else []

def main():
  drinks = []
  for letter in string.ascii_lowercase:
    letter_drinks = get_drinks_starting_with_letter(letter)
    drinks += letter_drinks

  with open("cocktails.json", "w") as f:
    f.write(json.dumps(drinks))

if __name__ == "__main__":
  main()