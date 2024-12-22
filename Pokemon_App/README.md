# Pokémon Manager Application

## Description

Une application complète pour gérer une liste de Pokémon. Cette application inclut :
- Un **backend** construit avec Node.js et Express.
- Un **frontend** développé en React.
- Une base de données **MySQL** pour stocker les données des Pokémon.

L'application permet d'ajouter, d'afficher, et de supprimer des Pokémon.

---

## Prérequis

1. **Logiciels nécessaires :**
   - [Node.js](https://nodejs.org/) (version 14 ou supérieure)
   - [Docker](https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/)

2. **Vérifiez les installations :**
   ```bash
   node -v
   docker -v
   docker-compose -v
   ```

---

## Installation et Exécution

### Étape 1 : Cloner le projet
```bash
git clone <repository_url>
cd pokemon-app
```

### Étape 2 : Structure des fichiers

```
.
├── backend/             # Code du serveur backend
├── frontend/            # Code de l'interface utilisateur
├── mysql/               # Scripts d'initialisation pour MySQL
├── docker-compose.yml   # Configuration Docker
└── README.md            # Documentation du projet
```

### Étape 3 : Démarrer l'application avec Docker
1. **Démarrez les conteneurs Docker :**
   ```bash
   docker-compose up --build
   ```

2. **Accédez aux services :**
   - **Frontend** : `http://localhost:3000`
   - **Backend API** : `http://localhost:3001`

---

## Endpoints de l’API

| Méthode | Endpoint          | Description                    |
|---------|-------------------|--------------------------------|
| GET     | `/api/pokemon`    | Récupère tous les Pokémon.     |
| POST    | `/api/pokemon`    | Ajoute un nouveau Pokémon.     |
| DELETE  | `/api/pokemon/:id`| Supprime un Pokémon par son ID.|


## Fonctionnalités de l’interface utilisateur

1. **Affichage des Pokémon :**
   - Liste tous les Pokémon enregistrés dans la base de données.

2. **Ajout de Pokémon :**
   - Formulaire pour ajouter un nouveau Pokémon avec ses caractéristiques (nom, type, points de vie, attaque, défense).

3. **Suppression de Pokémon :**
   - Bouton pour supprimer un Pokémon de la liste et de la base de données.


### Journaux des services
- **Logs du backend :**
  ```bash
  docker-compose logs backend
  ```
- **Logs du frontend :**
  ```bash
  docker-compose logs frontend
  ```
- **Logs de MySQL :**
  ```bash
  docker-compose logs mysql
  ```

---

## Support
Si vous rencontrez des problèmes ou avez des questions contactez nous : bert@et.esiea.fr .
