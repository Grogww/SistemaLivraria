// src/database/sqlite.js
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = process.env.SQLITE_DB_FILE || path.join(__dirname, '../data/livraria.db');
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

// Singleton
let db;
function getDb() {
    if (!db) {
        db = new Database(DB_FILE);
        db.pragma('foreign_keys = ON');
    }
    return db;
}

function run(sql, params = []) {
    return getDb().prepare(sql).run(...params);
}

function get(sql, params = []) {
    return getDb().prepare(sql).get(...params);
}

function all(sql, params = []) {
    return getDb().prepare(sql).all(params);
}

function query(sql, params = []) {
    const rows = getDb().prepare(sql).all(...params);
    if (rows.length === 0) return null;
    if (rows.length === 1) return rows[0];
    return rows;
}

function init() {
    run(`
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            autor TEXT NOT NULL,
            categoria TEXT NOT NULL,
            ano INTEGER NOT NULL,
            capaPath TEXT
        )
    `);
    run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    run(`
        CREATE TABLE IF NOT EXISTS favoritos ( 
        IDFavorito INTEGER PRIMARY KEY AUTOINCREMENT, 
        IDLivro INTEGER NOT NULL, 
        IDUsuario INTEGER NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (IDLivro) REFERENCES livros(id), 
        FOREIGN KEY (IDUsuario) REFERENCES users(id), 
        UNIQUE(IDUsuario, IDLivro) )    
    `);
    run(`
        INSERT INTO livros (titulo, autor, categoria, ano, capaPath)
        SELECT 'Clean Code', 'Robert C. Martin', 'Programação', 2008, 'cleanCode.jpg'
        WHERE NOT EXISTS (SELECT 1 FROM livros);
    `);
    console.log('Banco de dados SQLite inicializado (livros, users, favoritos)');
}

module.exports = { getDb, run, get, all, query, init };
