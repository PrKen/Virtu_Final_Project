from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError, IntegrityError
from contextlib import contextmanager
from typing import Optional
import time
import os
from dotenv import load_dotenv
from database_utils import create_table, import_data

# Charger les variables d'environnement depuis .env
load_dotenv()

# Configuration de SQLAlchemy
DATABASE_URI = os.getenv("DATABASE_URI")
if not DATABASE_URI:
    raise ValueError("DATABASE_URI is not set. Check your .env file.")

# Créer un engine SQLAlchemy
engine = create_engine(DATABASE_URI)

# Gestionnaire de connexion à la base de données
@contextmanager
def get_db_connection():
    """Gestionnaire de connexion SQLAlchemy."""
    conn = engine.connect()
    try:
        yield conn
    finally:
        conn.close()

# Fonction lifespan pour gérer les événements de démarrage et d'arrêt
async def lifespan(app: FastAPI):
    """Gestion du cycle de vie de l'application."""

    # Ajout d'un délai pour permettre à MySQL de démarrer
    DELAY_SECONDS = 10
    print(f"Attente de {DELAY_SECONDS} secondes pour permettre à MySQL de démarrer...")
    time.sleep(DELAY_SECONDS)

    # Réessayer la connexion à MySQL jusqu'à ce qu'elle réussisse
    MAX_RETRIES = 5
    retry_count = 0
    while retry_count < MAX_RETRIES:
        try:
            # Tester une connexion simple
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
                print("Connexion à la base de données réussie")
                break
        except OperationalError:
            retry_count += 1
            print(f"Échec de connexion à MySQL. Nouvelle tentative ({retry_count}/{MAX_RETRIES})")
            time.sleep(5)

    if retry_count == MAX_RETRIES:
        raise RuntimeError("Impossible de se connecter à MySQL après plusieurs tentatives.")

    # Création de la table et importation des données
    print("Création de la table 'pokemons'...")
    create_table()

    csv_path = os.getenv("POKEMON_CSV", "./database/pokemon_data.csv")
    if os.path.exists(csv_path):
        print(f"Importation des données depuis {csv_path}...")
        import_data(csv_path)
    else:
        print(f"Fichier {csv_path} non trouvé. Aucune donnée importée.")

    # Code exécuté au démarrage
    yield

    # Code exécuté à l'arrêt
    print("Arrêt de l'application.")

# Initialisation de l'application FastAPI avec lifespan
app = FastAPI(lifespan=lifespan)

# Pydantic model for Pokemon
class Pokemon(BaseModel):
    dexnum: int
    name: str
    generation: int
    type1: str
    type2: Optional[str]
    ability1: Optional[str]
    ability2: Optional[str]
    ability3: Optional[str]
    total: int
    hp: int
    atk: int
    def_: int
    sp_atk: int
    sp_def: int
    spe: int

@app.get("/health")
def health_check():
    """Route pour vérifier que le backend et la base de données fonctionnent."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except OperationalError as e:
        return {"status": "error", "database": str(e)}

@app.get("/pokemons")
def get_pokemons(
    name: Optional[str] = Query(None),
    type1: Optional[str] = Query(None),
    type2: Optional[str] = Query(None)
):
    """Récupère une liste de Pokémon en fonction des filtres."""
    query = """
        SELECT dexnum, name, generation, type1, type2, ability1, ability2, ability3, total,
               hp, atk, def_, sp_atk, sp_def, spe
        FROM pokemons WHERE 1=1
    """
    params = {}
    if name:
        query += " AND name LIKE :name"
        params["name"] = f"%{name}%"
    if type1:
        query += " AND type1 = :type1"
        params["type1"] = type1
    if type2:
        query += " AND type2 = :type2"
        params["type2"] = type2

    try:
        with engine.connect() as conn:
            result = conn.execute(text(query), params).fetchall()
        return [dict(row) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/pokemons")
def create_pokemon(pokemon: Pokemon):
    """Crée un nouveau Pokémon."""
    query = """
        INSERT INTO pokemons (dexnum, name, generation, type1, type2, ability1, ability2, ability3,
                              total, hp, atk, def_, sp_atk, sp_def, spe)
        VALUES (:dexnum, :name, :generation, :type1, :type2, :ability1, :ability2, :ability3,
                :total, :hp, :atk, :def_, :sp_atk, :sp_def, :spe)
    """
    try:
        with engine.connect() as conn:
            conn.execute(text(query), pokemon.dict())
            conn.commit()
        return {"success": True, "message": "Pokemon created successfully"}
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Pokemon with this dexnum already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.delete("/pokemons")
def delete_pokemon(
    dexnum: Optional[int] = Query(None),
    name: Optional[str] = Query(None),
    type1: Optional[str] = Query(None)
):
    """Supprime un ou plusieurs Pokémon en fonction des filtres."""
    if not dexnum and not name and not type1:
        raise HTTPException(status_code=400, detail="At least one filter is required to delete a Pokemon")

    query = "DELETE FROM pokemons WHERE 1=1"
    params = {}
    if dexnum:
        query += " AND dexnum = :dexnum"
        params["dexnum"] = dexnum
    if name:
        query += " AND name LIKE :name"
        params["name"] = f"%{name}%"
    if type1:
        query += " AND type1 = :type1"
        params["type1"] = type1

    try:
        with engine.connect() as conn:
            conn.execute(text(query), params)
            conn.commit()
        return {"success": True, "message": "Pokemon(s) deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/import")
def import_pokemon_data():
    """Réimporte les données depuis le fichier CSV."""
    csv_path = os.getenv("POKEMON_CSV", "pokemon_data.csv")
    if not os.path.exists(csv_path):
        raise HTTPException(status_code=400, detail=f"Fichier {csv_path} introuvable.")
    try:
        import_data(csv_path)
        return {"message": "Données importées avec succès."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/logs")
def get_logs():
    """Retourne les journaux de l'application."""
    query = "SELECT * FROM logs ORDER BY timestamp DESC"
    try:
        with engine.connect() as conn:
            result = conn.execute(text(query)).fetchall()
        return [dict(row) for row in result]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")