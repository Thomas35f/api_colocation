# Install
- npm install
- nodemon index.js

# Choix technologiques
- api en node
- La base de l'API reprend la logique d'ensemble qui a été utilisée lors du cours. On retrouve donc squelize et sqlite3 pour lier l'api à une base de données.
- Nodemon a été installé afin d'avoir un confort de développement. Cela se traduit par un hot reload à chaque enregistrement du projet.
- Le package Bcrypt (pour hasher les mots de passe)

# Base de données
On a 3 CRUD :  

User 🏁 :
Un user se définit par 7 éléments: 

- id
- firstName
- lastName
- email
- password -> c'est le hash qui est stocké en base.

Expense 🏁 :
Une dépense se définit par 7 éléments: 

- id
- user_id (l'id de l'user qui l'a créé)
- category (le nom de la catégorie associée à la dépense)
- amount (le montant)
- from_user (le nom de la personne qui envoie l'argent)
- to_users (les noms des personnes qui ont contribué et leurs sommes associées) -> Se traduit par une string (ex : "Jean/45,Paul/55" ) qui est ensuite traitée côté front.
- date (Date où la dépense a été créé) -> Stocké sous forme de string (ex: 22/04/23)

ExpenseCategory 🏁 :
Une catégorie de dépense se définit par 2 éléments: 

- id
- title