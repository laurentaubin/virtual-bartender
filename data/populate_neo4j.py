import json
from py2neo import Graph, Node, Relationship

URL = "bolt://localhost:7687"
USERNAME = "neo4j"
PASSWORD = "password"


class GraphPopulator:
    def __init__(self, db_url: str, username: str, password: str):
        self.graph = Graph(db_url, auth=(username, password), secure=False)

    def populate_ingredients(self, ingredients: list):
        transaction = self.graph.begin()

        for ingredient in ingredients:
            node = Node("Ingredient", name=ingredient)
            transaction.create(node)

        self.graph.commit(transaction)

    def populate_cocktails(self, cocktails: list):
        transaction = self.graph.begin()

        for cocktail in cocktails:
            node = Node("Cocktail", id=cocktail.get("id"), name=cocktail.get("name"), instructions=cocktail.get("instructions"),
                        glass=cocktail.get("glass"), thumbnail=cocktail.get("thumbnail"))
            transaction.create(node)

        self.graph.commit(transaction)

    def create_relations(self, cocktails: list):
        transaction = self.graph.begin()

        for cocktail in cocktails:
            for ingredient in cocktail.get("ingredients"):
                cocktail_request = self.graph.run(f"MATCH (cocktail:Cocktail {{ id: '{cocktail.get('id')}' }}) RETURN cocktail")
                cocktail_node = [x for x in cocktail_request][0]["cocktail"]

                ingredient_request = self.graph.run(
                    f"MATCH (ingredient:Ingredient {{ name: '{ingredient.get('name')}' }}) RETURN ingredient")
                ingredient_node = [x for x in ingredient_request][0]["ingredient"]

                rel = Relationship(cocktail_node, "made_with", ingredient_node, quantity=ingredient.get("quantity"))
                transaction.create(rel)

        self.graph.commit(transaction)


def import_ingredients():
    with open("import/ingredients.json") as f:
        return json.load(f)


def import_cocktails():
    with open("import/cocktails.json") as f:
        return json.load(f)


def main():
    populator = GraphPopulator(URL, USERNAME, PASSWORD)

    print("Creating ingredient nodes...")
    ingredients = import_ingredients()
    populator.populate_ingredients(ingredients)
    print("Ingredient nodes creation complete.")

    print("Creating cocktail nodes...")
    cocktails = import_cocktails()
    populator.populate_cocktails(cocktails)
    print("Cocktail nodes creation complete.")

    print("Creating relations between ingredient and cocktail nodes...")
    populator.create_relations(cocktails)
    print("Relations creation complete.")


if __name__ == "__main__":
    main()
