# Utiliser l'image de base MySQL officielle
FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE: ${MYSQL_DATABASE}

# Copier les fichiers d'initialisation dans le dossier approprié
COPY ./init.sql /docker-entrypoint-initdb.d/

# Exposer le port 3306 pour les connexions MySQL
EXPOSE 3306

# Commande de démarrage
CMD ["mysqld"]
