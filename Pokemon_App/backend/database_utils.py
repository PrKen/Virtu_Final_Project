import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, UniqueConstraint
from sqlalchemy.exc import IntegrityError

# Charger les variables d'environnement
load_dotenv()

# Configuration de la connexion à la base de données
DATABASE_URI = os.getenv("DATABASE_URI")
engine = create_engine(DATABASE_URI)
metadata = MetaData()

# Définition de la table Pokémon
pokemon_table = Table(
    "pokemons",
    metadata,
    Column("dexnum", Integer, primary_key=True),
    Column("name", String(100), nullable=False),
    Column("generation", Integer),
    Column("type1", String(50)),
    Column("type2", String(50)),
    Column("ability1", String(100)),
    Column("ability2", String(100)),
    Column("ability3", String(100)),
    Column("hp", Integer),
    Column("atk", Integer),
    Column("def_", Integer),
    Column("sp_atk", Integer),
    Column("sp_def", Integer),
    Column("spe", Integer),
    Column("total", Integer),
    UniqueConstraint("dexnum", name="uix_dexnum"),
)

# Créer la table dans la base de données si elle n'existe pas
def create_table():
    metadata.create_all(engine)
    print("Table 'pokemons' créée (si elle n'existait pas déjà).")

# Charger les données du fichier CSV dans la table
def import_data(file_path):
    df = pd.read_csv(file_path)
    required_columns = {"dexnum", "name", "generation", "type1", "type2", "ability1",
                        "ability2", "ability3", "hp", "atk", "def_", "sp_atk", "sp_def", "spe", "total"}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"Le fichier CSV doit contenir les colonnes : {', '.join(required_columns)}")

    with engine.connect() as conn:
        for _, row in df.iterrows():
            try:
                insert_query = pokemon_table.insert().values(
                    dexnum=row["dexnum"],
                    name=row["name"],
                    generation=row["generation"],
                    type1=row["type1"],
                    type2=row["type2"],
                    ability1=row["ability1"],
                    ability2=row["ability2"],
                    ability3=row["ability3"],
                    hp=row["hp"],
                    atk=row["atk"],
                    def_=row["def"],
                    sp_atk=row["sp_atk"],
                    sp_def=row["sp_def"],
                    spe=row["spe"],
                    total=row["total"],
                )
                conn.execute(insert_query)
            except IntegrityError:
                print(f"Doublon ignoré : {row['dexnum']} - {row['name']}")
    print("Données importées avec succès.")

if __name__ == "__main__":
    # Exemple d'utilisation
    create_table()
    import_data("./data/pokemon_data.csv")
